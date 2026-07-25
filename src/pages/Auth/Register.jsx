import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api/axios";

import styles from "./Auth.module.css";


const Register = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({

    name: "",
    email: "",
    password: "",
    phone: ""

  });



  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value

    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      await api.post(
        "/auth/register",
        form
      );


      alert("Account Created");


      navigate("/login");


    }


    catch (error) {

      alert(
        error.response?.data?.message ||
        "Register Failed"
      );

    }


  };



  return (

    <div className={styles.container}>


      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >


        <h2>
          Create Account
        </h2>



        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />



        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />



        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />



        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />



        <button>
          Register
        </button>



      </form>


    </div>

  )


}


export default Register;