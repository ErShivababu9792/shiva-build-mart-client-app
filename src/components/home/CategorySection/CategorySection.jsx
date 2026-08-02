import { ArrowRight } from "lucide-react";

import styles from "./CategorySection.module.css";

import Container from "../../ui/Container/Container";

const categories = [
  { name: "Plywood" },
  { name: "Laminates" },
  { name: "Hardware" },
  { name: "Cement" },
  { name: "Paint" },
  { name: "Interior Fittings" },
];

const CategorySection = () => {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.heading}>
          <p>Explore Categories</p>
          <h2>Shop By Category</h2>
        </div>

        <div className={styles.grid}>
          {categories.map((item, index) => (
            <button className={styles.card} key={index}>
              <span>{item.name}</span>
              <ArrowRight size={16} />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategorySection;