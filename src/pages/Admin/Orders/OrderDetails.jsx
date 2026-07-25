import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../../api/axios";

import styles from "./OrderDetails.module.css";


const OrderDetails = () => {


  const { id } = useParams();


  const [order,setOrder] = useState(null);

  const [loading,setLoading] = useState(true);





  const fetchOrder = async()=>{


    try{


      const res = await api.get(
        `/order/admin/${id}`
      );


      setOrder(
        res.data.data
      );


    }

    catch(error){

      console.log(error);

    }

    finally{

      setLoading(false);

    }


  };





  useEffect(()=>{

    fetchOrder();

  },[]);






  if(loading){

    return <h2>Loading Order...</h2>;

  }





  if(!order){

    return <h2>
      Order Not Found
    </h2>;

  }





  return (

    <div className={styles.container}>


      <h1>
        Order Details #{order.id}
      </h1>




      <div className={styles.card}>


        <h2>
          Customer Details
        </h2>


        <p>
          Name:
          {" "}
          {order.user?.name}
        </p>


        <p>
          Email:
          {" "}
          {order.user?.email}
        </p>



      </div>







      <div className={styles.card}>


        <h2>
          Delivery Address
        </h2>


        <p>
          {order.address?.address}
        </p>


        <p>
          {order.address?.city}
        </p>


      </div>







      <div className={styles.card}>


        <h2>
          Products
        </h2>



        {

        order.items?.map((item)=>(


          <div 
          key={item.id}
          className={styles.product}
          >


            <img
            src={item.product?.image}
            />


            <div>

            <h3>
              {item.product?.name}
            </h3>


            <p>
              Quantity:
              {" "}
              {item.quantity}
            </p>


            <p>
              Price:
              ₹{item.price}
            </p>


            </div>



          </div>


        ))

        }




      </div>







      <div className={styles.card}>


        <h2>
          Payment
        </h2>


        <p>
          Status:
          {" "}
          {order.payment?.status}
        </p>


        <h2>
          Total:
          {" "}
          ₹{order.totalAmount}
        </h2>


      </div>



    </div>

  );

};


export default OrderDetails;