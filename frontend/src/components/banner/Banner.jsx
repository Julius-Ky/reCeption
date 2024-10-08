import styles from "./Banner.module.css";
import bannerImg from "../../assets/smart-sec.png";
import Button from "../button/Button";

const Banner = () => {
  return (
    <section className={styles.banner}>
      <div className={styles.heroTexts}>
        <h1 className={styles.header}>
          <span className={styles.emphasis}>Automated verificaton</span> <br />
          for both Web2 and Web3.
        </h1>
        <p>Enhancing the security and quality of smart contracts</p>
        <div className={styles.actions}>
          <Button type="primary" label="Upload" />
          <Button type="secondary" label="Get started" />
          <Button type="secondary" label="Github" />
        </div>
      </div>

      <div className={styles.heroImage}>
        <img src={bannerImg} alt="hero" width={200} />
      </div>
    </section>
  );
};

export default Banner;
