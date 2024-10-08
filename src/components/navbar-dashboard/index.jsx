import React, { children } from "react";
import "./index.css";
import "@ant-design/icons";
import {
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const NavDashboard = ({ children, actor }) => {
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
              src="https://cdn.discordapp.com/attachments/1281613412111225009/1289420986487148599/Group_145.png?ex=66fb655f&is=66fa13df&hm=6b47106f0679fd800823b4c282e66f9d005efcab5572ff83979e0fa16411d27f&"
              alt=""
            />
          </a>
          <ul>
            {links[actor]?.map((link, index) => (
              <li key={index}>
                <a href={link.path}>{link.label}</a>
              </li>
            ))}
          </ul>
          <div></div>
        </div>

        <div className="content">
          <div class="navbar-admin">
            <div class="menu-icon">☰</div>
            <div class="greeting">Xin chào, admin!</div>
            <div class="icons">
              <BellOutlined className="icon noti" />
              <SettingOutlined className="icon setting" />
              <LogoutOutlined className="icon logout" />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavDashboard;
