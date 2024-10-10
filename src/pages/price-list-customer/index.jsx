import React, { useEffect, useState } from "react";
import NavDashboard from "../../components/navbar-dashboard";
import { Button, Col, Form, Input, Row, Select, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import "./index.css";
function PriceListCustomer() {
  const [pondVolume, setPondVolume] = useState(100);
  const [packageItems, setPackageItems] = useState([]);
  const [unitPrice, setUnitPrice] = useState(100000);
  const [discount, setDiscount] = useState(5);
  const contentdiscount = "Sử dụng thiết kế mẫu giảm(" + discount + "%)";
  const apiPackage =
    "https://66fa4cd2afc569e13a9b1aed.mockapi.io/PackageConstructionItem";
  useEffect(() => {
    const fetchPackageConstructionItem = async () => {
      try {
        const response = await axios.get(apiPackage);
        setPackageItems(response.data); // Cập nhật state với dữ liệu gói
      } catch (err) {
        console.error(err);
      }
    };

    fetchPackageConstructionItem();
  }, []);
  const clonedData = [
    {
      item_content: "Đổ bê tông, chống thấm thành hồ, đáy hồ và hầm lọc.",
      duration: Math.floor(Math.random() * 4) + 1,
    },
    {
      item_content: "Công tác M&E đấu nối điện nước sân vườn",
      duration: Math.floor(Math.random() * 4) + 1,
    },
    {
      item_content: "Hệ thống lọc nước.",
      duration: Math.floor(Math.random() * 4) + 1,
    },
    {
      item_content: "Thi công kè đá nghệ thuật",
      duration: Math.floor(Math.random() * 4) + 1,
    },
    {
      item_content: "Thi công lắp đặt đèn đá Nhật.",
      duration: Math.floor(Math.random() * 4) + 1,
    },
    {
      item_content: "Thi công sàn gỗ hầm lọc.",
      duration: Math.floor(Math.random() * 4) + 1,
    },
    {
      item_content: "Thi công phối kết cây bụi và hoa tạo cảnh nghệ thuật",
      duration: Math.floor(Math.random() * 4) + 1,
    },
  ];
  const columnsPackage = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Đặc tả",
      dataIndex: "item_content",
      key: "item_content",
    },
    {
      title: "Thời lượng thi công",
      dataIndex: "duration",
      key: "duration",
      render: (text, record) => <span>{text} ngày</span>,
    },
  ];
  return (
    <div className="price-list-staff-container">
      {/* Bảng báo giá và chi tiết hạng mục */}
      <h1>Bảng báo giá và chi tiết hạng mục</h1>
      <div className="price-list-staff-form">
        <Form layout="vertical">
          <Row gutter={40}>
            <Col span={8}>
              <FormItem label="Thể tích hồ" key="pond-volume">
                <Input
                  type="number"
                  defaultValue={pondVolume}
                  addonAfter="m3"
                  min={0}
                  max={1000}
                  onChange={(e) => setPondVolume(e.target.value)}
                />
              </FormItem>
            </Col>
            <Col span={8}>
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
            <Col span={8}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ position: "absolute", bottom: "15%", width: "90%" }}
              >
                Tính toán
              </Button>
            </Col>
          </Row>
        </Form>
        {/* Chi tiết hạng mục */}
        <div className="price-list-staff-result">
          <h1>Chi tiết hạng mục</h1>
          <Table
            className="table-template"
            dataSource={clonedData}
            columns={columnsPackage}
            pagination={false}
          />
        </div>
        {/* Báo giá */}
        <div class="container">
          <div class="card cart">
            <label class="title">BÁO GIÁ</label>
            <div class="steps">
              <div class="step" style={{ maxWidth: "100%" }}>
                <div class="payments">
                  <p>ƯỚC LƯỢNG</p>
                  <div class="details">
                    <span style={{ fontWeight: "bold" }}>Đơn giá</span>
                    <span style={{ textAlign: "right" }}>100.000 VND/m3</span>
                    <span style={{ fontWeight: "bold" }}>Thể tích</span>
                    <span style={{ textAlign: "right" }}>100 m3</span>
                  </div>
                  <hr />
                  <p style={{ marginTop: "20px" }}>THANH TOÁN</p>
                  <div class="details">
                    <span style={{ fontWeight: "bold" }}>Thành tiền</span>
                    <span style={{ textAlign: "right" }}>100.000.000 VND</span>
                    <span style={{ fontWeight: "bold" }}>Giảm giá</span>
                    <span style={{ textAlign: "right" }}>5%</span>
                    <span style={{ fontWeight: "bold" }}></span>
                    <span style={{ textAlign: "right", gap: "1px" }}>
                      5.000.000 VND
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card checkout">
            <div class="footer">
              <label class="price">95.000.000 VND</label>
              <button class="checkout-btn">Gửi báo giá</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceListCustomer;
