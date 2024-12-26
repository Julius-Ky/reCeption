import PropTypes from "prop-types";
import Button from "../button/Button";
import styles from "./Menu.module.css";

const Menu = ({ onUpload, onLogout, openDashboard }) => {
  return (
    <div className={styles.menu}>
      <Button label="Upload" onClick={onUpload} />
      <Button label="Logout" onClick={onLogout} />
      <Button label="Dashboard" onClick={openDashboard} />
    </div>
  );
};

Menu.propTypes = {
  onLogout: PropTypes.func,
  onUpload: PropTypes.func,
  openDashboard: PropTypes.func,
};

export default Menu;
