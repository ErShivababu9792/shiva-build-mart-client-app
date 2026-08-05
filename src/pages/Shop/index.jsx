import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getProducts } from "../../services/product.service";

import ProductCard from "../../components/product/ProductCard/ProductCard";
import styles from "./Shop.module.css";


const Shop = () => {


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [searchParams] = useSearchParams();





  // ==========================
  // GET SEARCH FROM URL
  // ==========================


  useEffect(()=>{


    const searchValue = searchParams.get("search");


    setSearch(searchValue || "");


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
  // CATEGORIES (products se derive)
  // ==========================


  const categories = [
    "All",
    ...new Set(

      products
        .map((product) => product.category?.name)
        .filter(Boolean)

    ),
  ];






  // ==========================
  // LIVE SEARCH + CATEGORY FILTER
  // ==========================


  const filteredProducts = products.filter((product)=>{


    const searchText = search
      .toLowerCase()
      .trim();


    const matchesSearch =

      searchText === "" ||

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
      .includes(searchText);


    const matchesCategory =

      selectedCategory === "All" ||

      product.category?.name === selectedCategory;


    return matchesSearch && matchesCategory;


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


      {/* Categories - navbar ke turant baad, simple text form */}

      <div className={styles.categories}>

        {
          categories.map((category) => (

            <span
              key={category}
              className={
                selectedCategory === category
                  ? `${styles.categoryItem} ${styles.categoryActive}`
                  : styles.categoryItem
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </span>

          ))
        }

      </div>


      <h1>
        All Products
      </h1>




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