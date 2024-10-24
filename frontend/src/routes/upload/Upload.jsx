import { useState } from "react";
import bannerImg from "../../assets/robot.png";
import styles from "./Upload.module.css";
import FileUpload from "../../components/fileUpload/FileUpload";
import UrlSearch from "../../components/urlSearch/UrlSearch";

const Upload = () => {
  const [currebtTab, setCurrentTab] = useState("upload");

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };
  return (
    <main className={styles.upload}>
      <div className={styles.heroImage}>
        <img src={bannerImg} alt="hero" width={200} />
      </div>
      <p className={styles.center}>
        Analyze your smart contract to detect vulnerabilities, get automated
        fixes, <br /> and detailed reports on code quality and security.
      </p>
      <div className={styles.navs}>
        <button
          className={`${styles.btn} ${
            currebtTab === "upload" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("upload")}
        >
          Upload{" "}
        </button>
        <button
          className={`${styles.btn} ${
            currebtTab === "url" ? styles.active : ""
          }`}
          onClick={() => handleTabChange("url")}
        >
          URL
        </button>
      </div>
      {currebtTab === "upload" ? <FileUpload /> : <UrlSearch />}
    </main>
  );
};

export default Upload;
