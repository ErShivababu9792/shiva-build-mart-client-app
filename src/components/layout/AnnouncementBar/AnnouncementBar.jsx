import styles from "./AnnouncementBar.module.css";

const AnnouncementBar = () => {
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        🚚 Free Delivery on Orders Above ₹10,000.00
      </div>

      <div className={styles.right}>
        📞 +91 9140256355
      </div>
    </div>
  );
};

export default AnnouncementBar;