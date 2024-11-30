import { Copy, PercentCircle } from "lucide-react";
import Button from "../../components/button/Button";
import styles from "./Console.module.css";
import useWallet from "../../hooks/useWallet";
import { useCallback, useEffect, useState } from "react";
import glass4 from "../../assets/glass-4.png";

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
      {/* Banner Section */}
      <section className={styles.banner}>
        <div className={styles.texts}>
          <h1>Getting Started with reCEPTION</h1>
          <p>
            Unlock advanced features like smart contract fraud prevention,
            detailed <br /> analytics reports, code monitoring, data collection,
            and more.
          </p>
          <div className={styles.icon}>
            <PercentCircle size={24} />
            Special Offer: Enjoy 6 months free for first-time subscribers—no
            credit card required!
          </div>
        </div>
      </section>

      {/* API Key Section */}
      <section className={styles.api}>
        <img src={glass4} alt="icon" />
        <div>
          <h2 className={styles.header}>API Key</h2>
          <p>
            Your API key is a unique identifier used to authenticate and
            securely access Reception&lsquo;s API.
          </p>
          <form>
            <button className={styles.copy}>
              <Copy size={24} />
            </button>
            <input
              type="text"
              disabled
              value={apiKey}
              className={styles.input}
            />
            <Button
              label={loading ? "Loading..." : "Create New API Key"}
              onClick={handleCreateApiKey}
              disabled={loading}
            />
          </form>
        </div>
      </section>

      {/* How it Works Section */}
      <section className={styles.howItWorks}>
        <h2 className={styles.howTitle}>How it works?</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <span className={styles.stepNumber}>1</span>
            <h3>Configure your API</h3>
            <p>
              Generate and securely store your unique API key for
              authentication.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>2</span>
            <h3>Start the Development Server</h3>
            <p>
              Start the development server by running the following command in
              your terminal: <br />
              <code>cd my-project && npm start</code>
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>3</span>
            <h3>Integrate Reception&lsquo;s API</h3>
            <p>
              Use your API key to authenticate and access advanced features such
              as smart contract fraud prevention, analytics reports, and code
              monitoring.
            </p>
          </div>
          <div className={styles.step}>
            <span className={styles.stepNumber}>4</span>
            <h3>Begin Building!</h3>
            <p>Unleash the full potential of your project with Reception.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Console;
