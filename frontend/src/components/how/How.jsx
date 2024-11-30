import Card from "../card/Card";
import styles from "./How.module.css";
import upload from "../../assets/upload.svg";
import bug from "../../assets/bug.svg";
import listChecks from "../../assets/list-checks.svg";

const How = () => {
  const steps = [
    {
      title: "Upload your contract file",
      description:
        "By providing the link or Contract file to your knowledge base, you can transform one chain to other from the code on your contract and suggestions for optimization.",
      icon: upload,
    },
    {
      title: "Easily inspect smart contract code",
      description:
        "Receive code vulnerabilities, automatic corrections, and a summarized report with a single upload.",
      icon: bug,
    },
    {
      title: "Easy-to-read, summarized reports",
      description:
        "Receive a friendly report that summarizes only the important points and is easy to understand and read.",
      icon: listChecks,
    },
  ];
  return (
    <section className={styles.how} id="how">
      <div className={styles.header}>
        <p className={styles.top}>How does code inspection work?</p>
        <h2>5 Minutes Set-up Process</h2>
        <p className={styles.desc}>
          Get clear, actionable reports with explanations of issues and fixes
          applied.
        </p>
      </div>
      <div className={styles.row}>
        {steps.map((step, index) => (
          <Card
            key={index}
            title={step.title}
            iconPosition={"center"}
            desc={step.description}
            icon={step.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default How;
