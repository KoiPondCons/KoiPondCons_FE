import React, { children } from "react";
import "./index.css";
import "@ant-design/icons";
import {
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const NavDashboard = ({ children }) => {
  return (
    <div>
      <div className="authen-template-dashboard">
        <div className="sidebar">
          <a href="admin  ">
            <img
              className="dashboard"
              src="https://cdn.discordapp.com/attachments/1281613412111225009/1289420986487148599/Group_145.png?ex=66fb655f&is=66fa13df&hm=6b47106f0679fd800823b4c282e66f9d005efcab5572ff83979e0fa16411d27f&"
              alt=""
            />
          </a>
          <ul>
            <li>
              <a href="">Khách hàng cần tư vấn</a>
            </li>
            <li>
              <a href="ongoing-consultation">Khách hàng đang tư vấn</a>
            </li>
            <li>
              <a href="created-orders">Đơn hàng đã tạo</a>
            </li>
            <li>
              <a href="my-profile">Hồ sơ của tôi</a>
            </li>
          </ul>
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
