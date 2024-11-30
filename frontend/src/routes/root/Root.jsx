import { Outlet } from "react-router-dom";
import Header from "../../components/header/Header";
import styles from "./Root.module.css";

const Root = () => {
  return (
    <div className={`dark ${styles.root}`}>
      <Header />
      <div className={styles.children}>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
