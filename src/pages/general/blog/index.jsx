import React from "react";
import AuthenCardList from '../../../components/authen-card';
import CommonTemplate from '../../../components/common-page-template';

import './index.css';

const title = 'Bài viết';
const context = 'Trang chủ »  Bài viết';
const banner = 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e';

const cardData = [
  { id: 1, title: 'Hồ Cá Koi: Hướng Dẫn Xây Dựng', description: 'Hướng dẫn từng bước để xây dựng hồ cá koi tại nhà.', imageUrl: 'https://images.unsplash.com/photo-1707507012696-f419efd68eed?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

function Service() {
  return (
    <div>
      <CommonTemplate title={title} context={context} banner={banner}>
        <div style={{ margin: '40px' }}>
          <AuthenCardList cardData={cardData} /> {/* Truyền cardData vào component */}
        </div>
      </CommonTemplate>
    </div>
  );
}

export default Service;