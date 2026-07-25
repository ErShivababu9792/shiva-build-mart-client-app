import { ArrowRight } from "lucide-react";

import styles from "./CategorySection.module.css";

import Container from "../../ui/Container/Container";


const categories = [

  {
    name:"Plywood",
    image:"https://images.unsplash.com/photo-1530124566582-a618bc2615dc"
  },

  {
    name:"Laminates",
    image:"https://images.unsplash.com/photo-1586023492125-27b2c045efd7"
  },

  {
    name:"Hardware",
    image:"https://images.unsplash.com/photo-1504148455328-c376907d081c"
  },

  {
    name:"Cement",
    image:"https://images.unsplash.com/photo-1511818966892-d7d671e672a2"
  },

  {
    name:"Paint",
    image:"https://images.unsplash.com/photo-1562259949-e8e7689d7828"
  },

  {
    name:"Interior Fittings",
    image:"https://images.unsplash.com/photo-1618221195710-dd6b41faaea6"
  }

];


const CategorySection = () => {


return (

<section className={styles.section}>


<Container>


<div className={styles.heading}>

<p>
Explore Categories
</p>

<h2>
Shop By Category
</h2>


</div>



<div className={styles.grid}>


{
categories.map((item,index)=>(


<div 
className={styles.card}
key={index}
>


<img 
src={item.image}
alt={item.name}
/>


<div className={styles.overlay}>

<h3>
{item.name}
</h3>


<button>

View More

<ArrowRight size={16}/>

</button>


</div>


</div>


))
}



</div>


</Container>


</section>

);


};


export default CategorySection;