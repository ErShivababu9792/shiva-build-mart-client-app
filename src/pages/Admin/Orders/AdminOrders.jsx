import { useEffect, useState } from "react";
import api from "../../../api/axios";

import styles from "./AdminOrders.module.css";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const statuses = [
    "PENDING",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ];

  const fetchOrders = async () => {
    try {
      const res = await api.get("/order/admin/all");

      setOrders(res.data.data || []);
    } catch (error) {
      console.log(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await api.patch(`/order/admin/${id}/status`, {
        status,
      });

      fetchOrders();
    } catch (error) {
      console.log("STATUS UPDATE ERROR", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading Orders...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Orders</h1>

      <div className={styles.tableBox}>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>

              <th>Customer</th>

              <th>Amount</th>

              <th>Payment</th>

              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5">No Orders Found</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>

                  <td>
                    <div className={styles.customer}>
                      <strong>{order.user?.name || "Guest"}</strong>

                      <span>{order.user?.email}</span>
                    </div>
                  </td>

                  <td className={styles.amount}>₹{order.totalAmount}</td>

                  <td>{order.payment?.status || "PENDING"}</td>

                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => changeStatus(order.id, e.target.value)}
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className={styles.viewBtn}
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
