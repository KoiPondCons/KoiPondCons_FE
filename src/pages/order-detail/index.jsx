import { Col, Form, Input, Modal, Popover, Row, Table } from "antd";
import React, { useEffect, useState } from "react";
import { Progress } from "antd";
import api from "../../config/axios";
import "./index.css";
import NavDashboard from "../../components/navbar-dashboard";
import { useNavigate, useParams } from "react-router-dom";
import "../../components/table/index.css";
import { AiOutlineFile } from "react-icons/ai";
import { RiDraftLine } from "react-icons/ri";
function Order() {
  const { id } = useParams();
  const [constructionOrder, setConstructionOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const showModal = (src) => {
    console.log("Modal is opening with image source:", src);
    setImageSrc(src);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/price-list-staff`);
  };
  useEffect(() => {
    const fetchConstructionOrder = async () => {
      try {
        const response = await api.get(`orders/${id}`);
        setConstructionOrder(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConstructionOrder();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <NavDashboard actor="consulting">
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
                <span> {constructionOrder.customerEmail}</span>
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
                <span> {constructionOrder.pon}</span>
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
              <a className="more-detail" href="">
                Xem chi tiết
              </a>
            </Col>
            <Col span={20}>
              <label>Tư vấn viên</label>
              <div className="display-input">
                <span>{constructionOrder.accountNonExpir}</span>
              </div>
              <label>Nhà thiết kế</label>
              <div className="display-input">
                <span> Trần Kim Nhã</span>
              </div>
              <label>Chịu trách nhiệm thi công</label>
              <div className="display-input">
                <span> Trần Kim Nhã</span>
              </div>
            </Col>
            <Col span={8}>
              <label>Ngày tiếp nhận</label>
              <div className="display-input">
                <span>{constructionOrder.request_date}</span>
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
    </NavDashboard>
  );
}
export default Order;
