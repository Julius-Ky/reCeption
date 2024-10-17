import PropTypes from "prop-types";
import Button from "../button/Button";
import styles from "./Menu.module.css";

const Menu = ({ onLogout }) => {
  return (
    <div className={styles.menu}>
      <Button label="Upload" />
      <Button label="Logout" onClick={onLogout} />
    </div>
  );
};

Menu.propTypes = {
  onLogout: PropTypes.func,
};

export default Menu;
