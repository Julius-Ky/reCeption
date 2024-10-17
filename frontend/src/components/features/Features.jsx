import Card from "../card/Card";
import styles from "./Features.module.css";
import {
  BadgeAlert,
  Code2,
  MonitorSmartphone,
  ShieldCheck,
  UserCheck2,
} from "lucide-react";

const Features = () => {
  const featuresData = [
    {
      icon: <ShieldCheck size={40} strokeWidth={2} absoluteStrokeWidth />,
      title: "Security Analysis",
      desc: "Detect vulnerabilities and code flaws in your smart contracts to ensure robust security.",
    },
    {
      icon: <Code2 size={40} strokeWidth={2} absoluteStrokeWidth />,
      title: "Code Improvement",
      desc: "Apply security patches and optimize performance automatically based on analysis.",
    },
    {
      icon: <BadgeAlert size={40} strokeWidth={2} absoluteStrokeWidth />,
      title: "Detailed Reporting",
      desc: "Get clear, actionable reports with explanations of issues and fixes applied.",
    },
    {
      icon: <MonitorSmartphone size={40} strokeWidth={2} absoluteStrokeWidth />,
      title: "User-Friendly Interface",
      desc: "Simple code upload and real-time feedback for an intuitive user experience.",
    },
    {
      icon: <UserCheck2 />,
      title: "Admin Console",
      desc: "As an admin, setup and manage reCeption features on your website.",
    },
  ];
  return (
    <section className={styles.features}>
      <h2 className={styles.header}>Features</h2>
      <div className={styles.row}>
        {featuresData.map((feature, index) => (
          <Card
            key={index}
            iconPosition="left"
            icon={feature.icon}
            title={feature.title}
            desc={feature.desc}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
