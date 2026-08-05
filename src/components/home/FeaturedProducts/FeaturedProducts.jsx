import { useEffect, useState } from "react";

import styles from "./FeaturedProducts.module.css";

import Container from "../../ui/Container/Container";
import SectionTitle from "../../ui/SectionTitle/SectionTitle";

import ProductCard from "../../product/ProductCard/ProductCard";

import { getProducts } from "../../../services/product.service";



const FeaturedProducts = () => {


  const [products,setProducts] = useState([]);



  useEffect(()=>{


    const fetchProducts = async()=>{


      try{


        const data = await getProducts();


        setProducts(data);


      }
      catch(error){
        // Handle featured product load error if necessary
      }


    };


    fetchProducts();


  },[]);






  return (


    <section className={styles.section}>


      <Container>


        <SectionTitle

          subtitle="Best Selling"

          title="Featured Products"

        />



        <div className={styles.grid}>


        {

          products.map((product)=>(


            <ProductCard

              key={product.id}

              product={product}

            />


          ))

        }


        </div>


      </Container>


    </section>


  );

};


export default FeaturedProducts;