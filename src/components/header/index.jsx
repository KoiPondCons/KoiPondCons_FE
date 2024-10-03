import React, { useState } from "react";
import "./index.css";
import { FaRegUser } from "react-icons/fa";
import {Dropdown, message } from 'antd';


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
    message.info('Click on left button.');
    console.log('click left button', e);
  };
  const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
  };
  const items = [
    {
      label: 'Hồ sơ cá nhân',
      onClick: () => {
        window.location.href = "/profile";
      },
      key: '1',
    },
    {
      label: 'Lịch sử',
      onClick: () => {
        window.location.href = "/history";
      },
      key: '2',
    },
    {
      label: 'Khuyến mãi tích điểm',
      onClick: () => {
        window.location.href = "/promotion";
      },
      key: '3',
    },
    {
      label: 'Đăng xuất',
      onClick: handleLogout,
      key: '4',
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
        <div className="navbar-auth"> { isLoggedIn ? 
        (
          <>
          <Dropdown.Button menu={menuProps} placement="bottom" icon={<FaRegUser />} />

          </>
        ) :
        (
          <>
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
         </>
        )
           
        }
        </div>
      </div>
    </nav>
  );
}

export default Header;
