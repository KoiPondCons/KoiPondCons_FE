import React from "react";
import "./index.css";

const AuthenTemplateDashboard = ({ children }) => {
  return (
    <div className="authen-template-dashboard">
      <div className="sidebar">
        <img
          className="dashboard"
          src="https://media.discordapp.net/attachments/1281613412111225009/1289420986487148599/Group_145.png?ex=66fa13df&is=66f8c25f&hm=2af1dcbe9f8fff8306a5677d7871d06aa728298eb80c368778a66fb2f101da48&=&format=webp&quality=lossless"
          alt=""
        />
        <ul>
          <li>
            <a href="consultation-requests">Khách hàng cần tư vấn</a>
          </li>
          <li>
            <a href="">Khách hàng đang tư vấn</a>
          </li>
          <li>
            <a href="">Đơn hàng đã tạo</a>
          </li>
          <li>
            <a href="">Hồ sơ của tôi</a>
          </li>
        </ul>
      </div>
      <div className="content">
        <img src="https://media.discordapp.net/attachments/1281613412111225009/1289420986487148599/Group_145.png?ex=66fb655f&is=66fa13df&hm=6b47106f0679fd800823b4c282e66f9d005efcab5572ff83979e0fa16411d27f&=&format=webp&quality=lossless&width=673&height=96"></img>
        {children}
      </div>
    </div>
  );
};

export default AuthenTemplateDashboard;
