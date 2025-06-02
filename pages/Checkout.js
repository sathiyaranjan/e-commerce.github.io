// src/pages/Checkout.js
import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cartItems } = useContext(CartContext);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    // Optional: Clear cart or send to backend
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity} = ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <h4>Total: ${total.toFixed(2)}</h4>

          <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              required
              value={formData.address}
              onChange={handleChange}
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <br />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <br />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                marginTop: "10px",
              }}
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;
