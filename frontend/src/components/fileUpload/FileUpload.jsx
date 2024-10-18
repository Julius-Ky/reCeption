import { FileUp } from "lucide-react";
import styles from "./FileUpload.module.css";

const FileUpload = () => {
  return (
    <div className={styles.upload}>
      <div className={styles.icon}>
        <FileUp size={64} />
      </div>
      <label className={styles.label}>
        <input type="file" />
        <span>Choose a file</span>
      </label>
    </div>
  );
};

export default FileUpload;
