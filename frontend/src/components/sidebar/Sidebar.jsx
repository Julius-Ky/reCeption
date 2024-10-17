import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside>
      <ul className={styles.list}>
        <li>
          <NavLink
            to={"/docs"}
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to={"docs/creat"}>Create API KEY</NavLink>
        </li>
        <li>
          <NavLink to={"docs/creat"}>Create API KEY</NavLink>
        </li>
        <li>
          <NavLink to={"docs/creat"}>Create API KEY</NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
