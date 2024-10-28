import styles from "./GettingStarted.module.css";

const GettingStarted = () => {
  return (
    <main className={styles.container}>
      <div className={styles.section}>
        <h1>Getting started</h1>

        <ol>
          <li>
            <h2>Connect your Wallet</h2>
            <p>
              Connect your wallet by clicking the &ldquo;Connect Wallet&rdquo;
              button in the top right corner of the page.
            </p>

            <p>
              You can use BitteWallet, MyNearWallet, or any other Near supported
              wallet to connect.
            </p>
          </li>

          <li>
            <h2>Configure your API </h2>
            <p>
              Once you have connected your wallet, you can access the Admin
              Console by clicking on your username in the top right corner of
              the page.
            </p>
            <p>
              In the Admin Console, you can configure your API and manage your
              API keys.
            </p>
          </li>

          <li>
            <h2>Start the development server</h2>
            <p>
              Start the development server by running the following command in
              your terminal:
            </p>
            <pre>
              <code>cd my-project</code>
              <code>npm start</code>
            </pre>
          </li>
        </ol>
      </div>
    </main>
  );
};

export default GettingStarted;
