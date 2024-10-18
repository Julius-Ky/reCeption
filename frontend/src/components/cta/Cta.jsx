import Button from "../button/Button";
import styles from "./Cta.module.css";

const Cta = () => {
  return (
    <section className={styles.cta}>
      <h2 className={styles.header}>Ready to Maximize your Support?</h2>
      <p>
        Spend 5 minutes to get a contract code ready that can be used to build
        your next web3 startup.
      </p>

      <Button label="Get Started Now" />
    </section>
  );
};

export default Cta;
