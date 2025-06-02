import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import productsData from "../data/products.json";
import "./Home.css";
import bannerImages from "../config/bannerImages";


function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentBanner, setCurrentBanner] = useState(0);
  const bannerIntervalRef = useRef(null);
  const { addToCart } = useContext(CartContext);

  const bannerImages = [
    "./images/banner.jpg",
    "./images/banner2.jpg",
    "./images/banner3.jpg",
  ];

  const categories = ["All", ...new Set(productsData.map((p) => p.category))];

  useEffect(() => {
    setProducts(productsData);
    setFiltered(productsData);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll(".product-card");
    cards.forEach((card) => observer.observe(card));

    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (category !== "All") {
      temp = temp.filter((p) => p.category === category);
    }

    if (searchTerm.trim()) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFiltered(temp);
  }, [searchTerm, category, sortOrder, products]);

      // eslint-disable-next-line react-hooks/exhaustive-deps
   useEffect(() => {
  bannerIntervalRef.current = setInterval(() => {
    setCurrentBanner((prev) => (prev + 1) % bannerImages.length);
  }, 5000);

  return () => clearInterval(bannerIntervalRef.current);
}, [bannerImages.length]);


  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("✅ Product added to cart!", {
      style: {
        borderRadius: "8px",
        background: "#22c55e",
        color: "#fff",
      },
      iconTheme: {
        primary: "#fff",
        secondary: "#22c55e",
      },
    });
  };

  return (
    <div className="home-container">
      <Toaster position="top-center" />

      {/* 🖼 Interactive Banner Section */}
      <section className="banner-container">
        <img
          src={bannerImages[currentBanner]}
          alt="Featured Deal"
          className="banner-image fade-banner"
        />
        <div className="banner-controls">
          {bannerImages.map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentBanner ? "active" : ""}`}
              onClick={() => setCurrentBanner(idx)}
            />
          ))}
        </div>
      </section>

      {/* 🔥 Store Title */}
      <header className="store-title">
        <h1>🔥 SparkGadgets Mega Deals</h1>
        <p className="subtitle">Top tech picks, just for you!</p>
      </header>

      {/* 🔎 Filters Section */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* 🛍 Product Grid */}
      <section className="product-grid">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <div className="product-card" key={product.id}>
              <Link to={`/product/${product.id}`} className="product-link">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/fallback.png";
                  }}
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toFixed(2)}</p>
                </div>
              </Link>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "40px", color: "#64748b" }}>
            No products found 💔
          </p>
        )}
      </section>
    </div>
  );
}

export default Home;
