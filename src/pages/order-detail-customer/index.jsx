import { Button, Col, Form, Modal, Row, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "antd";
import api from "../../config/axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../components/table/index.css";
import "./order.css";
import { AiOutlineFile } from "react-icons/ai";
import { RiDraftLine } from "react-icons/ri";
import moment from "moment";
import Header from "../../components/header";
import Footer from "../../components/footer";
import OrderInfor from "../../components/order-information";
import LoadingPage from "../../components/loading";

function OrderCustomer() {
  const navigate = useNavigate();
  const location = useLocation();
  const actor = location.state;
  const paymentSectionRef = useRef(null);
  const { id } = useParams();
  const [constructionOrder, setConstructionOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const fetchConstructionOrder = async () => {
    try {
      const response = await api.get(`orders/${id}`);
      setConstructionOrder(response.data);
      console.log(response.data);
      console.log("Actor ở đây là:" + actor);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchConstructionOrder();
  }, [id]);
  useEffect(() => {
    if (location.state?.scrollToPayment && paymentSectionRef.current) {
      paymentSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [constructionOrder]);
  const showModal = (src) => {
    console.log("Modal is opening with image source:", src);
    setImageSrc(src);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handlePayment = async (paymentId) => {
    try {
      const linkPayment = await api.post(`submitOrder/${paymentId}`);
      window.location.href = linkPayment.data;
    } catch (error) {
      console.error("Payment error: ", error);
    }
  };
  if (loading) return <LoadingPage />;
  if (error) return <div>Error fetching data: {error.message}</div>;
  const columns = [
    {
      title: "Các đợt thanh toán",
      dataIndex: "period",
      key: "period",
      align: "center",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      align: "center",
    },
    {
      title: "Số tiền cần thanh toán",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: "Thanh toán",
      align: "center",
      render: (record) => {
        const paymentList = constructionOrder.consOrderPaymentList || [];

        const firstPayment = paymentList.find((p) => p.period === 1);
        const secondPayment = paymentList.find((p) => p.period === 2);
        const thirdPayment = paymentList.find((p) => p.period === 3);

        const isFirstPeriodPaid = firstPayment?.paid;
        const isSecondPeriodPaid = secondPayment?.paid;
        const isThirdPeriodPaid = thirdPayment?.paid;
        const isCustomerApprovedDesign =
          constructionOrder.designDrawingResponse.status ===
          "CUSTOMER_CONFIRMED";
        const isOrderConstructed =
          constructionOrder.status === "CONSTRUCTED" ||
          constructionOrder.status === "FINISHED" ||
          constructionOrder.status === "CLOSED";
        return constructionOrder.designed ? (
          <div>
            {record.period === 1 &&
              (isFirstPeriodPaid ? (
                <>
                  Đã thanh toán vào lúc{" "}
                  {moment(firstPayment.paidAt).format("DD/MM/YYYY HH:mm:ss")}
                </>
              ) : (
                <Button
                  type="primary"
                  onClick={() => handlePayment(firstPayment.id)}
                >
                  Thanh toán đợt 1
                </Button>
              ))}
            {record.period === 2 &&
              (isFirstPeriodPaid && isOrderConstructed ? (
                isSecondPeriodPaid ? (
                  <>
                    Đã thanh toán vào lúc{" "}
                    {moment(secondPayment.paidAt).format("DD/MM/YYYY HH:mm:ss")}
                  </>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => handlePayment(secondPayment.id)}
                  >
                    Thanh toán đợt 2
                  </Button>
                )
              ) : (
                <span>Chờ bàn giao công trình</span>
              ))}
          </div>
        ) : (
          <div>
            {record.period === 1 &&
              (isFirstPeriodPaid ? (
                <>
                  Đã thanh toán vào lúc{" "}
                  {moment(firstPayment.paidAt).format("DD/MM/YYYY HH:mm:ss")}
                </>
              ) : (
                <Button
                  type="primary"
                  onClick={() => handlePayment(firstPayment.id)}
                >
                  Thanh toán đợt 1
                </Button>
              ))}

            {record.period === 2 &&
              (isFirstPeriodPaid && isCustomerApprovedDesign ? (
                isSecondPeriodPaid ? (
                  <>
                    Đã thanh toán vào lúc{" "}
                    {moment(secondPayment.paidAt).format("DD/MM/YYYY HH:mm:ss")}
                  </>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => handlePayment(secondPayment.id)}
                  >
                    Thanh toán đợt 2
                  </Button>
                )
              ) : (
                <span>Chờ xác nhận thiết kế từ khách hàng</span>
              ))}

            {record.period === 3 &&
              (isSecondPeriodPaid && isOrderConstructed ? (
                isThirdPeriodPaid ? (
                  <>
                    Đã thanh toán vào lúc{" "}
                    {moment(thirdPayment.paidAt).format("DD/MM/YYYY HH:mm:ss")}
                  </>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => handlePayment(thirdPayment.id)}
                  >
                    Thanh toán đợt 3
                  </Button>
                )
              ) : (
                <span>Chờ bàn giao công trình</span>
              ))}
          </div>
        );
      },
    },
  ];
  return (
    <div
      style={{
        background:
          "linear-gradient(rgba(199, 209, 217, 0.9), rgba(199, 209, 217, 0.9)), " +
          "linear-gradient(rgba(1, 0, 0, 0.16), rgba(8, 0, 0, 0.16)), " +
          "url('https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/360_F_277309825_h8RvZkoyBGPDocMtippdfe3497xTrOXO.jpg?alt=media&token=d7d55fab-e34f-483f-9125-b61b199abbf2')",
      }}
    >
      <Header />
      <div
        style={{
          backgroundColor: "white",
          padding: "30px 0",
          margin: "0px 15%",
        }}
      >
        <div>
          <OrderInfor constructionOrder={constructionOrder} />
          <h1 style={{ textAlign: "center", margin: "40px 0 10px" }}>
            ĐẢM NHẬN VÀ TIẾN ĐỘ THI CÔNG
          </h1>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={4}>
                <div className="progress">
                  <Progress
                    type="circle"
                    percent={
                      constructionOrder?.constructionProgress == "NaN"
                        ? 0
                        : constructionOrder?.constructionProgress
                    }
                  />
                </div>
                <h3
                  style={{ textAlign: "center", margin: " 20px 20px 0px 20px" }}
                >
                  Tiến độ
                </h3>
                <Link
                  onClick={() => {
                    navigate(
                      `/history/progress-construction-customer/${constructionOrder.id}`
                    );
                  }}
                  className="more-detail"
                >
                  Xem chi tiết
                </Link>
              </Col>

              <Col span={20}>
                <label>Tư vấn viên</label>
                <div className="display-input">
                  <span>
                    {constructionOrder.consultantAccount?.name || "N/A"}
                  </span>
                </div>
                <Form.Item label="Nhà thiết kế">
                  <div className="display-input">
                    <span>
                      {constructionOrder.designDrawingResponse?.designerAccount
                        ?.name || "N/A"}
                    </span>
                  </div>
                </Form.Item>

                <Form.Item label="Người chịu trách nhiệm thi công">
                  <div className="display-input">
                    <span>
                      {constructionOrder.constructorAccount?.name || "N/A"}
                    </span>
                  </div>
                </Form.Item>
              </Col>
              <Col span={8}>
                <label>Ngày tiếp nhận</label>
                <div className="display-input">
                  <span>
                    {moment(constructionOrder.requestDate).format("DD/MM/YYYY")}
                  </span>
                </div>
              </Col>
              <Col span={8}>
                <label>Bản vẽ thiết kế</label>
                <div className="display-input">
                  {
                    <RiDraftLine
                      style={{ fontSize: "20px" }}
                      onClick={() =>
                        showModal(
                          `${constructionOrder.designDrawingResponse?.designFile}`
                        )
                      }
                    />
                  }
                </div>
              </Col>
              <Col span={8}>
                <label>Bảng báo giá và chi tiết hạng mục</label>
                <div
                  className="display-input"
                  onClick={() =>
                    navigate(`/price-list/${id}`, {
                      state: { actor },
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  {
                    <AiOutlineFile
                      style={{ fontSize: "20px", textAlign: "center" }}
                    />
                  }
                </div>
              </Col>
            </Row>
          </Form>
          <h1
            ref={paymentSectionRef}
            style={{ textAlign: "center", margin: "40px 0" }}
          >
            Thanh toán
          </h1>
          <Table
            style={{ margin: "0px 5%" }}
            columns={columns}
            dataSource={constructionOrder.consOrderPaymentList}
            pagination={false}
          />
        </div>
        <Modal
          title="Hình ảnh thiết kế"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
          <img
            alt="Design"
            src={imageSrc}
            style={{ width: "100%", height: "auto" }}
          />
        </Modal>
      </div>
      <Footer />
    </div>
  );
}
export default OrderCustomer;
