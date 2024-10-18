import { Bug, ListChecks, Upload } from "lucide-react";
import Card from "../card/Card";
import styles from "./How.module.css";

const How = () => {
  const steps = [
    {
      title: "Upload your contract file",
      description:
        "By providing the link or Contract file to your knowledge base, you can transform one chain to other from the code on your contract and suggestions for optimization.",
      icon: <Upload />,
    },
    {
      title: "Easily inspect smart contract code",
      description:
        "Receive code vulnerabilities, automatic corrections, and a summarized report with a single upload.",
      icon: <Bug />,
    },
    {
      title: "Easy-to-read, summarized reports",
      description:
        "Receive a friendly report that summarizes only the important points and is easy to understand and read.",
      icon: <ListChecks />,
    },
  ];
  return (
    <section className={styles.how}>
      <h2 className={styles.header}>5 Minutes Set-up Process</h2>
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
