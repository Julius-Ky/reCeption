import { useState } from "react";
import bannerImg from "../../assets/glass5.png";
import styles from "./Upload.module.css";
import FileUpload from "../../components/fileUpload/FileUpload";
import UrlSearch from "../../components/urlSearch/UrlSearch";
import useWallet from "../../hooks/useWallet";
import How from "../../components/how/How";

const Upload = () => {
  const [currebtTab, setCurrentTab] = useState("upload");
  const { wallet, isSignedIn, accountId } = useWallet();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleUpload = async (fileContent) => {
    if (isSignedIn) {
      setIsAnalyzing(true);
      try {
        const apiKeyVal = await wallet.fetchKey(accountId);
        console.log("API Key:", apiKeyVal, typeof apiKeyVal);

        // Make the POST request
        const response = await fetch(
          "https://98b5-2806-2a0-f12-8e60-e88f-9d11-582d-502e.ngrok-free.app/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": "Df8qoDj4XCVVYaHsX27Nm4p1YuCLA2ZoowJ1bSipegw8",
            },
            body: JSON.stringify({ contract_source_code: fileContent }), // Convert the payload to JSON
          }
        );

        // Check if the request was successful
        if (response.ok) {
          const data = await response.json();
          console.log("Response data:", data);
          setAnalysisResult(data);
          setIsAnalyzing(false);
        } else {
          console.error("Error:", response.status, response.statusText);
          setIsAnalyzing(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setIsAnalyzing(false);
      }
    } else {
      console.log("User is not signed in.");
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
          {isAnalyzing && <p>Analysing your code...</p>}
          {analysisResult && (
            <div className={styles.result}>
              <h3>Analysis Result:</h3>
              <p>
                <strong>Predicted class:</strong>{" "}
                {analysisResult.predicted_class}
              </p>
              <p>
                <strong>Confidence:</strong> {analysisResult.confidence}%
              </p>
            </div>
          )}
        </div>
      </div>
      <How />
    </main>
  );
};

export default Upload;
