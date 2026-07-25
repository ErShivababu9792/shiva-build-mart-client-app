import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

import api from "../../../api/axios";


const Dashboard = () => {


  const admin =
    JSON.parse(localStorage.getItem("user")) || {};



  const [stats,setStats] = useState({

    totalProducts:0,

    totalCategories:0,

    totalUsers:0,

    totalOrders:0,

    revenue:0,

    profit:0,

    lowStock:0,

    outOfStock:0,

    pendingPayments:0

  });



  const [loading,setLoading] = useState(true);




  const fetchDashboard = async()=>{


    try{


      const res = await api.get(
        "/dashboard"
      );


      setStats(
        res.data.data
      );


    }
    catch(error){

      console.log(
        "Dashboard Error",
        error
      );

    }
    finally{

      setLoading(false);

    }


  };





  useEffect(()=>{

    fetchDashboard();

  },[]);






  if(loading){

    return (

      <h2>
        Loading Dashboard...
      </h2>

    );

  }





return (

<div className={styles.container}>


{/* Header */}

<div className={styles.header}>


<div>

<p className={styles.small}>
Welcome Back 👋
</p>


<h1>
Hello, {admin.name || "Admin"}
</h1>


<p className={styles.text}>
Manage your complete Shiva Build Mart business.
</p>


</div>



<div className={styles.profile}>


<div className={styles.avatar}>

{
admin.name
?
admin.name.charAt(0).toUpperCase()
:
"A"
}

</div>


<div>

<h3>
{admin.name || "Admin"}
</h3>

<span>
Administrator
</span>

</div>


</div>



</div>







{/* Cards */}

<div className={styles.cards}>


<Card
title="Products"
value={stats.totalProducts}
text="Total Products"
/>



<Card
title="Categories"
value={stats.totalCategories}
text="Product Categories"
/>



<Card
title="Customers"
value={stats.totalUsers}
text="Registered Users"
/>



<Card
title="Orders"
value={stats.totalOrders}
text="Total Orders"
/>



</div>








<div className={styles.section}>


<h2>
Business Analytics
</h2>



<div className={styles.analytics}>


<Box
title="Revenue"
value={`₹${stats.revenue}`}
/>


<Box
title="Expected Profit"
value={`₹${stats.profit}`}
/>


<Box
title="Low Stock"
value={stats.lowStock}
/>


<Box
title="Out Of Stock"
value={stats.outOfStock}
/>


<Box
title="Pending Payments"
value={stats.pendingPayments}
/>


</div>



</div>








<div className={styles.section}>


<h2>
Management Center
</h2>



<div className={styles.management}>


<div>
📦
<br/>
Products
</div>


<div>
🗂️
<br/>
Categories
</div>


<div>
🎟️
<br/>
Coupons
</div>


<div>
👥
<br/>
Customers
</div>


<div>
⭐
<br/>
Reviews
</div>


<div>
💳
<br/>
Payments
</div>


</div>


</div>







</div>

);

};





const Card = ({
title,
value,
text
})=>{


return (

<div className={styles.card}>

<h4>
{title}
</h4>


<h2>
{value}
</h2>


<p>
{text}
</p>

</div>

);

};





const Box = ({
title,
value
})=>{


return (

<div className={styles.box}>

<h3>
{value}
</h3>

<p>
{title}
</p>

</div>

);

};



export default Dashboard;