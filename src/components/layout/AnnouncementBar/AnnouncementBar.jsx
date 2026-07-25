import styles from "./AnnouncementBar.module.css";

const AnnouncementBar = () => {
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        🚚 Free Delivery on Orders Above ₹999
      </div>

      <div className={styles.right}>
        📞 +91 9876543210
      </div>
    </div>
  );
};

export default AnnouncementBar;