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
  const [freeConstructors, setFreeConstructors] = useState([]);
  const [freeDesigners, setFreeDesigners] = useState([]);
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

  const handleClick = () => {
    navigate(`/price-list-staff`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div>
      <div>
        <h1>THÔNG TIN ĐƠN HÀNG</h1>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={8}>
              <label>Họ tên</label>
              <div className="display-input">
                <span> {constructionOrder.customerName}</span>
              </div>
            </Col>
            <Col span={8}>
              <label>Số điện thoại</label>
              <div className="display-input">
                <span> {constructionOrder.customerPhone}</span>
              </div>
            </Col>
            <Col span={8}>
              <label>Email</label>
              <div className="display-input">
                <span> {constructionOrder.customer.account.email}</span>
              </div>
            </Col>
            <Col span={24}>
              <label>Địa chỉ thi công</label>
              <div className="display-input">
                <span> {constructionOrder.pondAddress}</span>
              </div>
            </Col>
            <Col span={10}>
              <label>Trạng thái</label>
              <div className="display-input">
                <span> {constructionOrder.statusDescription}</span>
              </div>
            </Col>
            <Col span={7}>
              <label>Gói</label>
              <div className="display-input">
                <span> Trần Kim Nhã</span>
              </div>
            </Col>
            <Col span={7}>
              <label>Thể tích hồ</label>
              <div className="display-input">
                <span> {constructionOrder.quotationResponse.pondVolume}</span>
              </div>
            </Col>
          </Row>
        </Form>
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
                <span>{constructionOrder.consultantAccount.name}</span>
              </div>
              <Form.Item label="Nhà thiết kế">
                {constructionOrder.designed ? (
                  <div className="display-input">
                    <span>{constructionOrder.designer || "-"}</span>
                  </div>
                ) : actor === "manager" ? (
                  <Select placeholder="Chọn nhà thiết kế">
                    {freeDesigners.map((designer) => (
                      <Select.Option key={designer.id} value={designer.id}>
                        {designer.name}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <div className="display-input">
                    <span>{constructionOrder.designer || "-"}</span>
                  </div>
                )}
              </Form.Item>

              <Form.Item label="Người chịu trách nhiệm thi công">
                {actor === "manager" ? (
                  <Select placeholder="Chọn người thi công">
                    {freeConstructors.map((constructor) => (
                      <Select.Option
                        key={constructor.id}
                        value={constructor.id}
                      >
                        {constructor.name}
                      </Select.Option>
                    ))}
                  </Select>
                ) : (
                  <div className="display-input">
                    <span>{constructionOrder.responsiblePerson || "-"}</span>
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
                        "https://sgl.com.vn/wp-content/uploads/2020/04/ban-ve-ho-ca-koi-dep-e1599281683641-802x451.jpg"
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
                onClick={() => handleClick()}
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
  );
}
export default OrderCustomer;
