import { Col, Form, Input, Modal, Popover, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Progress } from "antd";
import api from "../../config/axios";
import "./index.css";
import NavDashboard from "../../components/navbar-dashboard";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../components/table/index.css";
import { AiOutlineFile } from "react-icons/ai";
import { RiDraftLine } from "react-icons/ri";
import moment from "moment";
import Header from "../../components/header";
import Footer from "../../components/footer";
import OrderInfor from "../../components/order-information";
function OrderCustomer() {
  const navigate = useNavigate();
  const location = useLocation();
  const actor = location.state;
  const { id } = useParams();
  const [constructionOrder, setConstructionOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const fecthFreeConstructors = async () => {
    try {
      const response = await api.get("account/free-constructors");
      setFreeConstructors(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Bug at fecthFreeConstructors, " + error);
    }
  };
  const fecthFreeDesigners = async () => {
    try {
      const response = await api.get("account/free-designers");
      setFreeDesigners(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Bug at fecthFreeDesigners, " + error);
    }
  };
  const fetchConstructionOrder = async () => {
    try {
      const response = await api.get(`orders/${id}`);
      setConstructionOrder(response.data);
      console.log(response.data);
      console.log(actor);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchConstructionOrder();
    fecthFreeConstructors();
    fecthFreeDesigners();
  }, [id]);
  const showModal = (src) => {
    console.log("Modal is opening with image source:", src);
    setImageSrc(src);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  const finalPrice = "800000000";
  const columns = [
    {
      title: "Các đợt thanh toán",
      dataIndex: "paymentPhase",
      key: "paymentPhase",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Số tiền cần thanh toán",
      dataIndex: "amount",
      key: "amount",
    },
  ];
  const data = [];
  if (constructionOrder.isDesigned) {
    data.push(
      {
        key: "1",
        paymentPhase: "Đợt thanh toán 1",
        content: "Thanh toán để bắt đầu thi công",
        amount: (finalPrice * 0.5).toLocaleString("vi-VN") + " VND",
      },
      {
        key: "2",
        paymentPhase: "Đợt thanh toán 2",
        content: "Thanh toán bàn giao hồ cá",
        amount: (finalPrice * 0.5).toLocaleString("vi-VN") + " VND",
      }
    );
  } else {
    data.push(
      {
        key: "1",
        paymentPhase: "Đợt thanh toán 1",
        content: "Thanh toán để bắt đầu thiết kế bản vẽ hồ cá",
        amount: (finalPrice * 0.2).toLocaleString("vi-VN") + " VND",
      },
      {
        key: "2",
        paymentPhase: "Đợt thanh toán 2",
        content: "Thanh toán để bắt đầu thi công",
        amount: (finalPrice * 0.3).toLocaleString("vi-VN") + " VND",
      },
      {
        key: "3",
        paymentPhase: "Đợt thanh toán 3",
        content: "Thanh toán bàn giao hồ cá",
        amount: (finalPrice * 0.5).toLocaleString("vi-VN") + " VND",
      }
    );
  }
  return (
    <div>
      <Header />
      <div style={{ backgroundColor: "white" ,padding:"30px 10%"}}>
        <div>
          <OrderInfor constructionOrder={constructionOrder} />
          <h1 style={{textAlign:"center",margin:"40px 0 10px"}}>ĐẢM NHẬN VÀ TIẾN ĐỘ THI CÔNG</h1>
          <Form layout="vertical">
            <Row gutter={24}>
              <Col span={4}>
                <div className="progress">
                  <Progress type="circle" percent={80} />
                </div>
                <h3
                  style={{ textAlign: "center", margin: " 20px 20px 0px 20px" }}
                >
                  Tiến độ
                </h3>
                <Link to="/construction" className="more-detail">
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
          <h1 style={{textAlign:"center",margin:"40px 0"}}>Thanh toán</h1>
          <Table columns={columns} dataSource={data} />
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
