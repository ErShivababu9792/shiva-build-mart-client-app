import {
  ShieldCheck,
  Truck,
  Award,
  Headphones
} from "lucide-react";


import styles from "./WhyChooseUs.module.css";

import Container from "../../ui/Container/Container";

import SectionTitle from "../../ui/SectionTitle/SectionTitle";



const features = [

{
 icon:<ShieldCheck size={40}/>,
 title:"Premium Quality",
 desc:"Only trusted and high quality building materials."
},


{
 icon:<Truck size={40}/>,
 title:"Fast Delivery",
 desc:"Quick and safe delivery at your location."
},


{
 icon:<Award size={40}/>,
 title:"Trusted Service",
 desc:"Years of experience in construction solutions."
},


{
 icon:<Headphones size={40}/>,
 title:"Expert Support",
 desc:"Get help from our experienced team anytime."
}

];



const WhyChooseUs =()=>{


return (

<section className={styles.section}>


<Container>


<SectionTitle

subtitle="Why Choose Us"

title="Why Shiva Build Mart?"

/>



<div className={styles.grid}>


{

features.map((item,index)=>(


<div 
className={styles.card}
key={index}
>


<div className={styles.icon}>

{item.icon}

</div>


<h3>
{item.title}
</h3>


<p>
{item.desc}
</p>


</div>


))

}


</div>


</Container>


</section>

);


};


export default WhyChooseUs;