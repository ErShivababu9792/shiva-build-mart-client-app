import { useEffect, useState } from "react";
import { MapPin, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  createPaymentOrder,
  verifyPayment,
} from "../../services/payment.service";

import { createOrder } from "../../services/order.service";

import Addresses from "../Profile/Addresses";

import styles from "./Checkout.module.css";

import { getCart } from "../../services/cart.service";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);

  const [loading, setLoading] = useState(false);

  const [cartLoading, setCartLoading] = useState(true);

  // =====================
  // Fetch Cart
  // =====================

  const fetchCart = async () => {
    try {
      setCartLoading(true);

      const data = await getCart();



      setCartItems(Array.isArray(data) ? data : []);
    } catch (error) {


      setCartItems([]);
    } finally {
      setCartLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // =====================
  // Price
  // =====================

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.product.price) * Number(item.quantity),

    0,
  );

  const deliveryCharge = subtotal > 0 ? 50 : 0;

  const total = subtotal + deliveryCharge;

  // =====================
  // Place Order
  // =====================

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty");

      return;
    }

    if (total <= 0) {
      alert("Invalid cart amount");

      return;
    }

    if (!selectedAddress) {
      alert("Please select delivery address");

      return;
    }

    try {
      setLoading(true);

      // CREATE ORDER

      const orderResponse = await createOrder({
        addressId: selectedAddress.id,

        couponCode: null,
      });



      const order = orderResponse.data;

      if (!order?.id) {
        throw new Error("Order ID missing");
      }

      // CREATE RAZORPAY ORDER

      const paymentResponse = await createPaymentOrder(order.id);



      const razorpayOrder = paymentResponse.data.razorpayOrder;



      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency: "INR",

        name: "Shiva Build Mart",

        description: "Furniture Material Purchase",

        order_id: razorpayOrder.id,

        handler: async (response) => {
          try {


            const verify = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,
            });



            alert("Payment Successful Order Placed");

            navigate("/orders");
          } catch (error) {


            alert("Payment verification failed");
          }
        },

        prefill: {
          name: selectedAddress.name,

          contact: selectedAddress.phone,
        },

        theme: {
          color: "#000000",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {


      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Checkout</h1>

      <div className={styles.checkoutGrid}>
        <div className={styles.box}>
          <div className={styles.title}>
            <MapPin size={22} />

            <h2>Delivery Address</h2>
          </div>

          <Addresses
            onSelectAddress={(address) => {
              setSelectedAddress(address);
            }}
          />
        </div>

        <div className={styles.box}>
          <div className={styles.title}>
            <ShoppingBag size={22} />

            <h2>Order Summary</h2>
          </div>

          {cartLoading ? (
            <p>Loading cart...</p>
          ) : cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className={styles.product} key={item.id}>
                <img src={item.product.image} alt={item.product.name} />

                <div>
                  <h4>{item.product.name}</h4>

                  <p>Qty: {item.quantity}</p>

                  <p>₹{item.product.price * item.quantity}</p>
                </div>
              </div>
            ))
          )}

          <div className={styles.priceBox}>
            <p>
              Subtotal
              <span>₹{subtotal}</span>
            </p>

            <p>
              Delivery
              <span>₹{deliveryCharge}</span>
            </p>

            <hr />

            <h3>
              Total
              <span>₹{total}</span>
            </h3>
          </div>

          <button
            className={styles.orderBtn}
            onClick={placeOrder}
            disabled={loading || cartLoading || cartItems.length === 0}
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
