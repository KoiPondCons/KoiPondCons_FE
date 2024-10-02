import React from "react";
import "./index.css";

function Header() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li>
            <a href="/homepage">TRANG CHỦ</a>
          </li>
          <li>
            <a href="/about">GIỚI THIỆU</a>
          </li>
          <li>
            <a href="/projects">DỰ ÁN</a>
          </li>
          <li>
            <a href="/services">DỊCH VỤ</a>
          </li>
          <li>
            <a href="/pricing">BÁO GIÁ</a>
          </li>
          <li>
            <a href="/blog">BLOG</a>
          </li>
          <li>
            <a href="/contact">LIÊN HỆ</a>
          </li>
        </ul>
        <div className="navbar-auth">
          <a href="register" className="auth-button">
            Đăng ký
          </a>
          <a
            href="login"
            className="auth-button"
            style={{ paddingLeft: "0px" }}
          >
            Đăng nhập
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Header;
