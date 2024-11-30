import { UploadCloud } from "lucide-react";
import styles from "./FileUpload.module.css";
import Button from "../button/Button";
import PropTypes from "prop-types";

const FileUpload = ({ handleUpload }) => {
  return (
    <form className={styles.upload}>
      <label htmlFor="upload">
        <div className={styles.label}>
          <UploadCloud size={24} />
          <p>
            <span>Drag and Drop</span> or Browse Files
          </p>
        </div>
        File Format: .sol, .rs, .ts
      </label>
      <input type="file" name="upload" id="upload" />

      <Button label="Upload" onClick={handleUpload} />
    </form>
  );
};

FileUpload.propTypes = {
  handleUpload: PropTypes.func.isRequired,
};

export default FileUpload;
