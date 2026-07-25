import styles from "./NavLinks.module.css";

const NavLinks = () => {
  return (
    <ul className={styles.links}>
      <li>Home</li>
      <li>Shop</li>
      <li>Categories</li>
      <li>Contact</li>
    </ul>
  );
};

export default NavLinks;