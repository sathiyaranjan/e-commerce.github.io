// src/pages/Admin.js
import React, { useState } from "react";
import productsData from "../data/products.json";
import "./Admin.css";

function Admin() {
  const [products, setProducts] = useState(productsData);
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      name: form.name.trim(),
      price: parseFloat(form.price),
      image: form.image.trim(),
    };
    if (!newProduct.name || isNaN(newProduct.price) || !newProduct.image) {
      alert("Please fill all fields correctly.");
      return;
    }
    setProducts((prev) => [...prev, newProduct]);
    setForm({ name: "", price: "", image: "" });
    alert("✅ Product added (note: not saved permanently)");
  };

  return (
    <div className="admin-form-container">
      <h2>🛠 Admin Dashboard</h2>

      <form onSubmit={handleAddProduct}>
        <label htmlFor="name">Product Name</label>
        <input
          type="text"
          name="name"
          placeholder="e.g. Wireless Mouse"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="price">Price ($)</label>
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="e.g. 29.99"
          value={form.price}
          onChange={handleChange}
          required
        />

        <label htmlFor="image">Image URL / Path</label>
        <input
          type="text"
          name="image"
          placeholder="/images/mouse.png"
          value={form.image}
          onChange={handleChange}
          required
        />

        <button type="submit">➕ Add Product</button>
      </form>

      <h3 style={{ marginTop: "40px" }}>📦 Current Products</h3>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              onError={(e) => (e.target.style.display = "none")}
            />
            <h4>{product.name}</h4>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
