import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import styles from "./Docs.module.css";

const Docs = () => {
  return (
    <div className={styles.docs}>
      <Sidebar />
      <div className={styles.contents}>
        <Outlet />
      </div>
    </div>
  );
};

export default Docs;
