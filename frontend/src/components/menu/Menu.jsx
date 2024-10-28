import PropTypes from "prop-types";
import Button from "../button/Button";
import styles from "./Menu.module.css";

const Menu = ({ onUpload, onLogout, onConsole }) => {
  return (
    <div className={styles.menu}>
      <Button label="Upload" onClick={onUpload} />
      <Button label="Admin console" onClick={onConsole} />
      <Button label="Logout" onClick={onLogout} />
    </div>
  );
};

Menu.propTypes = {
  onLogout: PropTypes.func,
  onUpload: PropTypes.func,
  onConsole: PropTypes.func,
};

export default Menu;
