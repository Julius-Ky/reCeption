import { UploadCloud } from "lucide-react";
import styles from "./FileUpload.module.css";
import Button from "../button/Button";
import PropTypes from "prop-types";
import { useState } from "react";

const FileUpload = ({ handleUpload }) => {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        setFileContent(content);
      };
      reader.readAsText(uploadedFile);
    }
  };

  const handleUploadFile = (e) => {
    e.preventDefault();
    if (fileContent) {
      console.log("File content:", fileContent);
      handleUpload(fileContent);
    }
  };

  return (
    <form className={styles.upload}>
      <label htmlFor="upload" className={styles.uploadLabel}>
        <div className={styles.label}>
          <UploadCloud size={24} />
          <p>
            <span>Drag and Drop</span> or Browse Files
          </p>
        </div>
        File Format: .sol, .rs, .ts
        {file && <p>{file.name}</p>}
      </label>
      <input
        type="file"
        name="upload"
        id="upload"
        onChange={handleFileChange}
      />

      <Button label="Upload" onClick={handleUploadFile} />
    </form>
  );
};

FileUpload.propTypes = {
  handleUpload: PropTypes.func.isRequired,
};

export default FileUpload;
