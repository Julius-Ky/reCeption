import Card from "../card/Card";
import styles from "./Features.module.css";
import headerImg from "../../assets/stack.svg";

const Features = () => {
  const featuresData = [
    {
      title: "Security Analysis",
      desc: "Detect vulnerabilities and code flaws in your smart contracts to ensure robust security.",
    },
    {
      title: "Code Improvement",
      desc: "Apply security patches and optimize performance automatically based on analysis.",
    },
    {
      title: "Detailed Reporting",
      desc: "Get clear, actionable reports with explanations of issues and fixes applied.",
    },
    {
      title: "User-Friendly Interface",
      desc: "Simple code upload and real-time feedback for an intuitive user experience.",
    },
    {
      title: "Admin Console",
      desc: "As an admin, setup and manage reCeption features on your website.",
    },
    {
      title: "reCeption API",
      desc: "Integrate reCeption API with your application to provide automated verification solutions for your users.",
    },
  ];
  return (
    <section className={styles.features} id="solutions">
      <div className={styles.header}>
        <img src={headerImg} alt="" width={180} />
        <div>
          <h2>Our Solutions</h2>
          <p>Secure, optimize, and manage your smart contracts effortlessly.</p>
        </div>
      </div>
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
