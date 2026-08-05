import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./OrderDetails.module.css";

import { getOrderById } from "../../services/order.service";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(id);



      setOrder(data);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Loading Order...</div>;
  }

  if (!order) {
    return <div className={styles.loading}>Order Not Found</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Order Details</h1>

      <div className={styles.card}>
        <h3>Order ID : #{order.id}</h3>

        <p>Status : {order.status}</p>

        <p>Payment Status : {order.paymentStatus}</p>

        <p>Payment Method : {order.paymentMethod || "Online"}</p>

        <h2>Total : ₹{order.totalAmount}</h2>
      </div>

      {/* PRODUCTS */}

      <div className={styles.card}>
        <h3>Products</h3>

        {order.items?.map((item) => (
          <div key={item.id} className={styles.product}>
            <img
              src={item.product?.image || "/images/no-product.png"}
              alt={item.product?.name}
            />

            <div>
              <h4>{item.product?.name}</h4>

              <p>Quantity : {item.quantity}</p>

              <p>Price : ₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ADDRESS */}

      <div className={styles.card}>
        <h3>Delivery Address</h3>

        {order.address ? (
          <>
            <p>{order.address.name}</p>

            <p>{order.address.phone}</p>

            <p>
              {order.address.house},{order.address.city},{order.address.state}
            </p>

            <p>Pincode : {order.address.pincode}</p>
          </>
        ) : (
          <p>Address not available</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
