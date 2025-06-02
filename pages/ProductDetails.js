import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import productsData from "../data/products.json";
import { CartContext } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import "./ProductDetails.css"; // Add this line for your custom styles

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);

  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) return <h2 className="text-center">Product not found</h2>;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Your product is successfully added to the cart!", {
      style: {
        borderRadius: '8px',
        background: '#22c55e',
        color: '#fff',
      },
      iconTheme: {
        primary: '#fff',
        secondary: '#22c55e',
      },
    });
  };

  return (
    <div className="product-details-container">
      <Toaster position="top-center" reverseOrder={false} />

      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-title">{product.name}</h2>
      <p className="product-price">Price: ${product.price.toFixed(2)}</p>
      <p className="product-description">
        {product.description || "This is a great product!"}
      </p>
      <button onClick={handleAddToCart} className="add-to-cart-btn">
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;
