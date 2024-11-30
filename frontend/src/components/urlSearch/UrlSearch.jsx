import styles from "./UrlSearch.module.css";
import Button from "../button/Button";

const UrlSearch = () => {
  return (
    <form className={styles.search}>
      <input type="url" placeholder="URL" className={styles.input} />
      <Button label="Add URL" />
    </form>
  );
};

export default UrlSearch;
