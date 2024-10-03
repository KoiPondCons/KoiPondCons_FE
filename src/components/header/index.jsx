import React from "react";
import "./index.css";
import { FaRegUser } from "react-icons/fa";
import { Select } from "antd";


function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
          : (
            <>
              <FaRegUser onClick={toggleDropdown} style={{cursor: "pointer"}} />
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                <li><a href="/profile">Hồ sơ cá nhân</a></li>
                <li><a href="/history">Lịch sử</a></li>
                <li><a href="/promotion">Khuyến mãi tích điểm</a></li>
                <li>Đăng xuất onClick={handleLogout}</li>
              </ul>
                </div>
              )}

            </>
          )
        }
        </div>
      </div>
    </nav>
  );
}

export default Header;
