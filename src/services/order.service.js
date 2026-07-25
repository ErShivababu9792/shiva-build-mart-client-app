import api from "../api/axios";

// =========================
// CREATE ORDER
// =========================
export const createOrder = async (data) => {
  const res = await api.post("/order/create", data);
  return res.data;
};

// =========================
// GET MY ORDERS
// =========================
export const getMyOrders = async () => {
  const res = await api.get("/order/my-orders");
  return res.data;
};

// =========================
// GET SINGLE ORDER
// =========================
export const getOrderById = async (id) => {
  const res = await api.get(`/order/${id}`);
  return res.data.data;
};