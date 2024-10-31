import React, { useEffect, useState } from "react"; // Import useState
import "./index.css";
import CommonPageTemplate from "../../../components/common-page-template";
import { Form, Input, Select, Row, Col, Button, Radio } from "antd";
import FormItem from "antd/es/form/FormItem";
import { LuMapPin, LuMail, LuPhone } from "react-icons/lu";
import { toast } from "react-toastify";
// import api from "../../config/axios";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import LoadingPage from "../../../components/loading/index";
const { TextArea } = Input;

function ContactPage() {
  const navigate = useNavigate();
  const address = "Đường D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh";
  const email = "koinhathang@gmail.com";
  const phoneNumber = "0823 132 452";
  const title = "Liên hệ";
  const context = "Trang chủ »  Liên hệ";
  const banner =
    "https://images.unsplash.com/photo-1670879919941-b939366624c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [isRequested, setRequested] = useState(false);
  const [isConstruction, setIsConstruction] = useState(null);
  const [customerInformation, setCustomerInformation] = useState();
  const [form] = Form.useForm();
  const fetchData = async () => {
    try {
      const response = await api.get("account/current");
      setCustomerInformation(response.data); // Lưu thông tin vào state
      form.setFieldsValue({
        customerName: response.data.name,
        customerPhone: response.data.phone,
        pondAddress: response.data.address,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmitOrder = async (value) => {
    try {
      if (isConstruction) {
        await api.post("orders", value);
      } else {
        await api.post("maintenance", value);
      }
      toast.success("Gửi yêu cầu thành công!");
      setRequested(true);
    } catch (error) {
      toast.error("Vui lòng đăng nhập để gửi yêu");
      console.log(error.response.data);
    }
  };
  const handleOnChangeService = (value) => {
    setIsConstruction(value);
    console.log("Chọn dịch vụ: " + value);
  };

  return (
    <CommonPageTemplate context={context} title={title} banner={banner}>
      {isRequested ? (
        <div className="request-success">
          <div className="request-success__wrapper">
            <IoMdCheckmarkCircleOutline size={140} />
            <h1 className="request-success__title">
              Đã gửi yêu cầu thành công
            </h1>
            <p className="request-success__message">
              Chúng tôi đã nhận được yều cầu của bạn và sẽ sớm liên hệ với bạn
              trong vòng 24h làm việc
            </p>
            <div className="request-success__buttons">
              <Button onClick={() => navigate("/")} className="button-common">
                Quay về trang chủ
              </Button>
              <Button
                onClick={() => navigate("/price")}
                className="button-common"
              >
                Tham khảo bảng giá
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Row justify="center" align="middle" style={{ width: "100%" }}>
          <Col span={9}>
            <div className="container-input">
              <Form
                form={form}
                onFinish={handleSubmitOrder}
                initialValues={{
                  pondAddress: customerInformation?.address || "",

                  customerName: customerInformation?.name || "",

                  customerPhone: customerInformation?.phone || "",
                }}
              >
                <h3>Đăng ký nhận báo giá ngay hôm nay!</h3>
                <Row gutter={[20]}>
                  <Col span={12}>
                    <FormItem
                      label="Họ và tên"
                      name="customerName"
                      labelCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập họ và tên!",
                        },
                      ]}
                    >
                      <Input />
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem
                      label="Số điện thoại"
                      name="customerPhone"
                      labelCol={{ span: 24 }}
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập số điện thoại!",
                        },
                        {
                          pattern: "^(84|0)+[3|5|7|8|9]\\d{8}$",
                          message: "Số điện thoại không hợp lệ!",
                        },
                      ]}
                    >
                      <Input />
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem
                      label="Địa chỉ"
                      name="pondAddress"
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
                  <Col span={10}>
                    <FormItem
                      label="Thể tích hồ"
                      name="pondVolume"
                      labelCol={{ span: 24 }}
                    >
                      <Input type="Number" min={8} max={10000} />
                    </FormItem>
                  </Col>
                  <Col span={14}>
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
                        onChange={handleOnChangeService}
                        style={{ flex: 1 }}
                        options={[
                          {
                            value: false,
                            label: "Dịch vụ",
                          },
                          {
                            value: true,
                            label: "Thi công hồ cá Koi",
                          },
                        ]}
                      />
                    </FormItem>
                  </Col>
                  {isConstruction !== null && // Chỉ hiển thị khi đã chọn dịch vụ
                    (isConstruction ? (
                      <Col span={24}>
                        <FormItem
                          label="Loại hình thi công"
                          name="designed"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn loại hình!",
                            },
                          ]}
                        >
                          <Radio.Group>
                            <Radio value={false}>
                              Thiết kế và thi công hồ cá Koi
                            </Radio>
                            <Radio value={true}>
                              Thi công hồ cá Koi theo mẫu
                            </Radio>
                          </Radio.Group>
                        </FormItem>
                      </Col>
                    ) : (
                      <Col span={24}>
                        <FormItem
                          label="Loại hình dịch vụ"
                          name="warranted"
                          labelCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn loại hình!",
                            },
                          ]}
                        >
                          <Radio.Group>
                            <Radio value={true}>Bảo hành</Radio>
                            <Radio value={false}>Bảo dưỡng</Radio>
                          </Radio.Group>
                        </FormItem>
                      </Col>
                    ))}
                  <Col span={24}>
                    <FormItem
                      label="Nội dung yêu cầu"
                      name="customerDescription"
                      labelCol={{ span: 24 }}
                    >
                      <TextArea placeholder="Nội dung yêu cầu" />
                    </FormItem>
                  </Col>
                </Row>
                <Button htmlType="submit">Gửi yêu cầu</Button>
                <p style={{ margin: "10px 0px" }}>
                  *Thường phản hồi trong vòng 24h làm việc
                </p>
              </Form>
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
      )}
    </CommonPageTemplate>
  );
}

export default ContactPage;
