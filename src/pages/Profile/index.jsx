import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>My Account</h1>

        <div className={styles.userInfo}>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
        </div>

        <div className={styles.menu}>

          <Link to="/orders" className={styles.menuItem}>
            📦 My Orders
          </Link>

          <Link to="/profile/addresses" className={styles.menuItem}>
            📍 My Addresses
          </Link>

          <Link to="/wishlist" className={styles.menuItem}>
            ❤️ Wishlist
          </Link>

          <Link to="/profile/password" className={styles.menuItem}>
            🔐 Change Password
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Profile;