import { NavLink, Outlet } from "react-router-dom";
import styles from "./Dashboard.module.css";
import { Bug, Headset, Home, Key } from "lucide-react";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <ul className={styles.links}>
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Home size={24} />
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="inspection"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Bug size={24} />
              Inspection
            </NavLink>
          </li>
          <li>
            <NavLink
              to="api-keys"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Key size={24} />
              Api Key
            </NavLink>
          </li>
          <li>
            <NavLink
              to="notifications"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Headset size={24} />
              Notification
            </NavLink>
          </li>
          <li>
            <NavLink
              to="account"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Headset size={24} />
              Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="support"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              <Headset size={24} />
              Support
            </NavLink>
          </li>
        </ul>
      </aside>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
