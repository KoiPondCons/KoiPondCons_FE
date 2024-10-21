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
import OrderInfor from "../../components/order-information";
function Order() {
  const navigate = useNavigate();
  const location = useLocation();
  const { actor } = location.state;
  const { id } = useParams();
  const [constructionOrder, setConstructionOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [freeConstructors, setFreeConstructors] = useState([]);
  const [freeDesigners, setFreeDesigners] = useState([]);
  const [selectedDesigner, setSelectedDesigner] = useState();
  const [selectedConstructor, setSelectedConstructor] = useState();

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
    console.log("Data table:");
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

  const handleAssignConstructor = async () => {
    if (selectedConstructor) {
      await api.put(
        `orders/constructor/${constructionOrder.id}/${selectedConstructor}`
      );
      console.log("Lưu constructor với ID:", selectedConstructor);
      fetchConstructionOrder();
    } else {
      alert("Vui lòng chọn nhà thiết kế");
    }
  };
  const handleAssignDesigner = async () => {
    const value = {
      designerAccount: selectedDesigner,
      designFile: "N/A",
      status: "DESIGNING",
    };

    if (selectedDesigner) {
      await api.put(
        `design-drawings/${constructionOrder.designDrawingResponse.id}`,
        value
      );
      console.log("Lưu designer với ID:", selectedDesigner);
      fetchConstructionOrder();
    } else {
      alert("Vui lòng chọn nhà thiết kế");
    }
  };
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
        return record.paid ? (
          <>
            Đã thanh toán vào lúc{" "}
            {moment(record.paidAt).format("DD/MM/YYYY HH:mm:ss")}
          </>
        ) : (
          <p>Chưa thanh toán</p>
        );
      },
    },
  ];
  return (
    <NavDashboard actor={actor}>
      <div>
        <OrderInfor constructionOrder={constructionOrder} />
        <h1>ĐẢM NHẬN VÀ TIẾN ĐỘ THI CÔNG</h1>
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
                {constructionOrder.quotationResponse?.status !==
                "CUSTOMER_CONFIRMED" ? (
                  <div className="display-input">
                    <span>Chờ hoàn thành báo giá</span>
                  </div>
                ) : constructionOrder.designed ||
                  constructionOrder.designDrawingResponse?.designerAccount
                    ?.name ? (
                  <div className="display-input">
                    <span>
                      {constructionOrder.designDrawingResponse?.designerAccount
                        ?.name || "N/A"}
                    </span>
                  </div>
                ) : actor === "manager" ? (
                  <div>
                    <Select
                      placeholder="Chọn nhà thiết kế"
                      onChange={(value) => setSelectedDesigner(value)} // Hàm để lưu lựa chọn tạm thời
                    >
                      {freeDesigners.map((designer) => (
                        <Select.Option key={designer.id} value={designer.id}>
                          {designer.name}
                        </Select.Option>
                      ))}
                    </Select>
                    <button onClick={handleAssignDesigner}>Lưu</button>
                  </div>
                ) : (
                  <div className="display-input">
                    <span>
                      {constructionOrder.designDrawingResponse?.designerAccount
                        ?.name || "N/A"}
                    </span>
                  </div>
                )}
              </Form.Item>

              <Form.Item label="Người chịu trách nhiệm thi công">
                {constructionOrder?.designDrawingResponse?.status !==
                "CUSTOMER_CONFIRMED" ? (
                  <div className="display-input">
                    <span>Chờ hoàn thành thiết kế</span>
                  </div>
                ) : constructionOrder.constructorAccount?.name ? (
                  <div className="display-input">
                    <span>
                      {constructionOrder.constructorAccount.name || "N/A"}
                    </span>
                  </div>
                ) : actor === "manager" ? (
                  <div>
                    <Select
                      placeholder="Chọn người thi công"
                      onChange={(value) => setSelectedConstructor(value)}
                    >
                      {freeConstructors.map((constructor) => (
                        <Select.Option
                          key={constructor.id}
                          value={constructor.id}
                        >
                          {constructor.name}
                        </Select.Option>
                      ))}
                    </Select>
                    <button onClick={() => handleAssignConstructor()}>
                      Lưu
                    </button>
                  </div>
                ) : (
                  <div className="display-input">
                    <span>
                      {constructionOrder.constructorAccount?.name || "N/A"}
                    </span>
                  </div>
                )}
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
              <div className="display-input">
                {
                  <AiOutlineFile
                    style={{
                      fontSize: "20px",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      navigate(`/consulting/price-list-staff/${id}`, {
                        state: { actor },
                      })
                    }
                  />
                }
              </div>
            </Col>
          </Row>
        </Form>
        <Table
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
    </NavDashboard>
  );
}
export default Order;
