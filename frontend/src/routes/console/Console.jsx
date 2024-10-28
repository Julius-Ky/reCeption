import { Copy } from "lucide-react";
import bannerImg from "../../assets/logo.png";
import Button from "../../components/button/Button";
import styles from "./Console.module.css";
import useWallet from "../../hooks/useWallet";
import { useEffect, useState } from "react";

const Console = () => {
  const [apiKey, setApiKey] = useState("");
  const { wallet, isSignedIn } = useWallet();

  useEffect(() => {
    if (isSignedIn) {
      const getApiKey = async () => {
        // const apiKeyVal = await wallet.fetchKey();
        // console.log(apiKeyVal);
        // setApiKey(apiKeyVal);
        // console.log(apiKeyVal);
      };

      getApiKey();
    }
  }, [isSignedIn, wallet]);

  const handleCreateApiKey = async () => {
    if (isSignedIn) {
      await wallet.authorizeApiUser();
      //   await wallet.saveApiKey(apiKeyVal);
      console.log("API key res");

      //   setApiKey(await wallet.fetchApiKey());
    }
  };

  return (
    <main className={styles.container}>
      <section className={styles.banner}>
        <div className={styles.bannerImg}>
          <img src={bannerImg} alt="robbot" width={200} />
        </div>
        <div className={styles.texts}>
          <h1>Getting Started with reCEPTION</h1>
          <p>
            Advanced features such as smart contract fraud prevention, analytics
            reports, code follow-up, data collection, etc. are also supported.
          </p>
          <ul className={styles.lists}>
            <li>Free for 6 months for first time subscribers only.</li>
            <li>No credit card required</li>
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.heading}>
          <h2>API Keys</h2>
          <Button
            label="Create New API Key"
            type="primary"
            onClick={handleCreateApiKey}
          />
        </div>

        <div className={styles.apiKeys}>
          <div className={styles.apiKey}>
            <div className={styles.apiKeyText}>
              <h3>Your API Key</h3>
              <p>
                Your API key is a unique identifier that allows you to
                authenticate with reCEPTION&lsquo;s API.
              </p>
            </div>
            {apiKey ? (
              <div className={styles.apiKeyActions}>
                <button>
                  <Copy size={24} />
                </button>
                <pre>{apiKey}</pre>
              </div>
            ) : (
              <div className={styles.apiKeyActions}>
                <p>No API key found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Console;
