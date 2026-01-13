import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "calendar", label: "Calendar", icon: "📅" },
    { id: "chatbot", label: "Chatbot", icon: "💬" },
  ];

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-logo-section">
        <div className="logo-container">
          <div className="logo-icon">🌾</div>
          <div className="logo-text">
            <h1 className="logo-title">Krishi Sakhi</h1>
            <p className="logo-subtitle">AI-Powered Farming</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id} className="nav-item-spacing">
            <button
              onClick={() => setActiveMenu(item.id)}
              className={`nav-item ${activeMenu === item.id ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="language-selector">
          <span className="language-icon">🌍</span>
          <select className="language-select">
            <option>English</option>
            <option>हिंदी</option>
            <option>मराठी</option>
          </select>
        </div>
        <p className="footer-info">v1.0 • Smart Farming</p>
      </div>
    </div>
  );
}

export default Sidebar;
