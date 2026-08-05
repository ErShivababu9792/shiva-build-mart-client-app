import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Home,
  Store,
  Package,
  LogOut,
} from "lucide-react";

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}

        <Link to="/" className={styles.logo}>
          Shiva Build Mart
        </Link>

        {/* Search */}

        {location.pathname === "/shop" && (
          <div className={styles.search}>
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/shop?search=${search}`);
                }
              }}
            />
            <Search size={20} />
          </div>
        )}

        {/* Nav links */}
        <nav className={open ? styles.showMenu : ""}>
          <div className={styles.navLinks}>
            <Link to="/" onClick={() => setOpen(false)}>
              <Home size={18} />
              <span>Home</span>
            </Link>

            <Link to="/shop" onClick={() => setOpen(false)}>
              <Store size={18} />
              <span>Shop</span>
            </Link>

            <Link to="/wishlist" onClick={() => setOpen(false)}>
              <Heart size={18} />
              <span>Wishlist</span>
            </Link>

            <Link to="/cart" onClick={() => setOpen(false)}>
              <ShoppingCart size={18} />
              <span>Cart</span>
            </Link>

            <Link to="/orders" onClick={() => setOpen(false)}>
              <Package size={18} />
              <span>My Orders</span>
            </Link>
          </div>

          {/* Logout - sirf sidebar ke andar, sabse niche, sirf tab jab user logged in ho */}
          {user && (
            <div className={styles.navBottom}>
              <button
                className={styles.logoutBtn}
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </nav>

        {/* Right Side */}

        <div className={styles.right}>
          {user ? (
            <div className={styles.user}>
              <User size={20} />
              <span>{user.name}</span>
            </div>
          ) : (
            <div className={styles.auth}>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}

          {/* Mobile Menu Button */}

          <button className={styles.menuBtn} onClick={() => setOpen(!open)}>
            {open ? <X size={25} /> : <Menu size={25} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;