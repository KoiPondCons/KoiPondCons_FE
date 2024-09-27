import React from "react";
import "./index.css";
import Header from "../header";
import Footer from "../footer";
const CommonPageTemplate = ({ children }) => {
  const title = "Liên hệ";
  const banner =
    "https://images.unsplash.com/photo-1588171562256-e0a7313153f4?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
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
