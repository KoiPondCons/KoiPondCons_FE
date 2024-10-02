import React from "react";
import "./index.css";
import Header from "../header";
import Footer from "../footer";
const CommonPageTemplate = ({ children, title, banner }) => {
  return (
    <div>
      <Header />
      <div className="common-page-container">
        <div className="common-page-banner">
          <div className="banner-title-container">
            <h1 className="banner-title">{title}</h1>
          </div>
          <img src={banner} alt="" />
        </div>
        <div className="common-page-content">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default CommonPageTemplate;
