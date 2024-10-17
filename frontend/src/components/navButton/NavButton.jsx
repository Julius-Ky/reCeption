import { Link } from "react-router-dom";
import styles from "./NavButton.module.css";
import PropType from "prop-types";

const NavButton = ({ label, text }) => {
  return (
    <Link to="/docs" className={styles.navLink}>
      <p className={styles.small}>{label}</p>
      <p className={styles.big}>{text}</p>
    </Link>
  );
};

NavButton.propTypes = {
  label: PropType.string,
  text: PropType.string,
};

export default NavButton;
