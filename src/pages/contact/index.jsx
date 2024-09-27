import React from "react";
import "./index.css";
import CommonPageTemplate from "../../components/common-page-template";
import { Form, Input, Select, Row, Col } from "antd";
import FormItem from "antd/es/form/FormItem";
import { LuMapPin, LuMail, LuPhone } from "react-icons/lu";
const { TextArea } = Input;
function ContactPage() {
  const address = "Đường D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh";
  const email = "koinhathang@gmail.com";
  const phoneNumber = "0823 132 452";
  return (
    <CommonPageTemplate>
      <Row>
        <Col span={10}>
          <div className="container-input">
            <h3>Đăng ký nhận báo giá ngay hôm nay!</h3>
            <Form>
              <Row gutter={[60]}>
                <Col span={12}>
                  <FormItem
                    label="Họ và tên"
                    name="nameCustomer"
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập đầy đủ họ và tên!",
                      },
                    ]}
                  >
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    label="Số điện thoại"
                    name="phoneNumber"
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                    ]}
                  >
                    <Input />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="Địa chỉ"
                    name="address"
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ!",
                      },
                    ]}
                  >
                    <Input />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    label="Thể tích hồ"
                    name="volume"
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập thể tích hồ!",
                      },
                    ]}
                  >
                    <Input type="Number" min={4} />
                  </FormItem>
                </Col>
                <Col span={12}>
                  <FormItem
                    label="Dịch vụ"
                    name="service"
                    labelCol={{ span: 24 }}
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn dịch vụ!",
                      },
                    ]}
                  >
                    <Select
                      style={{ flex: 1 }}
                      options={[
                        {
                          value: "01",
                          label: "Thiết kế và thi công hồ cá Koi",
                        },
                        { value: "02", label: "Thi công hồ cá Koi theo mẫu" },
                      ]}
                    />
                  </FormItem>
                </Col>
                <Col span={24}>
                  <FormItem
                    label="Nội dung yêu cầu"
                    name="description"
                    labelCol={{ span: 24 }}
                  >
                    <TextArea placeholder="Nội dung yêu cầu" />
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <p>*Thường phản hồi trong vòng 24h làm việc</p>
          </div>
        </Col>
        <Col span={12} offset={2}>
          <div className="contact-info__details">
            <h4>Để bắt đầu một dự án mới!</h4>
            <p>
              Hãy gọi cho chúng tôi hoặc ghé qua bất cứ lúc nào, chúng tôi cố
              gắng trả lời mọi thắc mắc trong vòng 24 giờ vào các ngày làm việc.
              Rất hân hạnh được trả lời câu hỏi của bạn.
            </p>
            <div className="contact-info__list">
              <h3>
                <LuMapPin />
                {address}
              </h3>
              <h3>
                <LuMail />
                {email}
              </h3>
              <h3>
                <LuPhone />
                {phoneNumber}
              </h3>
            </div>
          </div>
        </Col>
      </Row>
    </CommonPageTemplate>
  );
}

export default ContactPage;
