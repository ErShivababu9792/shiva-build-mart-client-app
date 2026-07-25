import api from "../api/axios";


// Create Razorpay Order

export const createPaymentOrder = async (orderId) => {
  const res = await api.post(
    "/payment/create",
    {
      orderId,
    }
  );

  return res.data;
};



// Verify Razorpay Payment

export const verifyPayment = async (data) => {
  const res = await api.post(
    "/payment/verify",
    data
  );

  return res.data;
};