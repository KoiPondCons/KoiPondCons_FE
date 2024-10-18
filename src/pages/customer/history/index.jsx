import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import "./index.css";
import { IoDocumentTextOutline } from "react-icons/io5";
import CommonPageTemplate from "../../../components/common-page-template";
import api from "../../../config/axios";
import { Link } from "react-router-dom";
import moment from "moment";
function HistoryPage() {
  const title = "Lịch sử đơn hàng";
  const context = "Trang chủ »  Lịch sử đơn hàng";
  const banner =
    "https://images.unsplash.com/photo-1627884849665-8c74468f6037?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [constructionOrders, setConstructionOrders] = useState();
  const fecthConstructionOrders = async () => {
    try {
      const response = await api.get("orders/customer");
      setConstructionOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error at fecthConstructionOrders", error);
    }
  };
  useEffect(() => {
    fecthConstructionOrders();
  }, []);
  return (
    <div>
      <CommonPageTemplate title={title} context={context} banner={banner} >
        <div className="history-page-container" >
          <Card style={{ borderRadius: "20px" }}
            title={<h1 style={{ textAlign: "center", margin: "20px 0" }}>Lịch sử đơn hàng</h1>}
          >
            {constructionOrders && constructionOrders.length > 0 ? (
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
                        {constructionOrder.status !== "REQUESTED" &&
                          constructionOrder.consultantAccount ? (
                          <p>
                            Số tư vấn viên:{" "}
                            {constructionOrder.consultantAccount.phone}
                          </p>
                        ) : (
                          <p>
                            Số tư vấn viên: Chưa có tư vấn viên được chỉ định
                          </p>
                        )}
                        <time dateTime={constructionOrder.requestDate}>
                          Ngày gửi đơn:{" "}
                          {moment(constructionOrder.requestDate).format(
                            "DD/MM/YYYY"
                          )}
                        </time>
                      </div>
                    </Col>
                    <Col span={4} >
                      <button
                        style={{
                          backgroundColor: "#000",  
                          border: "none",
                        }}
                      >
                        Hủy đơn
                      </button>
                      <button>
                        {constructionOrder.consultantAccount && (
                          <Link
                            to={{
                              pathname: `/order/${constructionOrder.id}`,
                              state: "customer",
                            }}
                            style={{
                              color: "#007bff",
                            }}
                          >
                            Chi tiết
                          </Link>
                        )}
                      </button>
                    </Col>
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
      </CommonPageTemplate>
    </div>
  );
}

export default HistoryPage;
