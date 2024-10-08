import styles from "./Card.module.css";
import PropType from "prop-types";

const Card = ({ icon, iconPosition, title, desc }) => {
  return (
    <div className={styles.card}>
      <div className={styles[iconPosition]}>{icon}</div>
      <div className={styles.content}>
        <h3>{title}</h3>
        <p> {desc}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  icon: PropType.element,
  iconPosition: PropType.string,
  title: PropType.string,
  desc: PropType.string,
};
export default Card;
