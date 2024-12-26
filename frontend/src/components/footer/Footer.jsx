import styles from "./Footer.module.css";
import Github from "../../assets/github.svg";
import Discord from "../../assets/discord.svg";
import Twitter from "../../assets/twitter.svg";
import Linkedin from "../../assets/linkedin.svg";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.socials}>
          <a href="" target="_blank" rel="noreferrer">
            <img src={Github} alt="Github" width={24} />
          </a>
          <a href="" target="_blank" rel="noreferrer">
            <img src={Discord} alt="Discord" width={30} />
          </a>
          <a href="" target="_blank" rel="noreferrer">
            <img src={Twitter} alt="Twitter" width={20} />
          </a>
          <a href="" target="_blank" rel="noreferrer">
            <img src={Linkedin} alt="Linkedin" width={24} />
          </a>
        </div>
        <div className={styles.toggler}>
          <label className={styles.switch}>
            <input type="checkbox" />
            <span className={styles.slider}></span>
          </label>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
