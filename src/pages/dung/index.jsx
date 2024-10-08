import React from 'react'
import AuthenCard from '../../components/authen-card'
import CommonTemplate from '../../components/common-page-template';
import './index.css';


// Dữ liệu mẫu cho trang
const cardData = [
  { id: 1, title: 'Card 1', description: 'Mô tả cho Card 1' },
];
function Index() {
  return (
    <CommonTemplate title={'Dự án'} banner={'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e'}>
      <div style={{marginTop: '40px'}}>
        {cardData.map(card => (
          <AuthenCard key={card.id} title={card.title} description={card.description} />
        ))}
      </div>
    </CommonTemplate>
  )
}

export default Index