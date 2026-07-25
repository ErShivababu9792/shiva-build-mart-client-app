import api from "../api/axios";


// =======================
// Get All Products
// =======================

export const getProducts = async () => {

  const res = await api.get("/product");

  console.log("PRODUCT API:", res.data);

  return res.data.data.products;

};





// =======================
// Get Single Product
// =======================

export const getProductById = async(id)=>{

  const res = await api.get(
    `/product/${id}`
  );

  return res.data.data;

};





// =======================
// Create Product
// =======================

export const createProduct = async (formData) => {


  const res = await api.post(

    "/product",

    formData,

    {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    }

  );


  return res.data;

};





// =======================
// Update Product
// =======================

export const updateProduct = async (id, formData) => {

  const res = await api.put(

    `/product/${id}`,

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }

  );

  return res.data;

};





// =======================
// Delete Product
// =======================

export const deleteProduct = async(id)=>{


  const res = await api.delete(

    `/product/${id}`

  );


  return res.data;

};