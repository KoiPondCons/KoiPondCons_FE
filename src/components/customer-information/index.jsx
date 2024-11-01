import { Col, Row, Spin, Button, Input } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../utils/common.css";
import { LoadingOutlined } from "@ant-design/icons";
import api from "../../config/axios";
import { LiaUserEditSolid } from "react-icons/lia";
import LoadingPage from "../loading";

function CustomerInformation({
  constructionOrder,
  userRole,
  onFetchCustomerData,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const handleEdit = () => {
    setEditedData({
      name: constructionOrder.name,
      phone: constructionOrder.phone,
      email: constructionOrder.email,
      address: constructionOrder.address,
    });
    setIsEditing(true);
  };
  const handleInputChange = (field, value) => {
    setEditedData({
      ...editedData,
      [field]: value,
    });
  };
  const handleSave = async () => {
    try {
      await api.put(`${constructionOrder.id}`, editedData);
      setIsEditing(false);
      onFetchCustomerData();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
    }
  };

  if (!constructionOrder) {
    return <Spin indicator={<LoadingPage />} />;
  }

  const displayValue = (value) => value || "N/A";

  return (
    <div style={{ margin: "0 3%", backgroundColor: "#fff" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center", paddingTop: "10px" }}>
          THÔNG TIN KHÁCH HÀNG
        </h1>
        {userRole === "manager" && !isEditing && (
          <Button type="primary" onClick={handleEdit}>
            <LiaUserEditSolid />
            Chỉnh sửa
          </Button>
        )}
      </div>
      <Row gutter={24}>
        <Col span={8}>
          <label>Họ tên</label>
          <div className="display-input">
            {isEditing ? (
              <Input
                value={editedData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            ) : (
              <span>{displayValue(constructionOrder.name)}</span>
            )}
          </div>
        </Col>
        <Col span={8}>
          <label>Số điện thoại</label>
          <div className="display-input">
            {isEditing ? (
              <Input
                value={editedData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
              />
            ) : (
              <span>{displayValue(constructionOrder.phone)}</span>
            )}
          </div>
        </Col>
        <Col span={8}>
          <label>Email</label>
          <div className="display-input">
            {isEditing ? (
              <Input
                value={editedData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            ) : (
              <span>{displayValue(constructionOrder.email)}</span>
            )}
          </div>
        </Col>
        <Col span={24}>
          <label>Địa chỉ</label>
          <div className="display-input">
            {isEditing ? (
              <Input
                value={editedData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            ) : (
              <span>{displayValue(constructionOrder.address)}</span>
            )}
          </div>
        </Col>
      </Row>
      {isEditing && (
        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <Button
            onClick={() => setIsEditing(false)}
            style={{ marginRight: "10px" }}
          >
            Hủy
          </Button>
          <Button type="primary" onClick={handleSave}>
            Lưu
          </Button>
        </div>
      )}
    </div>
  );
}

CustomerInformation.propTypes = {
  customer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  onFetchCustomerData: PropTypes.func.isRequired,
};

export default CustomerInformation;
