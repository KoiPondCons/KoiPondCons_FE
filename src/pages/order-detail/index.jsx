import React, { useState } from 'react';
import { Input, Button, Form } from 'antd';
import { FaChevronLeft } from 'react-icons/fa';
import './index.css'; // Đảm bảo bạn đã tạo file CSS để tùy chỉnh

const ConsultationPage = () => {
  const [formValues, setFormValues] = useState({
    name: "Phạm Nguyên Khoa",
    phone: "082 624 8258",
    email: "phamkhoa999@gmail.com",
    service: "Khác",
    address: "32/18 Nguyễn Nhữ Lâm, P.Phú Thọ Hòa, Q. Tân Phú",
    volume: "8 m³",
    package: "Khác",
    consultationContent: "Sao chưa bảo dưỡng định kỳ cho mình vậy?"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div className="consultation-container">
      <div className="navigation">
        <Button icon={<FaChevronLeft />} />
      </div>
      <h1>THÔNG TIN TƯ VẤN KHÁCH HÀNG</h1>
      <Form layout="vertical">
        <div className="form-row">
          <Form.Item label="Họ tên" name="name" className="form-item">
            <Input 
              name="name" 
              value={formValues.name} 
              onChange={handleChange} 
            />
          </Form.Item>
          <Form.Item label="Số điện thoại" name="phone" className="form-item">
            <Input 
              name="phone" 
              value={formValues.phone} 
              onChange={handleChange} 
            />
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item label="Email" name="email" className="form-item">
            <Input 
              name="email" 
              value={formValues.email} 
              onChange={handleChange} 
            />
          </Form.Item>
          <Form.Item label="Dịch vụ" name="service" className="form-item">
            <Input 
              name="service" 
              value={formValues.service} 
              onChange={handleChange} 
            />
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item label="Địa chỉ" name="address" className="form-item">
            <Input 
              name="address" 
              value={formValues.address} 
              onChange={handleChange} 
            />
          </Form.Item>
          <Form.Item label="Thể tích hồ" name="volume" className="form-item">
            <Input 
              name="volume" 
              value={formValues.volume} 
              onChange={handleChange} 
            />
          </Form.Item>
        </div>
        <div className="form-row">
          <Form.Item label="Gói" name="package" className="form-item">
            <Input 
              name="package" 
              value={formValues.package} 
              onChange={handleChange} 
            />
          </Form.Item>
        </div>
        <Form.Item label="Nội dung tư vấn" name="consultationContent">
          <Input.TextArea 
            name="consultationContent" 
            value={formValues.consultationContent} 
            onChange={handleChange} 
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">Gửi</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ConsultationPage;