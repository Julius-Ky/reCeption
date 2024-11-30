// import styles from "./Index.module.css";

import Banner from "../../components/banner/Banner";
import Cta from "../../components/cta/Cta";
import Features from "../../components/features/Features";
import How from "../../components/how/How";
import styles from "./Index.module.css";

const Index = () => {
  return (
    <main className={styles.container}>
      <Banner />
      <Features />
      <How />
      <Cta />
    </main>
  );
};

export default Index;
