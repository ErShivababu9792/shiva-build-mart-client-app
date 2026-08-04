import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import styles from "./AdminRegister.module.css";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    loginType: "ADMIN",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const adminRegistered = localStorage.getItem("admin_registered");
    if (adminRegistered === "true") {
      setDisabled(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;

    if (!form.name.trim()) {
      return setError("Name is required.");
    }
    if (!form.email.trim()) {
      return setError("Email is required.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return setError("Enter a valid email.");
    }
    if (!/^[0-9]{10}$/.test(form.phone)) {
      return setError("Phone must be 10 digits.");
    }
    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);
      await api.post("/auth/register-admin", {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone,
        password: form.password,
      });
      localStorage.setItem("admin_registered", "true");
      alert("Admin registered successfully. Please login.");
      navigate("/admin-login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.logo}>🏢</div>
        <h1>Admin Register</h1>
        <p className={styles.subtitle}>Create the first admin account.</p>

        {disabled ? (
          <div className={styles.disabledMessage}>
            Admin registration is closed. Use the admin login page instead.
          </div>
        ) : (
          <>
            {error && <div className={styles.error}>{error}</div>}
            <input
              name="name"
              placeholder="Admin Name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
            <input
              name="email"
              placeholder="Admin Email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
            <div className={styles.passwordBox}>
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div className={styles.passwordBox}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "Registering..." : "Create Admin"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default AdminRegister;
