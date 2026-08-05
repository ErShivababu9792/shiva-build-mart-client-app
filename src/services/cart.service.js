import api from "../api/axios";

// Add To Cart

export const addToCart = async (productId) => {
  const res = await api.post("/cart/add", {
    productId,

    quantity: 1,
  });

  return res.data;
};

// Get Cart

export const getCart = async () => {
  const res = await api.get("/cart");



  return res.data.data.items || [];
};

export const removeCartItem = async (productId) => {
  const res = await api.delete(`/cart/remove/${productId}`);

  return res.data;
};

// Update Quantity

// Update Quantity

export const updateCartQuantity = async (productId, quantity) => {
  const res = await api.put("/cart/update", {
    productId,
    quantity,
  });

  return res.data;
};

// Clear Cart

export const clearCart = async()=>{

    const res = await api.delete("/cart/clear");

    return res.data;

};