import React, { useState, useEffect } from "react";
import { Card, Pagination } from "antd";
import "./index.css";
import { Link } from "react-router-dom"; // Thêm import này
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"; // Thêm import này

function AuthenCardList({ cardData }) {
  // Nhận cardData từ props
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 1; // Số lượng thẻ trên mỗi trang

  // Tính toán chỉ số của các thẻ cần hiển thị
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const client = createClient({
    space: "7cnffzqr25eq",
    accessToken: "S0LVPWr1CNSz3SyvHQUsOjgsXS_L1a2V8uV7z8LzrNU",
  });
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    const getAllBlogPosts = async () => {
      try {
        const response = await client.getEntries().then((entries) => {
          console.log(entries);
          setBlogPosts(entries);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAllBlogPosts();
  }, []);

  return (
    <div>
      {blogPosts?.items?.map((post) => (
        <div
          className="authen-card-container"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          key={post.sys.id}
        >
          {currentCards.map((card) => (
            <div
              key={card.id}
              className="authen-card-item"
              style={{ width: "70%" }}
            >
              <Link
                to={`/article/${post.sys.id}`}
                style={{ textDecoration: "none",color:"black" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "10px",
                    backgroundColor: "#f0f0f0",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <img
                    src={post.fields.image.fields.file.url}
                    alt={post.fields.title}
                    className="authen-card-image"
                    style={{
                      width: "400px",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    className="authen-card-content"
                    style={{ width: "100%", marginLeft: "20px" }}
                  >
                    <h3
                      className="authen-card-title"
                      style={{fontSize:"1.8rem", textAlign: "justify", margin: 0,color:"black" }}
                    >
                      {post.fields.tittle}
                    </h3>
                    <p
                      className="authen-card-description"
                      style={{
                        margin: 0,
                        fontSize:"1.5rem",
                        lineHeight:"2.2rem",
                        fontWeight:"lighter",
                        overflow: "hidden",
                        textAlign:"justify",
                        textOverflow: "ellipsis",
                        whiteSpace: "normal",
                        padding: "10px 10% 0px 0px",
                        maxWidth: "100%",
                      }}
                    >
                      {post.fields.blogIntro}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AuthenCardList;
