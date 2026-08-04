import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/product.service";

import ProductCard from "../../components/product/ProductCard/ProductCard";
import styles from "./Shop.module.css";


const Shop = () => {


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();





  // ==========================
  // GET SEARCH FROM URL
  // ==========================


  useEffect(()=>{


    const searchValue = searchParams.get("search");


    if(searchValue){

      setSearch(searchValue);

    }


  },[searchParams]);






  useEffect(() => {


    const fetchProducts = async () => {


      try {


        const data = await getProducts();

        console.log("PRODUCTS:", data);

        setProducts(Array.isArray(data) ? data : data?.products || []);


      } catch (error) {

        console.log(
          "Product Error:",
          error.response?.data || error.message || error,
          error.config?.url
        );

      } finally {


        setLoading(false);


      }


    };


    fetchProducts();


  }, []);






  // ==========================
  // LIVE SEARCH FILTER
  // ==========================


  const filteredProducts = products.filter((product)=>{


    const searchText = search
      .toLowerCase()
      .trim();



    if(searchText === ""){

      return true;

    }



    return (

      product.name
      ?.toLowerCase()
      .includes(searchText)


      ||

      product.category?.name
      ?.toLowerCase()
      .includes(searchText)


      ||

      product.description
      ?.toLowerCase()
      .includes(searchText)

    );


  });





  console.log("SEARCH VALUE:", search);





  if(loading){


    return (

      <h2>
        Loading Products...
      </h2>

    );


  }






  return (


    <section className={styles.shop}>


      <h1>
        All Products
      </h1>




      <input

        className={styles.search}

        placeholder="Search products..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

      />





      {
        filteredProducts.length === 0 ? (


          <h2>
            No Products Found
          </h2>


        ) : (



          <div className={styles.grid}>


            {
              filteredProducts.map((product)=>(


                <ProductCard

                  key={product.id}

                  product={product}

                />


              ))
            }


          </div>



        )
      }


    </section>


  );


};


export default Shop;