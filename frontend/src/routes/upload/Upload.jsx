import { useState } from "react";
import bannerImg from "../../assets/glass5.png";
import styles from "./Upload.module.css";
import FileUpload from "../../components/fileUpload/FileUpload";
import UrlSearch from "../../components/urlSearch/UrlSearch";
import useWallet from "../../hooks/useWallet";
import How from "../../components/how/How";

const Upload = () => {
  const [currebtTab, setCurrentTab] = useState("upload");
  const { wallet, isSignedIn } = useWallet();

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleUpload = async () => {
    if (isSignedIn) {
      console.log("Uploading...");
      await wallet.signInteraction();
    }
  };

  return (
    <main className={styles.upload}>
      <div className={styles.top}>
        <div className={styles.heroImage}>
          <img src={bannerImg} alt="hero" width={508} />
        </div>
        <div className={styles.right}>
          <div className={styles.heroTexts}>
            <h2>Upload and Inspect Your Code</h2>
            <p>
              Analyze your smart contract to detect vulnerabilities, get
              automated fixes, and detailed reports on code quality and
              security.
            </p>
          </div>
          <div className={styles.navs}>
            <button
              className={`${styles.btn} ${
                currebtTab === "upload" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("upload")}
            >
              Upload Your Code
            </button>
            <button
              className={`${styles.btn} ${
                currebtTab === "url" ? styles.active : ""
              }`}
              onClick={() => handleTabChange("url")}
            >
              Add URL
            </button>
          </div>
          {currebtTab === "upload" ? (
            <FileUpload handleUpload={handleUpload} />
          ) : (
            <UrlSearch />
          )}
        </div>
      </div>
      <How />
    </main>
  );
};

export default Upload;
