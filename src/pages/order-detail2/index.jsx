import { Col, Form, Input, Popover, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import NavDashboard from "../../components/navbar-dashboard";
function Order() {
  const ConstructionOrderID = "1";
  const [constructionOrder, setConstructionOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchConstructionOrder = async () => {
      try {
        const response = await axios.get(
          `https://66fa4cd2afc569e13a9b1aed.mockapi.io/ConstructionOrder/${ConstructionOrderID}`
        );
        setConstructionOrder(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConstructionOrder();
  }, [ConstructionOrderID]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  const imageUrl =
    "https://thepet.vn/wp-content/uploads/2023/05/angry_cat_2-scaled-1-1024x683.webp";
  const contentFileDesign = (
    <div>
      <img
        src={imageUrl}
        alt="Image"
        style={{ width: "150px", height: "auto" }}
      />
    </div>
  );
  return (
    <NavDashboard>
      <div>
        <h1>THÔNG TIN ĐƠN HÀNG</h1>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label={"Họ tên"}>
                <Input value={constructionOrder.customer_name} readOnly />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={"Số điện thoại"}>
                <Input value={constructionOrder.customer_phone} readOnly />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={"Email"}>
                <Input value={constructionOrder.customer_email} readOnly />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={"Địa chỉ thi công"}>
                <Input value={constructionOrder.pond_address} readOnly />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label={"Trạng thái"}>
                <Input value={constructionOrder.status} readOnly />
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem label={"Gói"}>
                <Input value={constructionOrder.package_id} readOnly />
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem label={"Thể tích hồ"}>
                <Input value={constructionOrder.pond_volume} readOnly />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <h1>ĐẢM NHẬN VÀ TIẾN ĐỘ THI CÔNG</h1>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={4}>
              <div>Đây quăng cái hình tròn tiến độ vô đây nà</div>
              <h3>Tiến độ</h3>
              <a href="">Xem chi tiết</a>
            </Col>
            <Col span={20}>
              <FormItem label={"Tư vấn viên"}>
                <Input value={"Trần Kim Nhã"} readOnly />
              </FormItem>
              <FormItem label={"Nhà thiết kế"}>
                <Input value={"Trần Kim Nhã"} readOnly />
              </FormItem>
              <FormItem label={"Chịu trách nhiệm thi công"}>
                <Input value={"Trần Kim Nhã"} readOnly />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={"Ngày tiếp nhận"}>
                <Input value={constructionOrder.request_date} readOnly />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={"File bản vẽ thiết kế"}>
                <Input value="FIle thiết kế chưa có (cú)" readOnly />
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </NavDashboard>
  );
}
export default Order;
