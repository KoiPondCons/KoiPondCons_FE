import React, { useState } from 'react';
import { Card, Pagination } from 'antd';
import './index.css';
import { Link } from 'react-router-dom'; // Thêm import này

function AuthenCardList({ cardData }) { // Nhận cardData từ props
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9; // Số lượng thẻ trên mỗi trang

  // Tính toán chỉ số của các thẻ cần hiển thị
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='authen-card-background'>
      <div>
        <div className='authen-card-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {currentCards.map(card => (
            <div key={card.id} className='authen-card-item' style={{ width: '27%' }}>
              <Link to={`/article/${card.id}`} style={{ textDecoration: 'none' }}>
                <Card bordered={false} className='authen-card'>
                  <img src={card.imageUrl} alt={card.title} className='authen-card-image' style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                  <div className='authen-card-content'>
                    <h3 className='authen-card-title' style={{ textAlign: 'center', margin: 0 }}>{card.title}</h3>
                    <p className='authen-card-description' style={{ margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}>{card.description}</p>
                  </div>
                </Card>
              </Link>
            </div>
          ))}
        </div>
        <Pagination
          current={currentPage}
          pageSize={cardsPerPage}
          total={cardData.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}

export default AuthenCardList;