import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCategories
} from "../../../services/category.service";

import styles from "./AdminCategories.module.css";


const AdminCategories = () => {


  const [categories,setCategories] = useState([]);

  const [loading,setLoading] = useState(true);



  const fetchCategories = async()=>{

    try{

      const data = await getCategories();

      setCategories(data);


    } catch (error) {
      // Handle category load failure
    } finally {

      setLoading(false);

    }

  };




  useEffect(()=>{

    fetchCategories();

  },[]);





  if(loading){

    return <h2>Loading Categories...</h2>;

  }





  return (

    <div className={styles.container}>


      <div className={styles.header}>


        <h1>
          Manage Categories
        </h1>



        <Link
          to="/admin/categories/add"
          className={styles.addBtn}
        >

          + Add Category

        </Link>


      </div>





      <div className={styles.grid}>


        {
          categories.map((category)=>(


            <div
              className={styles.card}
              key={category.id}
            >


              <img

                src={
                  category.image ||
                  "/images/no-product.png"
                }

                alt={category.name}

              />



              <h3>
                {category.name}
              </h3>



              <p>

                Products:
                {" "}
                {
                  category.products?.length || 0
                }

              </p>



            </div>


          ))
        }


      </div>



    </div>

  );


};


export default AdminCategories;