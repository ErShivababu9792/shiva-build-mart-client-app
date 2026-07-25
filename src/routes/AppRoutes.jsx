import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Customer Pages
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Wishlist from "../pages/Wishlist";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import Addresses from "../pages/Profile/Addresses";
import CustomerOrderDetails from "../pages/orderDetails/index";

// Auth Pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

// Admin
import AdminLayout from "../pages/Admin/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard";

import AdminProducts from "../pages/Admin/Products/AdminProducts";
import AddProduct from "../pages/Admin/Products/AddProduct";
import EditProduct from "../pages/Admin/Products/EditProduct";

import AdminOrders from "../pages/Admin/Orders/AdminOrders";
import AdminOrderDetails from "../pages/Admin/Orders/OrderDetails";

import AdminLogin from "../pages/Admin/Login/AdminLogin";

import AdminCategories from "../pages/Admin/Categories/AdminCategories";
import AddCategory from "../pages/Admin/Categories/AddCategory";

// 404
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* CUSTOMER */}

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/shop" element={<Shop />} />

          <Route path="/product/:id" element={<Product />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/wishlist" element={<Wishlist />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="/orders/:id" element={<CustomerOrderDetails />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* AUTH */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* ADDRESS */}

        <Route path="/profile/addresses" element={<Addresses />} />

        {/* ADMIN LOGIN */}

        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ADMIN PANEL */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="products" element={<AdminProducts />} />

          <Route path="products/add" element={<AddProduct />} />

          <Route path="products/edit/:id" element={<EditProduct />} />

          <Route path="categories" element={<AdminCategories />} />

          <Route path="categories/add" element={<AddCategory />} />

          <Route path="orders" element={<AdminOrders />} />

          <Route path="orders/:id" element={<AdminOrderDetails />} />
        </Route>

        {/* NOT FOUND */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
