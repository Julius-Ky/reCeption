import { FileUp } from "lucide-react";
import styles from "./FileUpload.module.css";
import Button from "../button/Button";
import PropTypes from "prop-types";

const FileUpload = ({ handleUpload }) => {
  return (
    <div className={styles.upload}>
      <div className={styles.icon}>
        <FileUp size={64} />
      </div>
      <label className={styles.label}>
        <input type="file" />
        <span>Choose a file</span>
      </label>
      <Button label="Upload" onClick={handleUpload} />
    </div>
  );
};

FileUpload.propTypes = {
  handleUpload: PropTypes.func.isRequired,
};

export default FileUpload;
