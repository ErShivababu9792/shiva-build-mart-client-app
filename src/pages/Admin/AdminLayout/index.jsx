import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

import styles from "./AdminLayout.module.css";


const AdminLayout = () => {


const navigate = useNavigate();



const { user: admin } = useAuth();



/*
=========================
ADMIN AUTO LOGOUT
30 MIN SESSION
=========================
*/


useEffect(()=>{


const token = localStorage.getItem("token");

const session = JSON.parse(
    localStorage.getItem("adminSession")
);



if(!token || !session){

    navigate("/admin-login");

    return;

}



const SESSION_TIME = 30 * 60 * 1000;



const checkSession = ()=>{


const currentTime = Date.now();


const timePassed =
currentTime - session.loginTime;



if(timePassed >= SESSION_TIME){



localStorage.removeItem("token");

localStorage.removeItem("user");

localStorage.removeItem("adminSession");



alert(
"Admin session expired. Please login again"
);



navigate("/admin-login");



}



};




checkSession();



const interval = setInterval(

checkSession,

60000

);



return ()=>clearInterval(interval);



},[navigate]);









const handleLogout = ()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");

localStorage.removeItem("adminSession");



navigate("/admin-login");


};








const menu = [


{
name:"Dashboard",
path:"/admin",
icon:"⌂",
end:true
},


{
name:"Products",
path:"/admin/products",
icon:"📦"
},


{
name:"Add Product",
path:"/admin/products/add",
icon:"+"
},


{
name:"Categories",
path:"/admin/categories",
icon:"🗂"
},


{
name:"Orders",
path:"/admin/orders",
icon:"🛒"
},


{
name:"Coupons",
icon:"🎟",
soon:true
},


{
name:"Customers",
icon:"👥",
soon:true
},


{
name:"Reviews",
icon:"⭐",
soon:true
},


{
name:"Payments",
icon:"💳",
soon:true
}


];








return (

<div className={styles.layout}>


<aside className={styles.sidebar}>



{/* BRAND */}

<div className={styles.brand}>


<h2>

Shiva

<span>

Build Mart

</span>

</h2>


<p>

Admin Panel

</p>


</div>









{/* PROFILE */}


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


<h4>

{admin.name || "Admin"}

</h4>


<p>

Administrator

</p>


</div>


</div>









{/* MENU */}


<nav className={styles.menu}>


{

menu.map((item)=>(


item.soon ?


<div

key={item.name}

className={styles.disabled}

>


<span>

{item.icon}

</span>


{item.name}


<small>

Soon

</small>


</div>



:


<NavLink

key={item.name}

to={item.path}

end={item.end}

className={({isActive})=>

isActive

?

styles.active

:

""

}


>


<span>

{item.icon}

</span>


{item.name}


</NavLink>



))


}



</nav>









{/* LOGOUT */}


<div className={styles.logoutBox}>


<button

className={styles.logout}

onClick={handleLogout}

>


<span>

🚪

</span>


Logout


</button>


</div>






</aside>









<main className={styles.content}>


<Outlet />


</main>






</div>


);


};


export default AdminLayout;