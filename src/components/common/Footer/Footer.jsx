import { Mail, Phone, MapPin } from "lucide-react";

import styles from "./Footer.module.css";

import Container from "../../ui/Container/Container";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {/* Brand */}

          <div className={styles.column}>
            <h2>Shiva Build Mart</h2>

            <p>
              Premium construction materials, plywood, hardware and interior
              solutions under one roof.
            </p>
          </div>

          {/* Quick Links */}

          <div className={styles.column}>
            <h3>Quick Links</h3>

            <a href="#">Home</a>

            <a href="#">Shop</a>

            <a href="#">Categories</a>

            <a href="#">Contact</a>
          </div>

          {/* Categories */}

          <div className={styles.column}>
            <h3>Categories</h3>

            <a href="#">Plywood</a>

            <a href="#">Laminates</a>

            <a href="#">Hardware</a>

            <a href="#">Cement</a>
          </div>

          {/* Contact */}

          <div className={styles.column}>
            <h3>Contact</h3>

            <p>
              <Phone size={16} />
              +91 9876543210
            </p>

            <p>
              <Mail size={16} />
              info@shivabuildmart.com
            </p>

            <p>
              <MapPin size={16} />
              Noida, Uttar Pradesh
            </p>

            <div className={styles.social}>
              <span>Instagram</span>

              <span>YouTube</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          © 2026 Shiva Build Mart. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
