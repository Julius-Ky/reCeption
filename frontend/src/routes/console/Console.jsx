import { Copy } from "lucide-react";
import bannerImg from "../../assets/logo.png";
import Button from "../../components/button/Button";
import styles from "./Console.module.css";
import useWallet from "../../hooks/useWallet";
import { useCallback, useEffect, useState } from "react";

const Console = () => {
  const [apiKey, setApiKey] = useState("");
  const { wallet, isSignedIn, accountId } = useWallet();
  const [loading, setLoading] = useState(true);

  const getApiKey = useCallback(async () => {
    if (wallet && isSignedIn && accountId) {
      const apiKeyVal = await wallet.fetchKey(accountId);
      setApiKey(apiKeyVal);
      setLoading(false);
    }
  }, [wallet, isSignedIn, accountId]);

  useEffect(() => {
    getApiKey();
  }, [getApiKey]);

  const handleCreateApiKey = async () => {
    if (isSignedIn) {
      setLoading(true);
      const result = await wallet.authorizeApiUser(accountId);
      await wallet.saveApiKey(accountId, result);
      getApiKey();
    }

    setLoading(false);
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
            label={loading ? "Loading..." : "Create New API Key"}
            type="primary"
            onClick={handleCreateApiKey}
            disabled={loading}
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

      <section className={styles.section}>
        <div className={styles.heading}>
          <h2>Endpoints</h2>
        </div>

        <div className={styles.endpoints}>
          <span>To get access to all endpoints, pleasse visit: </span>
          <a
            href="https://reception-vn4m.onrender.com/api-docs/"
            target="_blank"
            rel="noreferrer noopener"
          >
            https://reception-api.near.org
          </a>
        </div>
      </section>
    </main>
  );
};

export default Console;
