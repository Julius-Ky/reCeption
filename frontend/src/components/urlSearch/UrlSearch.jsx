import { GlobeLock } from "lucide-react";
import styles from "./UrlSearch.module.css";

const UrlSearch = () => {
  return (
    <div className={styles.search}>
      <div className={styles.icon}>
        <GlobeLock size={64} />
      </div>

      <input type="url" name="url" placeholder="Enter URL here" className={styles.input} />
    </div>
  );
};

export default UrlSearch;
