import React, { children, useEffect, useState } from "react";
import "./index.css";
import "@ant-design/icons";
import {
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import IMGDashboard from "../../images/Dashboard.png"; // Nhập hình ảnh
import Header from "../header";
import Footer from "../footer";
import { Menu } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";

const NavDashboard = ({ children, actor }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [items, setItems] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (token !== null) {
      setIsLoggedIn(true);
    }
  }, [token]);
  useEffect(() => {
    switch (actor) {
      case "manager":
        setItems(itemsManager);
        break;
      case "consulting":
        setItems(itemsConsulting);
        break;
      case "construction":
        setItems(itemsConstruction);
        break;
      case "designer":
        setItems(itemsDesigner);
        break;
    }
  }, [actor]);
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  const itemsManager = [
    {
      key: "/manager",
      label: <Link to="/manager">Bảng điều khiển</Link>,
    },
    {
      key: "manage-order",
      label: "Quản lý đơn hàng",
      children: [
        {
          key: "/manager/construction-orders",
          label: <Link to="/manager/construction-orders">Thi công</Link>,
        },
        {
          key: "/manager/maintenance-orders",
          label: <Link to="/manager/maintenance-orders">Dịch vụ</Link>,
        },
      ],
    },
    {
      key: "manager-account",
      label: "Quản lý hồ sơ",
      children: [
        {
          key: "/manager/staff-management",
          label: <Link to="/manager/staff-management">Nhân viên</Link>,
        },
        {
          key: "/manager/customer-profile-management",
          label: (
            <Link to="/manager/customer-profile-management">Khách hàng</Link>
          ),
        },
      ],
    },
    {
      key: "manage-price",
      label: "Quản lý báo giá",
      children: [
        {
          key: "/manager/promotions",
          label: <Link to="/manager/promotions">Khuyến mãi</Link>,
        },
        {
          key: "/manager/combo",
          label: <Link to="/manager/combo">Gói</Link>,
        },
      ],
    },
    // {
    //   key: "/manager/blog",
    //   label: <Link to="/manager/blog">Quản lý blog</Link>,
    // },
  ];
  const itemsConsulting = [
    {
      key: "/consulting",
      label: <Link to="/consulting">Khách hàng cần tư vấn</Link>,
    },
    {
      key: "/consulting/ongoing-consultation",
      label: (
        <Link to="/consulting/ongoing-consultation">
          Khách hàng đang tư vấn
        </Link>
      ),
    },
  ];
  const itemsConstruction = [
    {
      key: "/construction",
      label: <Link to="/construction">Dự án đang thực hiện</Link>,
    },
    {
      key: "/construction/history-construction",
      label: <Link to="/construction/history-construction">Lịch sử dự án</Link>,
    },
    // {
    //   key: "/my-profile",
    //   label: <Link to="/my-profile">Hồ sơ của tôi</Link>,
    // },
  ];
  const itemsDesigner = [
    {
      key: "/designer",
      label: <Link to="/designer">Xem đơn thiết kế</Link>,
    },
    // {
    //   key: "/my-profile",
    //   label: <Link to="/my-profile">Hồ sơ của tôi</Link>,
    // },
  ];
  if (actor === null)
    return <Navigate to="/homepage" />;

  if (actor === "customer")
    return (
      <div style={{ backgroundColor: "white" }}>
        <Header />
        {children}
        <Footer />
      </div>
    );
  
  

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
          <Menu
            style={{ width: 256 }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
            selectedKeys={currentPath}
          />
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
