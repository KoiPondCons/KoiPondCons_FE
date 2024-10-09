import React from "react";
import NavDashboard from "../../../components/navbar-dashboard";
import { Button, Col, Form, Row, Select } from "antd";
import api from "../../../config/axios";
import "../../../utils/common.css";
import FormItem from "antd/es/form/FormItem";
function InfomationCustomer() {
  const constructionOrder = {
    customer_name: "Nguyễn Văn A",
    customer_phone: "0901234567",
    customer_email: "nguyenvana@example.com",
    pond_address: "123 Đường Hoa, Quận 1, TP.HCM",
    status: "Đang chờ",
    pond_volume: "1000 m3",
  };
  const requestContent =
    "Kính gửi trung tâm, tôi muốn yêu cầu một cuộc kiểm tra hồ cá Koi của mình. Hồ cá của tôi có thể tích khoảng 1000 lít và đang gặp một số vấn đề về nước, tôi nghi ngờ có thể có vi khuẩn hoặc nấm gây bệnh cho cá. Tôi hy vọng các chuyên gia của trung tâm có thể đến kiểm tra và tư vấn giải pháp để cải thiện chất lượng nước. Ngoài ra, tôi cũng muốn biết thêm về các dịch vụ điều trị cá bệnh mà trung tâm cung cấp. Mong sớm nhận được phản hồi từ quý trung tâm. Xin cảm ơn!";

  return (
    <NavDashboard actor="consulting">
      <h1>THÔNG TIN ĐƠN HÀNG</h1>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col span={8}>
            <label>Họ tên</label>
            <div className="display-input">
              <span> {constructionOrder.customer_name}</span>
            </div>
          </Col>
          <Col span={8}>
            <label>Số điện thoại</label>
            <div className="display-input">
              <span> {constructionOrder.customer_phone}</span>
            </div>
          </Col>
          <Col span={8}>
            <label>Email</label>
            <div className="display-input">
              <span> {constructionOrder.customer_email}</span>
            </div>
          </Col>
          <Col span={16}>
            <label>Địa chỉ thi công</label>
            <div className="display-input">
              <span> {constructionOrder.pond_address}</span>
            </div>
          </Col>
          <Col span={8}>
            <label>Thể tích hồ</label>
            <div className="display-input">
              <span> {constructionOrder.pond_volume}</span>
            </div>
          </Col>
          <Col span={24}>
            <label>Nội dung khách hàng yêu cầu</label>
            <div className="display-input" style={{ textAlign: "justify" }}>
              {requestContent}
            </div>
          </Col>
          <Col span={12}>
            <FormItem
              label="Gói"
              key="packages"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn gói!",
                },
              ]}
            >
              <Select placeholder="Chọn gói">
                <Select.Option value="1">Gói cơ bản</Select.Option>
                <Select.Option value="2">Gói phổ thông </Select.Option>
                <Select.Option value="3">Gói cao cấp</Select.Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12} style={{ display: "flex", alignItems: "center" }}>
            <Button>Tạo bảng báo giá</Button>
          </Col>
          {/* <Col span={10}>
            <label>Trạng thái</label>
            <div className="display-input">
              <span> {constructionOrder.status}</span>
            </div>
          </Col> */}
          {/* <Col span={7}>
            <label>Gói</label>
            <div className="display-input">
              <span> Trần Kim Nhã</span>
            </div>
          </Col>
          <Col span={7}>
            <label>Thể tích hồ</label>
            <div className="display-input">
              <span> {constructionOrder.pond_volume}</span>
            </div>
          </Col> */}
        </Row>
      </Form>
    </NavDashboard>
  );
}

export default InfomationCustomer;
