import React, { useEffect, useState } from "react";
import { Button, Card, Col, Modal, Row, Spin } from "antd";
import "./index.css";
import { IoDocumentTextOutline } from "react-icons/io5";
import CommonPageTemplate from "../../../components/common-page-template";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";
function HistoryPage() {
  const title = "Lịch sử đơn hàng";
  const context = "Trang chủ »  Lịch sử đơn hàng";
  const banner =
    "https://images.unsplash.com/photo-1627884849665-8c74468f6037?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const navigate = useNavigate();
  const [constructionOrders, setConstructionOrders] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState();
  const fecthConstructionOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("orders/customer");
      setConstructionOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error at fecthConstructionOrders", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fecthConstructionOrders();
  }, []);
  const handleDeleteOrder = async (id) => {
    try {
      const value = {
        status: "CANCELED",
        customerName: constructionOrders.customerName,
        customerPhone: constructionOrders.customerPhone,
        customerEmail: constructionOrders.customerEmail,
        pondAddress: constructionOrders.pondAddress,
        designed: constructionOrders.designed,
      };
      await api.put(`orders/${id}`, value);
      console.log("Delete successfully");
      fecthConstructionOrders();
    } catch (error) {
      console.error(error);
    }
  };
  const renderButtons = (constructionOrder) => {
    if (constructionOrder.quotationResponse.status === "CUSTOMER_PENDING") {
      return (
        <Button
          className="btn"
          onClick={() => {
            navigate(`/price-list/${constructionOrder.id}`, {
              state: "customer",
            });
          }}
        >
          Duyệt báo giá
        </Button>
      );
    }
    if (
      constructionOrder.status === "REQUESTED" ||
      constructionOrder.status === "PROCESSING"
    ) {
      return (
        <Button
          className="btn"
          onClick={() => {
            setSelectedOrderId(constructionOrder.id);
            setIsModalOpen(true);
          }}
        >
          Hủy đơn
        </Button>
      );
    }

    if (constructionOrder.designDrawingResponse.status === "CUSTOMER_PENDING") {
      return (
        <Button
          className="btn"
          onClick={() => {
            navigate(`/design-review/${constructionOrder.id}`, {
              state: { actor: "customer" },
            });
          }}
        >
          Duyệt thiết kế
        </Button>
      );
    }
    return (
      <Button
        className="btn"
        onClick={() => {
          navigate(`/order/${constructionOrder.id}`, {
            state: "customer",
          });
        }}
      >
        Chi tiết
      </Button>
    );
  };
  return (
    <div>
      <CommonPageTemplate title={title} context={context} banner={banner}>
        <div className="history-page-container">
          <Card
            style={{ borderRadius: "20px" }}
            title={
              <h1 style={{ textAlign: "center", margin: "20px 0" }}>
                Lịch sử đơn hàng
              </h1>
            }
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "40vh",
                }}
              >
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 48 }} />}
                />
              </div>
            ) : constructionOrders && constructionOrders.length > 0 ? (
              constructionOrders.map((constructionOrder) => (
                <Card
                  key={constructionOrder.id}
                  style={{
                    backgroundColor: "#f0f4f8",
                    borderRadius: "8px",
                    padding: "30px",
                    marginBottom: "16px",
                  }}
                >
                  <Row>
                    <Col span={4}>
                      <IoDocumentTextOutline size={100} />
                    </Col>
                    <Col span={16}>
                      <div className="history-construction-order-info">
                        <p>Mã đơn: {constructionOrder.id}</p>
                        <p>Trạng thái: {constructionOrder.statusDescription}</p>
                        <p>
                          Số tư vấn viên:{" "}
                          {constructionOrder?.consultantAccount?.phone ||
                            "Chưa có tư vấn viên được chỉ định"}
                        </p>
                        <time dateTime={constructionOrder.requestDate}>
                          Ngày gửi đơn:{" "}
                          {moment(constructionOrder.requestDate).format(
                            "DD/MM/YYYY"
                          )}
                        </time>
                      </div>
                    </Col>
                    <Col span={4}>{renderButtons(constructionOrder)}</Col>
                  </Row>
                </Card>
              ))
            ) : (
              <h3 style={{ textAlign: "center" }}>
                Không có đơn nào để hiển thị.
              </h3>
            )}
          </Card>
        </div>
        <Modal
          title="Hủy đơn hàng"
          open={isModalOpen}
          onOk={() => {
            handleDeleteOrder(selectedOrderId);
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        >
          <p>Bạn có chắc chắn muốn hủy đơn hàng?</p>
        </Modal>
      </CommonPageTemplate>
    </div>
  );
}

export default HistoryPage;
