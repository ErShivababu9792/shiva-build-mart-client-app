import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getProductById,
  updateProduct,
} from "../../../services/product.service";

import styles from "./EditProduct.module.css";


const EditProduct = () => {


  const { id } = useParams();

  const navigate = useNavigate();



  const [loading,setLoading] = useState(false);



  const [form,setForm] = useState({

    name:"",
    description:"",
    hsnCode:"",
    price:"",
    discountPercentage:"",
    finalPrice:"",
    stock:"",
    categoryId:""

  });



  const [image,setImage] = useState(null);

  const [preview,setPreview] = useState("");





  useEffect(()=>{

    fetchProduct();

  },[id]);






  const fetchProduct = async()=>{


    try{


      const data = await getProductById(id);


      const product =
      data.product || data;



      setForm({

        name: product.name || "",

        description:
        product.description || "",

        hsnCode:
        product.hsnCode || "",

        price:
        product.price || "",

        discountPercentage:
        product.discountPercentage || "",

        finalPrice:
        product.finalPrice || product.price || "",

        stock:
        product.stock || "",

        categoryId:
        product.categoryId || ""

      });



      setPreview(
        product.image || ""
      );


    }

    catch(error){



      alert(
        "Product Not Found"
      );

    }


  };







  const handleChange=(e)=>{


    const {name,value}=e.target;



    let updated={

      ...form,

      [name]:value

    };





    if(
      name==="price" ||
      name==="discountPercentage"
    ){



      const price =
      name==="price"
      ?
      Number(value)
      :
      Number(form.price);




      const discount =
      name==="discountPercentage"
      ?
      Number(value)
      :
      Number(form.discountPercentage);





      updated.finalPrice =
      price -
      ((price * discount)/100);



    }




    setForm(updated);


  };









  const handleSubmit=async(e)=>{


    e.preventDefault();


    try{


      setLoading(true);



      const data = new FormData();




      Object.keys(form).forEach(key=>{


        data.append(
          key,
          form[key]
        );


      });






      if(image){

        data.append(
          "image",
          image
        );

      }






      await updateProduct(
        id,
        data
      );




      alert(
        "Product Updated Successfully"
      );



      navigate(
        "/admin/products"
      );



    }

    catch(error){


      console.log(
        error.response?.data || error
      );


      alert(
        "Update Failed"
      );


    }

    finally{


      setLoading(false);


    }



  };









  return (


    <div className={styles.container}>


      <h1>
        Edit Product
      </h1>





      <form

        className={styles.form}

        onSubmit={handleSubmit}

      >





        <input

          name="name"

          value={form.name}

          placeholder="Product Name"

          onChange={handleChange}

        />





        <textarea

          name="description"

          value={form.description}

          placeholder="Product Description"

          onChange={handleChange}

        />






        <input

          name="hsnCode"

          value={form.hsnCode}

          placeholder="HSN Code"

          onChange={handleChange}

        />






        <input

          type="number"

          name="price"

          value={form.price}

          placeholder="MRP Price"

          onChange={handleChange}

        />







        <input

          type="number"

          name="discountPercentage"

          value={form.discountPercentage}

          placeholder="Discount %"

          onChange={handleChange}

        />







        <input

          type="number"

          name="finalPrice"

          value={form.finalPrice}

          readOnly

          placeholder="Final Price"

        />







        <input

          type="number"

          name="stock"

          value={form.stock}

          placeholder="Stock"

          onChange={handleChange}

        />







        <input

          type="number"

          name="categoryId"

          value={form.categoryId}

          readOnly

        />








        <input

          type="file"

          accept="image/*"

          onChange={(e)=>{


            const file =
            e.target.files[0];


            if(!file) return;



            setImage(file);



            setPreview(
              URL.createObjectURL(file)
            );


          }}

        />






        {
          preview && (

          <div className={styles.preview}>

            <img

              src={preview}

              alt="Preview"

            />

          </div>

          )

        }







        <button disabled={loading}>


          {
            loading
            ?
            "Updating..."
            :
            "Update Product"
          }


        </button>






      </form>


    </div>


  );


};


export default EditProduct;