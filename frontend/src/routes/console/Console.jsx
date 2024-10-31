import { Copy } from "lucide-react";
import bannerImg from "../../assets/logo.png";
import Button from "../../components/button/Button";
import styles from "./Console.module.css";
import useWallet from "../../hooks/useWallet";
import { useEffect, useState } from "react";

const Console = () => {
  const [apiKey, setApiKey] = useState("");
  const { wallet, isSignedIn, accountId } = useWallet();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wallet && isSignedIn && accountId) {
      const getApiKey = async () => {
        const apiKeyVal = await wallet.fetchKey(accountId);
        setApiKey(apiKeyVal);
        setLoading(false);
      };

      const saveApiKey = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const txnHash = urlParams.get("transactionHashes");

        if (txnHash && accountId) {
          if (!sessionStorage.getItem("transactionHashSaved")) {
            wallet.saveApiKey(accountId, txnHash);
            console.log("API key saved");
            sessionStorage.setItem("transactionHashSaved", "true");
          } else {
            console.log("API key already saved");
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
          }
        }
      };

      saveApiKey();
      getApiKey();
    }
  }, [isSignedIn, wallet, accountId]);

  const handleCreateApiKey = async () => {
    if (isSignedIn) {
      await wallet.authorizeApiUser(accountId);
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
            // disabled={loading || apiKey}
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
            {loading ? (
              <div className={styles.apiKeyActions}>
                <h3>API Key</h3>
                <div>
                  <p>Loading...</p>
                </div>
              </div>
            ) : apiKey ? (
              <div className={styles.apiKeyActions}>
                <h3>API Key</h3>
                <div>
                  <button>
                    <Copy size={24} />
                  </button>
                  <pre>{apiKey}</pre>
                </div>
              </div>
            ) : (
              <div className={styles.apiKeyActions}>
                <h3>API Key</h3>
                <div>
                  <p>No API key found</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Console;
