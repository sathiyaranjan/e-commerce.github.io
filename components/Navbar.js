// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo">
          <Link to="/">⚡ SparkGadgets</Link>
        </h2>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
          {/* <li><Link to="/register" onClick={closeMenu}>Register</Link></li> */}
          <li><Link to="/cart" onClick={closeMenu}>Cart</Link></li>
          <li>
            <Link to="/admin" onClick={closeMenu}>
              {/* <button className="admin-add-btn">Admin</button> */}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
