import React, { children, useEffect, useState } from "react";
import "./index.css";
import "@ant-design/icons";
import {
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import IMGDashboard from "../../images/Dashboard.png"; // Nhập hình ảnh

const NavDashboard = ({ children, actor }) => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const links = {
    consulting: [
      {
        path: "/consulting",
        label: "Khách hàng cần tư vấn",
      },
      {
        path: "/consulting/ongoing-consultation",
        label: "Khách hàng đang tư vấn",
      },
      { path: "/consulting/created-orders", label: "Đơn hàng đã tạo" },
      { path: "/my-profile", label: "Hồ sơ của tôi" },
    ],
    construction: [
      { path: "/construction", label: "Dự án đang thực hiện" },
      { path: "/construction/history-construction", label: "Lịch sử dự án" },
      { path: "/my-profile", label: "Hồ sơ của tôi" },
    ],
    designer: [
      { path: "/designer", label: "Xem đơn thiết kế" },
      { path: "/my-profile", label: "Hồ sơ của tôi" },
    ],
    manager: [
      { path: "/manager", label: "Báo cáo doanh thu" },
      { path: "/manager/design-management", label: "Quản lý mẫu thiết kế" },
      { path: "/manager/staff-management", label: "Quản lý nhân sự" },
      { path: "/manager/quote-management", label: "Quản lý báo giá" },
      { path: "/manager/construction-orders", label: "Đơn hàng thi công" },
      { path: "/manager/maintenance-orders", label: "Đơn hàng bảo dưỡng" },
      {
        path: "/manager/customer-profile-management",
        label: "Quản lý hồ sơ khách hàng",
      },
      { path: "/my-profile", label: "Hồ sơ của tôi" },
    ],
  };
  return (
    <div>
      <div className="authen-template-dashboard">
        <div className="sidebar">
          <a href="">
            <img
              className="dashboard"
              src={IMGDashboard} // Sử dụng biến đã nhập
              alt=""
            />
          </a>
          <ul>
            {links[actor]?.map((link, index) => (
              <li key={index}>
                <Link to={link.path}> {link.label}</Link>
                {/* <a href={link.path}>
                  {link.label}
                </a> */}
              </li>
            ))}
          </ul>
          <div></div>
        </div>

        <div className="content">
          <div className="navbar-admin">
            <div className="menu-icon">☰</div>
            <div className="greeting">Xin chào, admin!</div>
            <div className="icons">
              <BellOutlined className="icon noti" />
              <SettingOutlined className="icon setting" />
              <LogoutOutlined className="icon logout" onClick={handleLogout} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavDashboard;
