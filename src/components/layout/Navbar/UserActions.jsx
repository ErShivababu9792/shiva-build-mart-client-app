import { Heart, ShoppingCart, User } from "lucide-react";

import { Link } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import styles from "./UserActions.module.css";

const UserActions = () => {
  const { user, logout } = useAuth();
  console.log("NAVBAR USER:", user);

  return (
    <div className={styles.actions}>
      <Link to="/wishlist">
        <Heart size={20} />
      </Link>

      <Link to="/cart">
        <ShoppingCart size={20} />
      </Link>

      {user ? (
        <div className={styles.user}>
          <User size={20} />

          <span>{user.name}</span>

          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </div>
  );
};

export default UserActions;
