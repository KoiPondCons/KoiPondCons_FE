import React from "react";
import "./index.css";
const Footer = () => {
  const address = "Đường  D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh";
  const factoryAddress = "cái này ghi gì??";
  const phone = "0909090909";
  const fax = "0909090909";
  const email = "koinhathang@gmail.com";
  const codeBusiness = "hong bik ghi gì";
  const description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.";
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-contact">
          <h2>Công ty TNHH Thiết kế Thi công Koi Team</h2>
          <ul>
            <li>Văn phòng: {address}</li>
            <li>Xưởng: {factoryAddress}</li>
            <li>Điện thoại: {phone} </li>
            <li>Số Fax: {fax} </li>
            <li>Email: {email} </li>
            <li>Mã số doanh nghiệp: {codeBusiness} </li>
          </ul>
        </div>
        <hr className="footer__hr--vertical"></hr>
        <div className="footer-nav">
          <ul>
            <li>
              <a href="#homepage">Trang chủ</a>
            </li>
            <li>
              <a href="#about">Giới thiệu</a>
            </li>
            <li>
              <a href="#projects">Dự án</a>
            </li>
            <li>
              <a href="#services">Dịch vụ</a>
            </li>
            <li>
              <a href="#pricing">Báo giá</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#contact">Liên hệ</a>
            </li>
          </ul>
        </div>
        <hr className="footer__hr--vertical"></hr>
        <div className="footer-title">
          <h2 className="footer-title__text footer-title__text--underline">BÁO GIÁ</h2>
          <h2 className="footer-title__text">NHẬN TƯ VẤN</h2>
          <p  className="footer-description">{description}</p>
        </div>
      </div>
      <div className="footer-coppyright">
        <h3>KOI TEAM Vietnam 2024 © All Rights Reserved</h3>
      </div>
    </footer>
  );
};
export default Footer;
