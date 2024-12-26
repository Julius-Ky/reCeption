import styles from "./Overview.module.css";

const Overview = () => {
  return (
    <div className={styles.overview}>
      <section className={styles.row}>
        <div className={styles.card}>
          <h3>Security Score</h3>
          <p className={styles.score}>
            98/<span>100</span>
          </p>
          <p>
            Average score of your uploaded smart <br /> contracts based on
            security checks
          </p>
        </div>
        <div className={styles.card}>
          <h3>Latest Activity</h3>
          <p className={styles.score}>
            3 vulnerabilities identified in your last upload
          </p>
          <p>View details of detected vulnerabilities</p>
        </div>
      </section>

      <section className={styles.row}>
        <div className={styles.card}>
          <h3>Performance Tracker</h3>
          <p className={styles.value}>
            Contracts Analyzed: 15 Issues Resolved: 27 Security Improvements:
            +45%
          </p>
        </div>
        <div className={styles.card}>
          <h3>API Usage Statistics</h3>
          <p className={styles.value}>
            API Requests This Month: 2,150 Quota Used: 43%
          </p>
        </div>
        <div className={styles.card}>
          <h3>Subscription Plan</h3>
          <p className={styles.score}>Free</p>
          <p>Unlock advanced security. Upgrade now!</p>
        </div>
      </section>
    </div>
  );
};

export default Overview;
