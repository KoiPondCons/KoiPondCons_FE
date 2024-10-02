import React from "react";
import { Card, Col, Row } from "antd";
import CommonPageTemplate from "../../components/common-page-template";
import "./index.css";
import { IoDocumentTextOutline } from "react-icons/io5";

function HistoryPage() {
  const title = "Lịch sử đơn hàng";
  const banner = "https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/banner-contact.avif?alt=media&token=457aeca2-4a4d-48e0-b9da-2764712f4118";
  const constructionOrder = [
    {
      id: 1,
      service: "Bảo dưỡng",
      status: "Đang chờ thợ",
      date: "02/09/2024",
    },
  ];
  const consultingStaff = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0987654321",
      email: "nguyenvana@gmail.com",
    },
  ];
  
  return (
    <div>
      <CommonPageTemplate title={title} banner={banner}>
        <div className="history-page-container">
          <Card title={<div style={{ textAlign: 'center', fontSize: '1.5rem' }}>Lịch sử đơn hàng</div>}>
          <Card style={{ backgroundColor: '#f0f4f8', borderRadius: '8px', padding: '16px' }}>
    <Row>
      <Col span={4}>
      <IoDocumentTextOutline size={100} />
      </Col>
      <Col span={16}>
      <div className="history-construction-order-info">
      <p>Mã đơn: {constructionOrder.id}</p>
      <p>Số tư vấn: {consultingStaff.phone}</p>
      <p>Trạng thái: {constructionOrder.status}</p>
      <p>Ngày gửi đơn: {constructionOrder.date}</p>
      </div>
      </Col>
      <Col span={4}>
    <button style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px' }}>Hủy đơn</button>
    <a href="#" style={{ color: '#007bff' }}>Chi tiết</a>
      </Col>
    </Row>
</Card>
  </Card>
        </div>
      </CommonPageTemplate>
    </div>
  );
}

export default HistoryPage;
