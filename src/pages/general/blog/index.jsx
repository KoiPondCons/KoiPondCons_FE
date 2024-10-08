import React from "react";
import AuthenCardList from '../../../components/authen-card';
import CommonTemplate from '../../../components/common-page-template';
import './index.css';

const title = 'Bài viết';
const context = 'Trang chủ »  Bài viết';
const banner = 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e';
const cardData = [
  { id: 1, title: 'Hồ Cá Koi: Hướng Dẫn Xây Dựng', description: 'Hướng dẫn từng bước để xây dựng hồ cá koi tại nhà.', imageUrl: 'https://images.unsplash.com/photo-1707507012696-f419efd68eed?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, title: 'Cách Thiết Kế Hồ Nước Trong', description: 'Các yếu tố cần xem xét khi thiết kế hồ nước trong xanh.', imageUrl: 'https://images.unsplash.com/photo-1673299931964-36a7afc4b966?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, title: 'Xây Dựng Hồ Thiên Nhiên', description: 'Cách tạo ra một hồ thiên nhiên với cây cối xung quanh.', imageUrl: 'https://images.unsplash.com/photo-1678754183715-87b12a70ef28?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, title: 'Hồ Nghệ Thuật: Thiết Kế Độc Đáo', description: 'Khám phá các ý tưởng thiết kế hồ nghệ thuật độc đáo.', imageUrl: 'https://images.unsplash.com/photo-1696706795605-ffd7b99c94d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, title: 'Hồ Cảnh Quan: Tạo Không Gian Xanh', description: 'Cách xây dựng hồ cảnh quan tuyệt đẹp trong công viên.', imageUrl: 'https://images.unsplash.com/photo-1692302707746-89b6b1104f46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, title: 'Hồ Cá: Lựa Chọn Loại Cá Phù Hợp', description: 'Hướng dẫn chọn loại cá phù hợp cho hồ cá của bạn.', imageUrl: 'https://images.unsplash.com/photo-1723126906987-32a64deb22ac?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 7, title: 'Hồ Nước Mát: Giải Nhiệt Ngày Hè', description: 'Cách tạo hồ nước mát mẻ cho những ngày hè oi ả.', imageUrl: 'https://images.unsplash.com/photo-1616666720022-b90e39d9f580?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 8, title: 'Hồ Cảnh Đẹp: Tạo Điểm Nhấn Cho Vườn', description: 'Cách xây dựng hồ với cảnh đẹp tuyệt vời trong khu vườn.', imageUrl: 'https://images.unsplash.com/photo-1681103825940-36c362dbe0ad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 9, title: 'Hồ Cây Cối: Tạo Không Gian Tự Nhiên', description: 'Hồ được bao quanh bởi cây cối xanh tươi, tạo không gian tự nhiên.', imageUrl: 'https://images.unsplash.com/photo-1668737488609-68b4f816dfe3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 10, title: 'Hồ Đẹp: Ánh Sáng Tự Nhiên', description: 'Cách tạo hồ đẹp với ánh sáng tự nhiên cho không gian sống.', imageUrl: 'https://images.unsplash.com/photo-1606481897791-d908424cc9d9?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
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