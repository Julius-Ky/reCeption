import bannerImg from "../../../../assets/robot.png";
import Card from "../../../../components/card/Card";
import {
  BadgeAlert,
  ChartNoAxesColumnDecreasing,
  LucideFileKey2,
  Upload,
} from "lucide-react";
import styles from "./Home.module.css";
import NavButton from "../../../../components/navButton/NavButton";

const Home = () => {
  const services = [
    {
      title: " Smart contract Analysis",
      desc: "upload your smart contract code for analysis, where AI identifies security vulnerabilities, code flaws, and potential scams.",
      icon: <Upload />,
    },
    {
      title: "Admin Console",
      desc: "As an admin, setup and manage reCeption features on your website, and monitor the performance of your smart contracts.",
      icon: <ChartNoAxesColumnDecreasing />,
    },
    {
      title: "reCeption API",
      desc: "Integrate reCeption API with your application to provide automated verification solutions for your users, and developers.",
      icon: <LucideFileKey2 />,
    },
    {
      title: "Detailed Reporting",
      desc: "Get detailed reports on the security of your smart contract, and the performance of reCeption features on your website.",
      icon: <BadgeAlert />,
    },
  ];
  return (
    <main className={styles.container}>
      <div className={styles.section}>
        <h1>reCeption documentation homepage</h1>
        <p>
          This hompage will provide you with overview of what you can do with
          reCeption.
        </p>
      </div>

      <div className={styles.heroImage}>
        <img src={bannerImg} alt="hero" width={200} />
      </div>
      <div className={styles.section}>
        <h2>What is reCeption?</h2>
        <p>
          reCeption is an AI-powered security platform that offers functionality
          similar to reCAPTCHA, providing automated verification solutions for
          both Web2 and Web3 environments. The project aims to enhance the
          security and quality of smart contracts and provide automated
          validation solutions for users and developers.
        </p>
      </div>

      <div className={styles.section}>
        <h2>Features</h2>
        <p>
          reCeption offers the following features to enhance the security and
          quality of your smart contracts:
        </p>
      </div>

      <div className={styles.row}>
        {services.map((service, index) => (
          <Card
            key={index}
            title={service.title}
            desc={service.desc}
            icon={service.icon}
          />
        ))}
      </div>

      <div className={styles.navigation}>
        <NavButton label={"Next"} text={"Create API KEY"} />
      </div>
    </main>
  );
};

export default Home;
