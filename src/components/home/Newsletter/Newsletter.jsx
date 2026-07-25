import { Send } from "lucide-react";

import styles from "./Newsletter.module.css";

import Container from "../../ui/Container/Container";


const Newsletter = () => {


return (

<section className={styles.section}>


<Container>


<div className={styles.box}>


<div>

<h2>
Stay Updated With Shiva Build Mart
</h2>


<p>
Subscribe for latest products,
offers and building solutions.
</p>


</div>



<form className={styles.form}>


<input

type="email"

placeholder="Enter your email"

/>



<button>

Subscribe

<Send size={18}/>

</button>


</form>


</div>


</Container>


</section>

);


};


export default Newsletter;