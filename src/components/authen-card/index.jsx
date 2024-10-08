import React, { useState } from 'react';
import { Card, Pagination } from 'antd';
import './index.css';

const cardData = [
  { id: 1, title: 'Card 1', description: 'Mô tả cho Card 1', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e' },
  { id: 2, title: 'Card 2', description: 'Mô tả cho Card 2', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e' },
  { id: 3, title: 'Card 3', description: 'Mô tả cho Card 3', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e' },
  { id: 4, title: 'Card 4', description: 'Mô tả cho Card 4', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e' },
  { id: 5, title: 'Card 5', description: 'Mô tả cho Card 5', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/jaipreet-singh-w7NUZ__mv70-unsplash.jpg?alt=media&token=c8c55d47-2f1d-4fea-bcb2-a3aa72ead9f7' },
  { id: 6, title: 'Hồ cá koi', description: 'Một hồ cá koi đẹp với nước trong xanh.', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e' },
  { id: 7, title: 'Cảnh thiên nhiên', description: 'Cảnh thiên nhiên tuyệt đẹp với cây cối xanh tươi.', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e' },
  { id: 8, title: 'Card 8', description: 'Mô tả cho Card 8', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e' },
  { id: 9, title: 'Card 9', description: 'Mô tả cho Card 9', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e' },
  { id: 10, title: 'Card 10', description: 'Mô tả cho Card 10', imageUrl: 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e' },
];

function AuthenCardList() {
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
    <div className='background'>
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {currentCards.map(card => (
            <div key={card.id} style={{ width: '28%' }}>
              <Card bordered={false}>
                <img src={card.imageUrl} alt={card.title} style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
                <h3 style={{ textAlign: 'center' }}>{card.title}</h3> {/* Di chuyển tiêu đề xuống dưới ảnh */}
                <p>{card.description}</p>
              </Card>
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