import { ArrowRight } from "lucide-react";

import styles from "./Hero.module.css";

import Button from "../../ui/Button/Button";


const Hero = () => {

  return (

    <section className={styles.hero}>


      <div className={styles.overlay}></div>



      <div className={styles.content}>


        <p className={styles.small}>
          Welcome to Shiva Build Mart
        </p>



        <h1>
          Build Your Dream Home
          With Quality Materials
        </h1>



        <p className={styles.desc}>
          Premium plywood, hardware, construction
          materials and interior solutions under one roof.
        </p>



        <div className={styles.actions}>


          <Button>
            Shop Now
            <ArrowRight size={18}/>
          </Button>



          <Button variant="secondary">
            Explore Products
          </Button>


        </div>


      </div>


    </section>

  );

};


export default Hero;