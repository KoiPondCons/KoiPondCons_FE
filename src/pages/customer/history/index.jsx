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
  const [order, setOrder] = useState();
  const [isModalConstructionOpen, setIsModalConstructionOpen] = useState(false);
  const [isModalMaintenanceOpen, setIsModalMaintenanceOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState();
  const fecthConstructionOrders = async () => {
    setLoading(true);
    try {
      const maintenanceOrder = await api.get("maintenance/customer");
      const constructionOrder = await api.get("orders/customer");
      const order = [
        ...maintenanceOrder.data.map((req) => ({
          ...req,
          serviceType: "Dịch vụ",
        })),
        ...constructionOrder.data.map((req) => ({
          ...req,
          serviceType: "Thi công",
        })),
      ];
      order.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
      setOrder(order);
      console.log(maintenanceOrder.data);
      console.log(constructionOrder.data);
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
        customerName: order?.customerName,
        customerPhone: order?.customerPhone,
        customerEmail: order?.customerEmail,
        pondAddress: order?.pondAddress,
        designed: order?.designed,
      };
      await api.put(`orders/${id}`, value);
      console.log("Delete successfully");
      fecthConstructionOrders();
    } catch (error) {
      console.error(error);
    }
  };
  const renderButtons = (order) => {
    if (order.serviceType === "Thi công") {
      if (order?.quotationResponse?.status === "CUSTOMER_PENDING") {
        return (
          <Button
            className="btn"
            onClick={() => {
              navigate(`/price-list/${order.id}`, {
                state: "customer",
              });
            }}
          >
            Duyệt báo giá
          </Button>
        );
      }
      if (order?.status === "REQUESTED" || order?.status === "PROCESSING") {
        return (
          <Button
            className="btn"
            onClick={() => {
              setSelectedOrderId(order.id);
              setIsModalConstructionOpen(true);
            }}
          >
            Hủy đơn
          </Button>
        );
      }

      if (order?.designDrawingResponse?.status === "CUSTOMER_PENDING") {
        return (
          <Button
            className="btn"
            onClick={() => {
              navigate(`/design-review/${order.id}`, {
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
            navigate(`/order/${order.id}`, {
              state: "customer",
            });
          }}
        >
          Chi tiết
        </Button>
      );
    } else if (order.serviceType === "Dịch vụ") {
      if (order?.status === "REQUESTED" || order?.status === "PENDING") {
        return (
          <Button
            className="btn"
            onClick={() => {
              setSelectedOrderId(order.id);
              setIsModalMaintenanceOpen(true);
            }}
          >
            Hủy đơn
          </Button>
        );
      } else if (order?.status === "PROCESSING") {
        return (
          <Button
            className="btn"
            onClick={() => {
              navigate(`/maintenance-detail/${order.id}`, {
                state: { actor: "customer" },
              });
            }}
          >
            Chi tiết
          </Button>
        );
      } else if (order?.status === "PROCESSED") {
        return (
          <>
            <Button
              className="btn"
              onClick={() => {
                navigate(`/maintenance-detail/${order.id}`, {
                  state: { actor: "customer" },
                });
              }}
            >
              Thanh toán
            </Button>
          </>
        );
      }
    }
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
            ) : order && order.length > 0 ? (
              order.map((constructionOrder) => (
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
                    <Col
                      span={4}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IoDocumentTextOutline size={100} />
                    </Col>
                    <Col span={16}>
                      <div className="history-construction-order-info">
                        <p>Mã đơn: {constructionOrder.id}</p>
                        <p>Loại: {constructionOrder.serviceType}</p>
                        <p>
                          Trạng thái: {constructionOrder?.statusDescription}
                        </p>
                        <p>
                          Số tư vấn viên:{" "}
                          {constructionOrder?.consultantAccount?.phone ||
                            "Chưa có tư vấn viên được chỉ định"}
                        </p>
                        <p>Địa chỉ: {constructionOrder?.pondAddress}</p>
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
          open={isModalConstructionOpen}
          onOk={() => {
            handleDeleteOrder(selectedOrderId);
            setIsModalConstructionOpen(false);
          }}
          onCancel={() => setIsModalConstructionOpen(false)}
        >
          <p>Bạn có chắc chắn muốn hủy đơn hàng?</p>
        </Modal>
        <Modal
          title="Hủy đơn hàng"
          open={isModalMaintenanceOpen}
          onOk={() => {
            handleDeleteOrder(selectedOrderId);
            setIsModalMaintenanceOpen(false);
          }}
          onCancel={() => setIsModalMaintenanceOpen(false)}
        >
          <p>Bạn có chắc chắn muốn hủy đơn hàng ?</p>
        </Modal>
      </CommonPageTemplate>
    </div>
  );
}

export default HistoryPage;
