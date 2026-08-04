import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../api/axios";

import styles from "./Auth.module.css";

const Register = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const [form, setForm] = useState({

    name: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: "",

    acceptTerms: false

  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm({

      ...form,

      [name]: type === "checkbox" ? checked : value

    });

    setError("");

  };

  const getPasswordStrength = () => {

    const password = form.password;

    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[a-z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2)
      return { text: "Weak Password", className: styles.weak };

    if (score <= 4)
      return { text: "Medium Password", className: styles.medium };

    return { text: "Strong Password", className: styles.strong };

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.name.trim())
      return setError("Full name is required.");

    if (!form.email.trim())
      return setError("Email is required.");

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email))
      return setError("Enter a valid email.");

    if (!/^[0-9]{10}$/.test(form.phone))
      return setError("Phone must be 10 digits.");

    if (form.password.length < 8)
      return setError("Password must be at least 8 characters.");

    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match.");

    if (!form.acceptTerms)
      return setError("Please accept Terms & Conditions.");

    try {

      setLoading(true);

      await api.post("/auth/register", {

        name: form.name.trim(),

        email: form.email.trim(),

        phone: form.phone,

        password: form.password

      });

      alert("Account Created Successfully");

      navigate("/login");

    }

    catch (error) {

      setError(

        error.response?.data?.message ||

        "Registration Failed"

      );

    }

    finally {

      setLoading(false);

    }

  };

  const strength = getPasswordStrength();

  return (

    <div className={styles.container}>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >

        <h2>Create Account</h2>

        {error && (
          <div className={styles.error}>
            {error}
          </div>
        )}

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          autoComplete="name"
        />

        <input
          name="email"
          placeholder="Email Address"
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
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />

          <span

            className={styles.passwordToggle}

            onClick={() => setShowPassword(!showPassword)}

          >

            {showPassword ? "🙈" : "👁"}

          </span>

        </div>

        {form.password && (

          <div className={`${styles.strength} ${strength.className}`}>

            {strength.text}

          </div>

        )}

        <div className={styles.passwordBox}>

          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <span

            className={styles.passwordToggle}

            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }

          >

            {showConfirmPassword ? "🙈" : "👁"}

          </span>

        </div>

        <label className={styles.checkbox}>

          <input
            type="checkbox"
            name="acceptTerms"
            checked={form.acceptTerms}
            onChange={handleChange}
          />

          <span>

            I agree to the

            <Link to="/terms"> Terms & Conditions </Link>

            and

            <Link to="/privacy"> Privacy Policy</Link>

          </span>

        </label>

        <button disabled={loading}>

          {loading ? "Creating Account..." : "Create Account"}

        </button>

        <p className={styles.switch}>

          Already have an account?

          <Link to="/login">

            Login

          </Link>

        </p>

      </form>

    </div>

  );

};

export default Register;