import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ type = "secondary", label, onClick }) => {
  return (
    <button className={styles[type]} onClick={onClick}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};
export default Button;
