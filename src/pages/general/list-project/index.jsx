import React from 'react'
import AuthenCardList from '../../../components/authen-card'; 
import CommonTemplate from '../../../components/common-page-template';
import './index.css';

// Dữ liệu mẫu cho trang
const title = 'Dự án';
const context = 'Trang chủ »  Dự án';
const banner = 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/cover-project.jpg?alt=media&token=ba3a40f7-b07d-4c92-a5eb-e84cbfa4c9d9';
const cardData = [
  { id: 1, title: 'Hồ Cá Koi', description: 'Dự án thi công hồ cá koi tại khu vườn.', imageUrl: 'https://images.unsplash.com/photo-1707507012696-f419efd68eed?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, title: 'Hồ Nước Trong', description: 'Hồ nước trong xanh giữa thiên nhiên.', imageUrl: 'https://images.unsplash.com/photo-1673299931964-36a7afc4b966?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, title: 'Hồ Thiên Nhiên', description: 'Dự án hồ thiên nhiên với cây cối xung quanh.', imageUrl: 'https://images.unsplash.com/photo-1678754183715-87b12a70ef28?q=80&w=2038&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, title: 'Hồ Nghệ Thuật', description: 'Hồ nghệ thuật với thiết kế độc đáo.', imageUrl: 'https://images.unsplash.com/photo-1696706795605-ffd7b99c94d9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, title: 'Hồ Cảnh Quan', description: 'Hồ cảnh quan tuyệt đẹp trong công viên.', imageUrl: 'https://images.unsplash.com/photo-1692302707746-89b6b1104f46?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, title: 'Hồ Cá', description: 'Hồ cá với nhiều loại cá khác nhau.', imageUrl: 'https://images.unsplash.com/photo-1723126906987-32a64deb22ac?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 7, title: 'Hồ Nước Mát', description: 'Hồ nước mát mẻ trong những ngày hè.', imageUrl: 'https://images.unsplash.com/photo-1616666720022-b90e39d9f580?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 8, title: 'Hồ Cảnh Đẹp', description: 'Hồ với cảnh đẹp tuyệt vời.', imageUrl: 'https://images.unsplash.com/photo-1681103825940-36c362dbe0ad?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 9, title: 'Hồ Cây Cối', description: 'Hồ được bao quanh bởi cây cối xanh tươi.', imageUrl: 'https://images.unsplash.com/photo-1668737488609-68b4f816dfe3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 10, title: 'Hồ Đẹp', description: 'Hồ đẹp với ánh sáng tự nhiên.', imageUrl: 'https://images.unsplash.com/photo-1606481897791-d908424cc9d9?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

function Index() {
  return (
    <CommonTemplate title={title} context={context} banner={banner}>
      <div style={{ margin: '40px' }}>
        <AuthenCardList cardData={cardData} /> {/* Truyền cardData vào component */}
      </div>
    </CommonTemplate>
  );
}

export default Index;