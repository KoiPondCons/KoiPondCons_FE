import React, { useState } from "react";
import "./index.css";
import { FaRegUser } from "react-icons/fa";
import { Dropdown, message } from "antd";
import { Link } from "react-router-dom";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const handleButtonClick = (e) => {
    message.info("Click on left button.");
    console.log("click left button", e);
  };
  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };
  const items = [
    {
      label: "Hồ sơ cá nhân",
      onClick: () => {
        window.location.href = "/profile";
      },
      key: "1",
    },
    {
      label: "Lịch sử",
      onClick: () => {
        window.location.href = "/history";
      },
      key: "2",
    },
    {
      label: "Khuyến mãi tích điểm",
      onClick: () => {
        window.location.href = "/promotion";
      },
      key: "3",
    },
    {
      label: "Đăng xuất",
      onClick: handleLogout,
      key: "4",
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
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
          {" "}
          {isLoggedIn ? (
            <>
              <Dropdown.Button
                menu={menuProps}
                placement="bottom"
                icon={<FaRegUser />}
              />
            </>
          ) : (
            <>
              <Link to="/register" className="auth-button">
                Đăng ký
              </Link>
              <Link
                to="/login"
                className="auth-button"
                style={{ paddingLeft: "0px" }}
              >
                Đăng nhập
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
