import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import styles from "./Root.module.css";
import Footer from "../../components/footer/Footer";

const Root = () => {
  return (
    <div className={`dark ${styles.root}`}>
      <Header />
      <div className={styles.children}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
