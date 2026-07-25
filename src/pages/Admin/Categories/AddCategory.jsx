import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createCategory
} from "../../../services/category.service";

import styles from "./AddCategory.module.css";


const AddCategory =()=>{


  const navigate = useNavigate();


  const [name,setName] = useState("");

  const [image,setImage] = useState(null);

  const [loading,setLoading] = useState(false);





  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{

      setLoading(true);



      const formData = new FormData();


      formData.append(
        "name",
        name
      );


      if(image){

        formData.append(
          "image",
          image
        );

      }





      await createCategory(formData);



      alert(
        "Category Added Successfully"
      );


      navigate(
        "/admin/categories"
      );



    }
    catch(error){

      console.log(
        "CATEGORY ADD ERROR:",
        error
      );


      alert(
        "Category Add Failed"
      );

    }
    finally{

      setLoading(false);

    }


  };






  return(

    <div className={styles.container}>


      <h1>
        Add Category
      </h1>




      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >



        <label>
          Category Name
        </label>


        <input

          type="text"

          placeholder="Enter Category Name"

          value={name}

          onChange={(e)=>setName(e.target.value)}

          required

        />





        <label>
          Category Image
        </label>


        <input

          type="file"

          accept="image/*"

          onChange={(e)=>
            setImage(
              e.target.files[0]
            )
          }

        />





        <button disabled={loading}>


          {
            loading
            ?
            "Adding..."
            :
            "Add Category"
          }


        </button>




      </form>


    </div>

  );


};


export default AddCategory;