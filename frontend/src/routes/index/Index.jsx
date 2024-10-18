// import styles from "./Index.module.css";

import Banner from "../../components/banner/Banner";
import Cta from "../../components/cta/Cta";
import Features from "../../components/features/Features";
import How from "../../components/how/How";

const Index = () => {
  return (
    <main>
      <Banner />
      <Features />
      <How />
      <Cta />
    </main>
  );
};

export default Index;
