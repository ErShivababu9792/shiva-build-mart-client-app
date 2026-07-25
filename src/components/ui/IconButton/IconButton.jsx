import styles from "./IconButton.module.css";

const IconButton = ({
  children,
  onClick,
  title
}) => {
  return (
    <button
      className={styles.iconButton}
      onClick={onClick}
      title={title}
    >
      {children}
    </button>
  );
};

export default IconButton;