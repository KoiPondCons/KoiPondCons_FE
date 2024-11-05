import React, { useEffect, useState } from "react";
import OrderInfor from "../../../components/order-information";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import NavDashboard from "../../../components/navbar-dashboard";
import FormItem from "antd/es/form/FormItem";
import api from "../../../config/axios";
function ApproveOrder() {
  const [form] = Form.useForm();
  const location = useLocation();
  const { actor, order } = location.state;
  const navigate = useNavigate();
  const typeMaintenance = order.warranted ? "Bảo hành" : "Bảo dưỡng";
  useEffect(() => {
    console.log(actor);

    console.log(order);
  }, []);
  const handleCanceledOrder = async () => {
    if (order.serviceType === "maintenance") {
      order.status = "CANCELED";
      console.log(order);
      await api.put(`maintenance/set-consultant/${order.id}`);
      await api.put(`maintenance/${order.id}`, order);
    } else {
      order.status = "CANCELED";
      console.log(order);
      await api.put(`orders/consultant/${order.id}`, order);
      await api.put(`orders/${order.id}`, order);
    }
  };
  const handleApprovedOrder = async () => {
    try {
      const values = await form.validateFields();
      // order.pondAddress = values.pondAddress;
      // order.pondVolume =
      //   values.pondVolumeMaintenance || values.ponVolumeConstruction;
      order.status = "PROCESSING";

      if (order.serviceType === "maintenance") {
        await api.put(`maintenance/${order.id}`, order);
        navigate(`/consulting`, {
          state: { actor: "consulting" },
        });
      } else {
        await api.put(`orders/${order.id}`, order);
        navigate(`/consulting/price-list-staff/${order.id}`, {
          state: { actor: "consulting" },
        });
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <NavDashboard actor={actor}>
      <div style={{ margin: "0 3%", backgroundColor: "rgb(12, 34, 64,0)" }}>
        <h1 style={{ textAlign: "center", paddingTop: "10px" }}>
          THÔNG TIN ĐƠN HÀNG
        </h1>
        <Form
          initialValues={{
            pondAddress: order?.pondAddress,
            pondVolumeMaintenance: order?.pondVolume,
            ponVolumeContrucstion: order?.quotation?.pondVolume,
          }}
        >
          <Row gutter={24}>
            <Col span={8}>
              <label>Họ tên</label>
              <div className="display-input">
                <span> {order?.customerName || "N/A"}</span>
              </div>
            </Col>
            <Col span={8}>
              <label>Số điện thoại</label>
              <div className="display-input">
                <span> {order?.customerPhone || "N/A"}</span>
              </div>
            </Col>
            <Col span={8}>
              <label>Email</label>
              <div className="display-input">
                <span> {order?.customerEmail || "N/A"}</span>
              </div>
            </Col>
            <Col span={24}>
              <FormItem
                label="Địa chỉ thi công"
                name="pondAddress"
                labelCol={{ span: 24 }}
              >
                <Input placeholder={"Nhập địa chỉ thi công"} />
              </FormItem>
            </Col>
            <Col span={24}>
              <label>Nội dung khách hàng yêu cầu</label>
              <div className="display-input" style={{ textAlign: "justify" }}>
                {order?.customerDescription || "N/A"}
              </div>
            </Col>
            <Col span={10}>
              <label>Trạng thái</label>
              <div className="display-input">
                <span> {order?.statusDescription}</span>
              </div>
            </Col>
            {order.serviceType === "maintenance" ? (
              <>
                <Col span={7}>
                  <label>Dịch vụ</label>
                  <div className="display-input">
                    <span> {typeMaintenance || "N/A"}</span>
                  </div>
                </Col>
                <Col span={7}>
                  <FormItem
                    label="Thể tích hồ"
                    name="pondVolumeMaintenance"
                    labelCol={{ span: 24 }}
                  >
                    <Input placeholder={"Nhập thể tích hồ"} />
                  </FormItem>
                </Col>
              </>
            ) : (
              <>
                <Col span={7}>
                  <label>Gói</label>
                  <div className="display-input">
                    <span>N/A</span>
                  </div>
                </Col>
                <Col span={7}>
                  <FormItem
                    label="Thể tích hồ"
                    name="ponVolumeContrucstion"
                    labelCol={{ span: 24 }}
                  >
                    <Input placeholder={"Nhập thể tích hồ"} />
                  </FormItem>
                </Col>
              </>
            )}
          </Row>
        </Form>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Button
            onClick={() => {
              navigate(`/consulting`);
            }}
          >
            Tạm hoãn
          </Button>
          <Button onClick={handleApprovedOrder}>Xác nhận đơn hàng</Button>
          <Button onClick={handleCanceledOrder}>Hủy đơn hàng</Button>
        </div>
      </div>
    </NavDashboard>
  );
}

export default ApproveOrder;
