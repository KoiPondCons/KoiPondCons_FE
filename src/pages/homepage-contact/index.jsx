import React, { useState } from "react"; // Import useState
import "./index.css";
import CommonPageTemplate from "../../components/common-page-template";
import { Form, Input, Select, Row, Col, Button } from "antd";
import FormItem from "antd/es/form/FormItem";
import { LuMapPin, LuMail, LuPhone } from "react-icons/lu";
const { TextArea } = Input;

function ContactPage() {
  const [selectedService, setSelectedService] = useState("");

  const handleServiceChange = (value) => {
    setSelectedService(value);
  };
  const [isRequested, setRequested] = useState(false);
  const address = "Đường D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh";
  const email = "koinhathang@gmail.com";
  const phoneNumber = "0823 132 452";
  const title = "Liên hệ";
  const context = "Trang chủ »  Liên hệ";
  const banner =
    "https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/banner-contact.avif?alt=media&token=457aeca2-4a4d-48e0-b9da-2764712f4118";

  return (
    <CommonPageTemplate className="context" title={title} context={context} banner={banner}>
      {isRequested ? 
       (
        <div className="content-container">
          <h1>Đã gửi yêu cầu thành công</h1>
          <p>
            Chúng tôi đã nhận được yều cầu của bạn và sẽ sớm liên hệ với bạn
            trong vòng 24h làm việc
          </p>
          <div className="button-container">
          <Button onClick={() => navigate("/")} className="button-common" >Quay về trang chủ</Button>
          <Button onClick={() => navigate("/price")} className="button-common" >Tham khảo bảng giá</Button>
          </div>
        </div>
      ) : (
        <Row justify="center" align="middle" style={{ width: "100%" }}>
          <Col span={9}>
            <div className="container-input">
              <h3>Đăng ký nhận báo giá ngay hôm nay!</h3>
              <Form>
                <Row gutter={[20]}>
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
                          {
                            value: "02",
                            label: "Thi công hồ cá Koi theo mẫu",
                          },
                        ]}
                        onChange={handleServiceChange} // Gọi hàm khi dịch vụ thay đổi
                      />
                    </FormItem>
                  </Col>
                  {selectedService === "02" && (
                    <FormItem
                      label="Tệp đính kèm (PDF)"
                      name="attachment"
                      labelCol={{ span: 30 }}
                      style={{ marginLeft: "10px" }} // Thêm margin trái 10px
                    >
                      <input
                        type="file"
                        accept=".pdf"
                        id="file-upload"
                        style={{ display: "none" }} // Ẩn input gốc
                        onChange={(e) => {
                          const fileName = e.target.files[0]
                            ? e.target.files[0].name
                            : "";
                          document.getElementById("file-label").innerText =
                            fileName || "Chọn tệp";
                        }}
                      />
                      <label
                        htmlFor="file-upload"
                        style={{
                          cursor: "pointer",
                          border: "1px solid #ccc",
                          padding: "10px",
                        }}
                      >
                        <span id="file-label" style={{ fontWeight: "bold" }}>
                          Chọn tệp
                        </span>
                      </label>
                    </FormItem>
                  )}
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
          <hr
            style={{
              margin: "20px 0",
              border: "none",
              height: "1px",
              backgroundColor: "black",
            }}
          />{" "}
          <Col span={10} offset={2}>
            <div className="contact-info__details">
              <h4>Để bắt đầu một dự án mới!</h4>
              <p>
                Hãy gọi cho chúng tôi hoặc ghé qua bất cứ lúc nào, chúng tôi cố
                gắng trả lời mọi thắc mắc trong vòng 24 giờ vào các ngày làm
                việc. Rất hân hạnh được trả lời câu hỏi của bạn.
              </p>
              <div className="contact-info__list">
                <h3>
                  <LuMapPin style={{ marginRight: "8px" }} />
                  {address}
                </h3>
                <h3>
                  <LuMail style={{ marginRight: "8px" }} />
                  {email}
                </h3>
                <h3>
                  <LuPhone style={{ marginRight: "8px" }} />
                  {phoneNumber}
                </h3>
              </div>
            </div>
          </Col>
        </Row>
      ) }
    </CommonPageTemplate>
  );
}

export default ContactPage;
