import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ type = "secondary", label, onClick, disabled }) => {
  return (
    <button className={styles[type]} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
export default Button;
