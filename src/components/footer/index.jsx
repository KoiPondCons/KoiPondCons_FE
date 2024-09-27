import React from "react";
import "./index.css";
import {
  FaWrench,
  FaUserGroup,
  FaPhone,
  FaSuitcase,
  FaEnvelope,
} from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";

const Footer = () => {
  const address = "Đường  D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh";
  const factoryAddress = "cái này ghi gì??";
  const phone = "0823 132 452";
  const fax = "(024) 22202525";
  const email = "koinhathang@gmail.com";
  const codeBusiness =
    "0378884849 cấp ngày 5/09/2024 tại Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh";
  const description =
    "Chứng chỉ Năng lực Hoạt động Xây dựng Cấp III. Số: HCM-00046954, cấp ngày 19/10/2020 tại Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh.";
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-contact">
          <h2>Công ty TNHH Thiết kế Thi công Koi Team</h2>
          <ul>
            <li>
              <IoHomeSharp />
              Văn phòng: {address}
            </li>
            <li>
              <FaWrench />
              Xưởng: {factoryAddress}
            </li>
            <li>
              <FaPhone />
              Điện thoại: {phone}{" "}
            </li>
            <li>
              <FaSuitcase />
              Số Fax: {fax}{" "}
            </li>
            <li>
              <FaEnvelope />
              Email: {email}{" "}
            </li>
            <li>
              <FaUserGroup />
              Mã số doanh nghiệp: {codeBusiness}{" "}
            </li>
          </ul>
        </div>
        <hr className="footer__hr--vertical"></hr>
        <div className="footer-nav">
          <ul>
            <li>
              <a href="homepage">Trang chủ</a>
            </li>
            <li>
              <a href="about">Giới thiệu</a>
            </li>
            <li>
              <a href="projects">Dự án</a>
            </li>
            <li>
              <a href="services">Dịch vụ</a>
            </li>
            <li>
              <a href="pricing">Báo giá</a>
            </li>
            <li>
              <a href="blog">Blog</a>
            </li>
            <li>
              <a href="contact">Liên hệ</a>
            </li>
          </ul>
        </div>
        <hr className="footer__hr--vertical"></hr>
        <div className="footer-title">
          <h2 className="footer-title__text footer-title__text--underline">
            BÁO GIÁ
          </h2>
          <h2 className="footer-title__text">NHẬN TƯ VẤN</h2>
          <p className="footer-description">{description}</p>
        </div>
      </div>
      <div className="footer-coppyright">
        <h3>KOI TEAM Vietnam 2024 © All Rights Reserved</h3>
      </div>
    </footer>
  );
};
export default Footer;
