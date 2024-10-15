import { Col, Row } from "antd";
import React from "react";
import PropTypes from "prop-types";
import "../../utils/common.css";
function OrderInfor({ constructionOrder }) {
  return (
    <div style={{ margin: "0 3%", backgroundColor: "#FFFFFF" }}>
      <h1 style={{ textAlign: "center", paddingTop: "10px" }}>
        THÔNG TIN ĐƠN HÀNG
      </h1>
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
            <span> {constructionOrder.customer?.account?.email || "N/A"}</span>
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
            <span>
              {" "}
              {constructionOrder.quotationResponse?.combo?.name || "N/A"}
            </span>
          </div>
        </Col>
        <Col span={7}>
          <label>Thể tích hồ</label>
          <div className="display-input">
            <span>
              {" "}
              {constructionOrder.quotationResponse?.pondVolume || "N/A"}
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
OrderInfor.propTypes = {
  constructionOrder: PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    customerPhone: PropTypes.string.isRequired,
    customer: PropTypes.shape({
      account: PropTypes.shape({
        email: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    pondAddress: PropTypes.string.isRequired,
    statusDescription: PropTypes.string.isRequired,
    quotationResponse: PropTypes.shape({
      combo: PropTypes.shape({
        name: PropTypes.string,
      }),
      pondVolume: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
export default OrderInfor;
