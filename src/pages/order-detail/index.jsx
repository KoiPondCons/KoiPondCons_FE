import { Col, Form, Input, Row } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import "./index.css";
function Order() {
  return (
    <div>
      <h1>THÔNG TIN ĐƠN HÀNG</h1>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col span={8}>
            <FormItem label={"Họ tên"}>
              <Input value={"Anh Khoa"} readOnly />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={"Số điện thoại"}>
              <Input value={"0931445958"} readOnly />
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label={"Email"}>
              <Input value={"phamkhoa999@gmail.com"} readOnly />
            </FormItem>
          </Col>
          <Col span={24}>
            <FormItem label={"Địa chỉ"}>
              <Input value={"15 Long Hưng, P.7, Q.Tân Bình"} readOnly />
            </FormItem>
          </Col>
          <Col span={10}>
            <FormItem label={"Trạng thái"}>
              <Input value={"Designed"} readOnly />
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem label={"Gói"}>
              <Input value={"Thường"} readOnly />
            </FormItem>
          </Col>
          <Col span={7}>
            <FormItem label={"Thể tích hồ"}>
              <Input value={"20m3"} readOnly />
            </FormItem>
          </Col>
        </Row>
      </Form>
      <h1>BẢNG BÁO GIÁ</h1>
      <div></div>
      <h1>DỰ ÁN THI CÔNG</h1>
    </div>
  );
}

export default Order;
