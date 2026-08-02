import { ArrowRight, Hammer } from "lucide-react";
import { useNavigate } from "react-router-dom";

import styles from "./Hero.module.css";

import Button from "../../ui/Button/Button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <p className={styles.small}>
          <Hammer size={14} />
          Welcome to Shiva Build Mart
        </p>

        <h1>
          Build Your Dream Home With{" "}
          <span className={styles.highlight}>Quality Materials</span>
        </h1>

        <p className={styles.desc}>
          Premium plywood, hardware, construction materials and interior
          solutions under one roof.
        </p>

        <div className={styles.actions}>
          <Button onClick={() => navigate("/shop")}>
            Shop Now
            <ArrowRight size={18} />
          </Button>

          <Button variant="secondary" onClick={() => navigate("/shop")}>
            Explore Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;