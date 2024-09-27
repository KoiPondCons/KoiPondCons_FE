import React from "react";
import CommonPageTemplate from "../../components/common-page-template";
import { Form, Input, Select, Row, Col, InputNumber } from "antd";
import FormItem from "antd/es/form/FormItem";
const { TextArea } = Input;
function ContactPage() {
  const address = "abc";
  const email = "abc@gmail.com";
  const phoneNumber = "0812352532";
  return (
    <CommonPageTemplate>
      <Row style={{ padding: "30px 20px" }}>
        <Col span={10}>
          <div className="container-input">
            <h1>Đăng ký nhận báo giá ngay hôm nay!</h1>
            <Form>
              <Row gutter={[48, 24]}>
                <Col span={12}>
                  <FormItem
                    name="nameCustomer"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập đầy đủ họ và tên!",
                      },
                    ]}
                  >
                    <Input placeholder="Họ và tên" />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                    ]}
                  >
                    <Input placeholder="Số điện thoại" />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ!",
                      },
                    ]}
                  >
                    <Input placeholder="Địa chỉ" />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <Form
                    name="volume"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập thể tích hồ!",
                      },
                    ]}
                  >
                    <Input type="Number" 
                    min={}
                    placeholder="Thể tích hồ" />
                  </Form>
                </Col>
                <Col span={12}>
                  <FormItem
                    name="service"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn dịch vụ!",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Dịch vụ"
                      style={{ flex: 1 }}
                      options={[
                        { value: "jack", label: "Jack" },
                        { value: "lucy", label: "Lucy" },
                        { value: "Yiminghe", label: "yiminghe" },
                      ]}
                    />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem name="description">
                    <TextArea placeholder="Nội dung yêu cầu" />
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
        <Col span={12} offset={2}>
          <div className="contact-info">
            <h1>Để bắt đầu một dự án mới!</h1>
            <p>
              Hãy gọi cho chúng tôi hoặc ghé qua bất cứ lúc nào, chúng tôi cố
              gắng trả lời mọi thắc mắc trong vòng 24 giờ vào các ngày làm việc.
              Rất hân hạnh được trả lời câu hỏi của bạn.
            </p>
            <h3>{address}</h3>
            <h3>{email}</h3>
            <h3>{phoneNumber}</h3>
          </div>
        </Col>
      </Row>
    </CommonPageTemplate>
  );
}

export default ContactPage;
