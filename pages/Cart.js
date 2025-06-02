// src/pages/Cart.js
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p style={styles.emptyText}>Your cart is empty.</p>
      ) : (
        <>
          <div style={styles.itemList}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.item}>
                <img
                  src={process.env.PUBLIC_URL + item.image}
                  alt={item.name}
                  style={styles.image}
                />
                <div style={styles.details}>
                  <h4 style={styles.itemName}>{item.name}</h4>
                  <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
                  <p style={styles.quantity}>Qty: {item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={styles.removeButton}
                  >
                    ✖ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 style={styles.total}>Total: ${total.toFixed(2)}</h3>

          <Link to="/checkout">
            <button style={styles.checkoutButton}>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Segoe UI', sans-serif",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  emptyText: {
    fontSize: "18px",
    color: "#666",
  },
  itemList: {
    marginBottom: "30px",
  },
  item: {
    display: "flex",
    gap: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemName: {
    margin: "0 0 5px 0",
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: "16px",
    margin: "2px 0",
    color: "#333",
  },
  quantity: {
    fontSize: "14px",
    color: "#555",
  },
  removeButton: {
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    alignSelf: "flex-start",
  },
  total: {
    fontSize: "22px",
    fontWeight: "bold",
    marginTop: "20px",
  },
  checkoutButton: {
    padding: "12px 24px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default Cart;
