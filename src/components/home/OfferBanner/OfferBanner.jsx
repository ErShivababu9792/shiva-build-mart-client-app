import { ArrowRight } from "lucide-react";

import styles from "./OfferBanner.module.css";

import Container from "../../ui/Container/Container";

import Button from "../../ui/Button/Button";


const OfferBanner = () => {


return (

<section className={styles.offer}>


<Container>


<div className={styles.content}>


<div>

<p className={styles.small}>
Special Offer
</p>


<h2>
Build Your Dream Home
With Premium Materials
</h2>


<p>
Get amazing discounts on plywood,
hardware and construction products.
</p>


</div>



<Button>

Shop Now

<ArrowRight size={18}/>

</Button>


</div>


</Container>


</section>

);


};


export default OfferBanner;