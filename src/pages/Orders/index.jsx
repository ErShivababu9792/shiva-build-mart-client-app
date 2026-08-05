import { useEffect, useState } from "react";
import { getMyOrders } from "../../services/order.service";
import styles from "./Orders.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await getMyOrders();



      setOrders(response.data || []);
    } catch (error) {

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className={styles.loader}>Loading Orders...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Orders</h1>

      {orders.length === 0 ? (
        <div className={styles.empty}>No Orders Found</div>
      ) : (
        orders.map((order) => (
          <div className={styles.card} key={order.id}>
            {/* Header */}

            <div className={styles.header}>
              <div>
                <p>Order ID</p>

                <h3>#{order.id}</h3>
              </div>

              <span className={styles.status}>{order.status}</span>
            </div>

            {/* Products */}

            <div className={styles.products}>
              {order.items?.map((item) => (
                <div className={styles.product} key={item.id}>
                  <img
                    src={item.product?.image || "/images/no-product.png"}
                    alt={item.product?.name}
                  />

                  <div>
                    <h4>{item.product?.name}</h4>

                    <p>Quantity : {item.quantity}</p>

                    <p>₹{item.product?.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              <div>
                <small>Payment</small>

                <strong>{order.paymentStatus}</strong>
              </div>

              <div>
                <small>Total Amount</small>

                <strong>₹{order.totalAmount}</strong>
              </div>

              
            </div>
            <Link to={`/orders/${order.id}`} className={styles.viewBtn}>
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
