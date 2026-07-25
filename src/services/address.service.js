import api from "../api/axios";

// ======================
// Get All Addresses
// ======================

export const getAddresses = async () => {
  const res = await api.get("/address");
  return res.data.data;
};

// ======================
// Get Single Address
// ======================

export const getAddressById = async (id) => {
  const res = await api.get(`/address/${id}`);
  return res.data.data;
};

// ======================
// Add Address
// ======================

export const createAddress = async (data) => {
  const res = await api.post("/address", data);
  return res.data;
};

// ======================
// Update Address
// ======================

export const updateAddress = async (id, data) => {
  const res = await api.patch(`/address/${id}`, data);
  return res.data;
};

// ======================
// Delete Address
// ======================

export const deleteAddress = async (id) => {
  const res = await api.delete(`/address/${id}`);
  return res.data;
};