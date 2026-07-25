import { NavLink, useNavigate } from "react-router-dom";

import styles from "./AdminSidebar.module.css";


const AdminSidebar = () => {


const navigate = useNavigate();



const admin =
JSON.parse(localStorage.getItem("user")) || {};




const handleLogout = () => {


localStorage.removeItem("token");

localStorage.removeItem("user");


navigate("/admin-login");


};





const menuItems = [

{
title:"Dashboard",
path:"/admin",
icon:"⌂",
end:true
},


{
title:"Products",
path:"/admin/products",
icon:"📦"
},



{
title:"Add Product",
path:"/admin/products/add",
icon:"+"
},



{
title:"Categories",
path:"/admin/categories",
icon:"🗂"
},



{
title:"Orders",
path:"/admin/orders",
icon:"🛒"
},



{
title:"Coupons",
path:"/admin/coupons",
icon:"🎟",
disabled:true
},



{
title:"Customers",
path:"/admin/customers",
icon:"👥",
disabled:true
},



{
title:"Reviews",
path:"/admin/reviews",
icon:"⭐",
disabled:true
},



{
title:"Payments",
path:"/admin/payments",
icon:"💳",
disabled:true
}


];







return (


<aside className={styles.sidebar}>



<div className={styles.brand}>


<h2>
Shiva Build Mart
</h2>


<span>
Admin Panel
</span>


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

<h4>
{
admin.name || "Admin"
}
</h4>


<p>
Administrator
</p>


</div>


</div>








<nav className={styles.menu}>


{

menuItems.map((item)=>(


item.disabled ?


<div

key={item.title}

className={styles.disabled}

>

<span>
{item.icon}
</span>

{item.title}

<small>
Soon
</small>


</div>


:


<NavLink

key={item.title}

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


{item.title}


</NavLink>



))


}


</nav>









<button

className={styles.logout}

onClick={handleLogout}

>

Logout

</button>





</aside>


);


};


export default AdminSidebar;