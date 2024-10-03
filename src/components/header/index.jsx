import React from "react";
import "./index.css";
import { Link } from "react-router-dom";


function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li>
            <Link to="/">TRANG CHỦ</Link>
          </li>
          <li>
            <Link to="/about">GIỚI THIỆU</Link>
          </li>
          <li>
            <Link to="/projects">DỰ ÁN</Link>
          </li>
          <li>
            <Link to="/services">DỊCH VỤ</Link>
          </li>
          <li>
            <Link to="/pricing">BÁO GIÁ</Link>
          </li>
          <li>
            <Link to="/blog">BLOG</Link>
          </li>
          <li>
            <Link to="/contact">LIÊN HỆ</Link>
          </li>
        </ul>
        <div className="navbar-auth">
          <Link to="/register" className="auth-button">Đăng ký</Link>
          <Link to="/login" className="auth-button" style={{ paddingLeft: "0px" }}>Đăng nhập</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
