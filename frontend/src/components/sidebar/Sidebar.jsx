import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside>
      <ul className={styles.list}>
        <li>
          <NavLink
            to="/docs"
            end
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="getting-started"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Getting started
          </NavLink>
        </li>
        <li>
          <NavLink to={"endpoints"}>Endpoints</NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
