import React, { useState, useEffect } from 'react';
import { Card, Pagination } from 'antd';
import './index.css';
import { Link } from 'react-router-dom'; // Thêm import này
import { createClient } from "contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'; // Thêm import này

function AuthenCardList({ cardData }) { // Nhận cardData từ props
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 1; // Số lượng thẻ trên mỗi trang

  // Tính toán chỉ số của các thẻ cần hiển thị
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const client = createClient({ space: "7cnffzqr25eq", accessToken: "S0LVPWr1CNSz3SyvHQUsOjgsXS_L1a2V8uV7z8LzrNU" });
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    const getAllBlogPosts = async () => {
      try {
        const response = await client.getEntries().then(entries => {
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
        <div className='authen-card-background post' key={post.sys.id}>
            <div className='authen-card-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {currentCards.map(card => (
                <div key={card.id} className='authen-card-item' style={{ width: '27%' }}>
                  <Link to={`/article/${post.sys.id}`} style={{ textDecoration: 'none' }}>
                    <Card bordered={false} className='authen-card'>
                      <img src={post.fields.image.fields.file.url} alt={post.fields.title} className='authen-card-image' style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                      <div className='authen-card-content'>
                        <h3 className='authen-card-title' style={{ textAlign: 'center', margin: 0 }}>{post.fields.tittle}</h3>
                        <p className='authen-card-description' style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>
                          {post.fields.blogIntro}
                        </p>
                      </div>
                    </Card>
                  </Link>
                </div>
              ))}
            </div>
        </div>
      ))}
    </div>
  );
}

export default AuthenCardList;