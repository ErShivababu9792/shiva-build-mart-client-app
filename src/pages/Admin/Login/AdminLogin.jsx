import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import styles from "./AdminLogin.module.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    loginType: "ADMIN",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showAdminRegister, setShowAdminRegister] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const adminRegistered = localStorage.getItem("admin_registered");
    if (adminRegistered === "true") setShowAdminRegister(false);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await login({
        email: form.email.trim(),
        password: form.password,
        loginType: "ADMIN",
      });

      localStorage.setItem(
        "adminSession",
        JSON.stringify({ loginTime: Date.now() })
      );

      alert("Admin Login Successful");
      navigate("/admin");
    } catch (error) {

      alert(error.response?.data?.message || "Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.logo}>🏢</div>
        <h1>Admin Portal</h1>
        <p className={styles.subtitle}>Secure access for administration</p>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className={styles.passwordBox}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <span onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        <div className={styles.options}>
          <label>
            <input type="checkbox" /> Remember me
          </label>

          <button
            type="button"
            className={styles.linkBtn}
            onClick={() => navigate("/admin-forgot-password")}
          >
            Forgot Password?
          </button>
        </div>

        <button disabled={loading}>{loading ? "Checking..." : "Login"}</button>

        <div className={styles.backHome}>
          <button type="button" onClick={() => navigate("/")}>← Back to Website</button>
        </div>

        {showAdminRegister ? (
          <div className={styles.register}>
            <span>Don't have admin account?</span>
            <button type="button" onClick={() => navigate("/admin-register")}>
              Register
            </button>
          </div>
        ) : (
          <div className={styles.disabledNotice}>
            Admin registration is closed. Please login with an existing admin account.
          </div>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;
