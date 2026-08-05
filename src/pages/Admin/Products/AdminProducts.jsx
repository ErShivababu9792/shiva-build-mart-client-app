import { useEffect, useState } from "react";

import {
  getProducts,
  deleteProduct,
} from "../../../services/product.service";

import styles from "./AdminProducts.module.css";

import { Link } from "react-router-dom";


const AdminProducts = () => {


  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);



  const fetchProducts = async () => {

    try {

      const data = await getProducts();



      setProducts(data);


    } catch (error) {



    } finally {

      setLoading(false);

    }

  };




  const handleDelete = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );


    if (!confirmDelete) return;



    try {


      await deleteProduct(id);



      alert("Product Deleted Successfully");



      fetchProducts();



    } catch (error) {






      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );


    }


  };





  useEffect(() => {

    fetchProducts();

  }, []);





  if (loading) {

    return <h2>Loading...</h2>;

  }





  return (

    <div className={styles.container}>


      <h1>
        Manage Products
      </h1>



      <Link
        to="/admin/products/add"
        className={styles.addBtn}
      >

        + Add Product

      </Link>





      <table>


        <thead>

          <tr>

            <th>
              Image
            </th>


            <th>
              Name
            </th>


            <th>
              Price
            </th>


            <th>
              Stock
            </th>


            <th>
              Action
            </th>


          </tr>


        </thead>





        <tbody>


          {
            products.map((product)=>(


              <tr key={product.id}>


                <td>

                  <img

                    src={
                      product.image ||
                      "/images/no-product.png"
                    }

                    width="60"

                    alt={product.name}

                  />

                </td>



                <td>
                  {product.name}
                </td>



                <td>
                  ₹{product.price}
                </td>



                <td>
                  {product.stock}
                </td>



                <td>


                  <Link

                    to={`/admin/products/edit/${product.id}`}

                    className={styles.editBtn}

                  >

                    Edit

                  </Link>





                  <button

                    className={styles.deleteBtn}

                    onClick={() => handleDelete(product.id)}

                  >

                    Delete

                  </button>



                </td>



              </tr>


            ))
          }



        </tbody>


      </table>


    </div>

  );


};


export default AdminProducts;