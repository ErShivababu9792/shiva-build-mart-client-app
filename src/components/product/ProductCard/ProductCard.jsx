import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

import styles from "./ProductCard.module.css";

import { addToCart } from "../../../services/cart.service";

import IconButton from "../../ui/IconButton/IconButton";
import { addToWishlist } from "../../../services/wishlist.service";


const ProductCard = ({ product }) => {
  



  // ==========================
  // WISHLIST FUNCTION
  // ==========================

  const handleWishlist = async()=>{

    try{


        await addToWishlist(product.id);


        alert(
            "Added To Wishlist ❤️"
        );


    }
    catch(error){


        alert(
            error.response?.data?.message ||
            "Wishlist Error"
        );


    }

  };



  // ==========================
  // CART FUNCTION
  // ==========================

  


  const [loading,setLoading] = useState(false);




  const handleCart = async()=>{


    try{


      setLoading(true);


      await addToCart(product.id);


      alert("Added to Cart");


    }

    catch(error){


      alert(
        error.response?.data?.message ||
        "Cart Error"
      );


    }

    finally{


      setLoading(false);


    }


  };






  const mrpPrice = product.price;


  const sellingPrice =
    product.finalPrice ||
    product.price;



  const discount =
    product.discountPercentage || 0;






  return (



    <div className={styles.card}>




      {/* IMAGE */}



      <div className={styles.imageBox}>


        {
          discount > 0 && (

            <span className={styles.discount}>

              {discount}% OFF

            </span>

          )
        }






        <div className={styles.wishlist}>


          <IconButton 
title="Wishlist"
onClick={handleWishlist}
>

    <Heart size={18}/>

</IconButton>


        </div>







        <Link

          to={`/product/${product.id}`}

          className={styles.productLink}

        >


          <img

            src={
              product.image ||
              "/images/no-product.png"
            }

            alt={product.name}

          />


        </Link>



      </div>









      {/* CONTENT */}



      <div className={styles.content}>




        <Link

          to={`/product/${product.id}`}

          className={styles.productLink}

        >


          <h3>

            {product.name}

          </h3>


        </Link>







        <p className={styles.description}>


          {
            product.description?.slice(0,55)
            ||
            "Premium quality interior product"
          }


        </p>









        {/* RATING */}



        <div className={styles.rating}>


          <Star

            size={15}

            fill="currentColor"

          />


          <span>

            4.8

          </span>


          <small>

            (120)

          </small>


        </div>









        {/* PRICE */}




        <div className={styles.priceBox}>


          <span className={styles.price}>


            ₹{sellingPrice}


          </span>





          {

            discount > 0 && (


              <>


              <span className={styles.oldPrice}>


                ₹{mrpPrice}


              </span>





              <span className={styles.discountText}>


                {discount}% OFF


              </span>



              </>


            )

          }




        </div>









        {/* STOCK */}





        {

          product.stock <= 5 &&
          product.stock > 0 &&


          (

            <p className={styles.lowStock}>


              Only {product.stock} left


            </p>


          )

        }







        {

          product.stock === 0 &&


          (

            <p className={styles.outStock}>


              Out of Stock


            </p>


          )

        }









        {/* CART BUTTON */}




        <button


          className={styles.cartBtn}



          disabled={

            loading ||

            product.stock === 0

          }



          onClick={handleCart}



        >



          <ShoppingCart size={16}/>





          {

            loading

            ?

            "Adding..."

            :

            "Add To Cart"


          }



        </button>







      </div>






    </div>



  );


};




export default ProductCard;