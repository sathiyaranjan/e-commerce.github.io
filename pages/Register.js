import React, { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      console.log("Form Data:", form);
      alert("Registration Successful!");
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <input
            type="text"
            name="phone"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.confirmPassword && (
            <p style={styles.error}>{errors.confirmPassword}</p>
          )}

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        {submitted && <p style={styles.success}>Registered Successfully!</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
  minHeight: "100vh",
  backgroundImage:
    "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1350&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
},
card: {
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  maxWidth: "400px",
  width: "100%",
  color: "#fff", // Optional: If text should be light on dark background
},

  form: {
  
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
    maxWidth: "400px",
    width: "70%",
    color: "#fff",
  },
  input: {
    width: "90%",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    display: "block", // ensure it behaves like a block-level element
    background: "rgba(255, 255, 255, 0.2)", // optional: glassy effect
    color: "#fff", // optional if on dark bg
  },
    button: {
      padding: "12px",
      marginTop: "15px",
      background: "#0070f3",
      color: "white",
      border: "none",
      borderRadius: "6px",
      fontSize: "16px",
      cursor: "pointer",
    },
    error: {
      color: "red",
      fontSize: "14px",
      margin: "0 0 10px 0",
      textAlign: "left",
    },
    success: {
      color: "green",
      marginTop: "15px",
      textAlign: "center",
    },
  };

  export default Register;
