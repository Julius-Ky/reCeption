import styles from "./Banner.module.css";
import bannerImg from "../../assets/glass-1.png";
import Button from "../button/Button";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.heroTexts}>
        <h1 className={styles.header}>AI-Powered Web3 Security</h1>
        <p className={styles.tag}>
          Revolutionizing Smart Contract Verification
        </p>
        <p className={styles.small}>
          Safeguard smart contracts across all chains—Ethereum, Avalanche,
          Solana, Near, and more
        </p>
        <div className={styles.actions}>
          <Button type="secondary" label="Get started" />
        </div>
      </div>

      <div className={styles.heroImage}>
        <img src={bannerImg} alt="hero" width={670} />
      </div>
    </section>
  );
};

export default Banner;
