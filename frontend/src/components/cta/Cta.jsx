import Button from "../button/Button";
import styles from "./Cta.module.css";
import glass3 from "../../assets/glass-3.png";

const Cta = () => {
  return (
    <section className={styles.cta}>
      <img src={glass3} alt="icon" />
      <div>
        <h2 className={styles.header}>
          Subscribe to receive latest news, product updates and curated content.
        </h2>
        <form>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.input}
          />
          <Button label="Subscribe" />
        </form>
      </div>
    </section>
  );
};

export default Cta;
