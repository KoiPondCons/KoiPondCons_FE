import React from "react";
import "./index.css";
import Header from "../header";
import Footer from "../footer";
const CommonPageTemplate = ({ children }) => {
  const title = "Liên hệ";
  const banner = "https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/pham-an-PS42dsNG7yE-unsplash.jpg?alt=media&token=1d9c1c22-4955-425f-be5d-77882fd2c74c";
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
