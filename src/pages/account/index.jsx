import { useNavigate } from "react-router-dom";
import {
  User,
  Package,
  MapPin,
  Heart,
  ShoppingCart,
  LogOut
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import styles from "./Account.module.css";


const Account = () => {


  const { user, logout } = useAuth();

  const navigate = useNavigate();



  if(!user){

    return (

      <div className={styles.loading}>
        Please Login
      </div>

    );

  }




  return (

    <div className={styles.container}>


      <h1>
        My Account
      </h1>



      {/* PROFILE CARD */}


      <div className={styles.profileCard}>


        <div className={styles.profileIcon}>

          <User size={35}/>

        </div>



        <div>

          <h2>
            {user.name}
          </h2>


          <p>
            {user.email}
          </p>


          <p>
            {user.phone || "Phone not added"}
          </p>


          <span>
            {user.role}
          </span>


        </div>


      </div>






      {/* OPTIONS */}


      <div className={styles.options}>


        <div
        onClick={()=>navigate("/orders")}
        className={styles.option}
        >

          <Package/>

          <div>
            <h3>
              My Orders
            </h3>

            <p>
              View your orders
            </p>
          </div>

        </div>






        <div
        onClick={()=>navigate("/address")}
        className={styles.option}
        >

          <MapPin/>

          <div>
            <h3>
              My Address
            </h3>

            <p>
              Manage delivery address
            </p>
          </div>


        </div>







        <div
        onClick={()=>navigate("/wishlist")}
        className={styles.option}
        >

          <Heart/>

          <div>

            <h3>
              Wishlist
            </h3>

            <p>
              Saved products
            </p>

          </div>


        </div>







        <div
        onClick={()=>navigate("/cart")}
        className={styles.option}
        >

          <ShoppingCart/>


          <div>

            <h3>
              My Cart
            </h3>

            <p>
              Check cart items
            </p>


          </div>


        </div>



      </div>







      <button

      className={styles.logout}

      onClick={()=>{

        logout();

        navigate("/login");

      }}

      >

        <LogOut size={18}/>

        Logout


      </button>






    </div>

  );

};


export default Account;