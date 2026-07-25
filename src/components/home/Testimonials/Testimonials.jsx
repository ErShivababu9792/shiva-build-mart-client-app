import styles from "./Testimonials.module.css";

import Container from "../../ui/Container/Container";

import SectionTitle from "../../ui/SectionTitle/SectionTitle";


const reviews = [

{
name:"Rahul Sharma",
image:"https://i.pravatar.cc/150?img=12",
review:"Best quality plywood and excellent service. Highly recommended.",
rating:5
},


{
name:"Amit Kumar",
image:"https://i.pravatar.cc/150?img=13",
review:"Delivery was fast and products were genuine.",
rating:5
},


{
name:"Priya Singh",
image:"https://i.pravatar.cc/150?img=47",
review:"Great experience with Shiva Build Mart team.",
rating:5
}

];



const Testimonials =()=>{


return (

<section className={styles.section}>


<Container>


<SectionTitle

subtitle="Testimonials"

title="What Our Customers Say"

/>



<div className={styles.grid}>


{

reviews.map((item,index)=>(


<div 
className={styles.card}
key={index}
>


<img

src={item.image}

alt={item.name}

/>



<h3>
{item.name}
</h3>



<div className={styles.rating}>

{"⭐".repeat(item.rating)}

</div>



<p>
{item.review}
</p>



</div>


))

}



</div>


</Container>


</section>

);


};


export default Testimonials;