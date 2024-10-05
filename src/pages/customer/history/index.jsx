import React from "react";
import { Card, Col, Row } from "antd";
import CommonPageTemplate from "../../components/common-page-template";
import "./index.css";
import { IoDocumentTextOutline } from "react-icons/io5";

function HistoryPage() {
  const title = "Lịch sử đơn hàng";
  const banner = "https://images.unsplash.com/photo-1627884849665-8c74468f6037?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
          <Card title={<h1 style={{ textAlign: 'center' }}>Lịch sử đơn hàng</h1>}>
          <Card style={{ backgroundColor: '#f0f4f8', borderRadius: '8px', padding: '16px' }}>
    <Row>
      <Col span={4}>
      <IoDocumentTextOutline size={100} />
      </Col>
      <Col span={16}>
      <div className="history-construction-order-info">
      <p>Mã đơn: {constructionOrder[0].id}</p>
      <p>Số tư vấn: {consultingStaff[0].phone}</p>
      <p>Trạng thái: {constructionOrder[0].status}</p>
      <time dateTime={constructionOrder[0].date}>Ngày gửi đơn: {constructionOrder[0].date}</time>
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
