import { useState } from "react";

import { createProduct } from "../../../services/product.service";

import styles from "./AddProduct.module.css";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    hsnCode: "",
    purchasePrice: "",
    price: "",
    discountPercentage: "",
    finalPrice: "",
    stock: "",
    categoryId: "",
  });

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const profit = Number(form.finalPrice || 0) - Number(form.purchasePrice || 0);
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = {
      ...form,

      [name]: value,
    };

    // Final Price Calculation

    if (name === "price" || name === "discountPercentage") {
      const price = name === "price" ? Number(value) : Number(form.price);

      const discount =
        name === "discountPercentage"
          ? Number(value)
          : Number(form.discountPercentage);

      const finalPrice = price - (price * discount) / 100;

      updatedData.finalPrice = finalPrice > 0 ? finalPrice : "";
    }

    setForm(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", form.name);

      data.append("description", form.description);

      data.append("hsnCode", form.hsnCode);

      data.append("purchasePrice", form.purchasePrice);

      data.append("price", form.price);

      data.append("discountPercentage", form.discountPercentage);

      data.append("finalPrice", form.finalPrice);

      data.append("stock", form.stock);

      data.append("categoryId", form.categoryId);

      if (image) {
        data.append("image", image);
      }

      const response = await createProduct(data);

      console.log("PRODUCT CREATED:", response);

      alert("Product Added Successfully");

      setForm({
        name: "",
        description: "",
        hsnCode: "",
        purchasePrice: "",
        price: "",
        discountPercentage: "",
        finalPrice: "",
        stock: "",
        categoryId: "",
      });

      setImage(null);
    } catch (error) {
      console.log("ADD PRODUCT ERROR:", error.response?.data || error);

      alert("Product Add Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Add Product</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="name"
          value={form.name}
          placeholder="Product Name"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Product Description"
          onChange={handleChange}
          required
        />

        <input
          name="hsnCode"
          value={form.hsnCode}
          placeholder="HSN Code"
          onChange={handleChange}
        />

        <input
          type="number"
          name="purchasePrice"
          value={form.purchasePrice}
          placeholder="Purchase Price"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          value={form.price}
          placeholder="MRP Price"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="discountPercentage"
          value={form.discountPercentage}
          placeholder="Discount Percentage (%)"
          onChange={handleChange}
        />

        <input
          type="number"
          name="finalPrice"
          value={form.finalPrice}
          placeholder="Final Price"
          readOnly
        />

        <input
          type="number"
          name="stock"
          value={form.stock}
          placeholder="Stock Quantity"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="categoryId"
          value={form.categoryId}
          placeholder="Category ID"
          onChange={handleChange}
          required
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <div className={styles.summaryCard}>
          <h3>Price Summary</h3>

          <div className={styles.summaryRow}>
            <span>Purchase Price</span>
            <strong>₹{form.purchasePrice || 0}</strong>
          </div>

          <div className={styles.summaryRow}>
            <span>MRP</span>
            <strong>₹{form.price || 0}</strong>
          </div>

          <div className={styles.summaryRow}>
            <span>Discount</span>
            <strong>{form.discountPercentage || 0}%</strong>
          </div>

          <div className={styles.summaryRow}>
            <span>Final Price</span>
            <strong>₹{form.finalPrice || 0}</strong>
          </div>

          <div className={styles.summaryRow}>
            <span>Estimated Profit</span>

            <strong
              style={{
                color: profit >= 0 ? "#16a34a" : "#dc2626",
              }}
            >
              ₹{profit}
            </strong>
          </div>
        </div>
        <button disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
