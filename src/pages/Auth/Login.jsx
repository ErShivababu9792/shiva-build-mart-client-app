import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import styles from "./Auth.module.css";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation

    if (!form.email.trim()) {
      return alert("Please enter your email.");
    }

    if (!form.password.trim()) {
      return alert("Please enter your password.");
    }

    try {
      setLoading(true);

      await login({
        email: form.email.trim(),
        password: form.password,
        loginType: "CUSTOMER",
      });

      alert("Login Successful");

      navigate("/");
    } catch (error) {


      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <h2>Customer Login</h2>

        <p className={styles.subtitle}>
          Welcome back! Login to continue shopping.
        </p>

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />

        {/* PASSWORD */}

        <div className={styles.passwordBox}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        {/* OPTIONS */}

        <div className={styles.options}>
          <label>
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
            />

            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className={styles.forgot}
          >
            Forgot Password?
          </Link>
        </div>

        {/* LOGIN */}

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* REGISTER */}

        <p className={styles.switch}>
          New user?

          <Link to="/register">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;