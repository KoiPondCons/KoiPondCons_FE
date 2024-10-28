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
              <p>Văn phòng: {address}</p>
            </li>
            <li>
              <FaPhone />
              <p>Điện thoại: {phone} </p>
            </li>
            <li>
              <FaSuitcase />
              <p>Số Fax: {fax} </p>
            </li>
            <li>
              <FaEnvelope />
              <p>Email: {email} </p>
            </li>
            <li>
              <FaUserGroup />
              <p>Mã số doanh nghiệp: {codeBusiness} </p>
            </li>
          </ul>
        </div>

        <hr className="footer__hr--vertical"></hr>

        <div className="footer-nav">
          <ul>
            <li>
              <a
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: "1.4rem",
                }}
                href="homepage"
              >
                Trang chủ
              </a>
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
          <h2 style={{ textAlign: "left" }} className="footer-title__text">
            <a href="contact">Nhận báo giá</a>
          </h2>
          <h2 style={{ textAlign: "left" }} className="footer-title__text">
            <a href="contact">Yêu cầu báo giá</a>
          </h2>
          <h2 style={{ textAlign: "left" }} className="footer-title__text">
            <a href="contact">Hotline: {phone}</a>
          </h2>
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
