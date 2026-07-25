import styles from "./SectionTitle.module.css";

const SectionTitle = ({
  title,
  subtitle
}) => {
  return (
    <div className={styles.wrapper}>
      <p>{subtitle}</p>

      <h2>{title}</h2>
    </div>
  );
};

export default SectionTitle;