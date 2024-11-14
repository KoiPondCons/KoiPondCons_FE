import React, { useEffect, useState } from "react";
import OrderInfor from "../../../components/order-information";
import { Button, Card, Col, Form, Input, message, Row, Statistic } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import NavDashboard from "../../../components/navbar-dashboard";
import api from "../../../config/axios";

function ApproveOrder() {
  const [form] = Form.useForm();
  const location = useLocation();
  const { actor, order } = location.state;
  const navigate = useNavigate();
  const typeMaintenance = order.warranted ? "Bảo hành" : "Bảo dưỡng";
  const [freeStaffs, setFreeStaffs] = useState();
  const fetchFreeStaffs = async () => {
    try {
      const response = await api.get("account/free-staff-statistic");
      console.log(response.data);
      setFreeStaffs(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFreeStaffs();
  }, []);
  useEffect(() => {
    form.setFieldsValue({
      pondAddress: order?.pondAddress,
      pondVolumeMaintenance: order?.pondVolume,
      pondVolumeConstruction: order?.quotation?.pondVolume,
    });
  }, [order, form]);
  const onFinish = async (values) => {
    try {
      const updatedOrder = {
        ...order,
        pondAddress: values.pondAddress,
        pondVolume:
          values.pondVolumeMaintenance ||
          values.pondVolumeConstruction ||
          order.pondVolume ||
          order.quotation?.pondVolume,
      };
      console.log(updatedOrder);
      if (order.serviceType === "maintenance") {
        await api.put(`maintenance/${order.id}`, updatedOrder);
      } else {
        await api.put(`orders/${order.id}`, updatedOrder);
      }
      message.success("Cập nhật thông tin thành công");
    } catch (error) {
      message.error("Cập nhật thông tin thất bại");
      console.error("Error updating order:", error);
    }
  };
  const handleCanceledOrder = async () => {
    const updatedOrder = { ...order, status: "CANCELED" };
    if (order.serviceType === "maintenance") {
      await api.put(`maintenance/${order.id}`, updatedOrder);
    } else {
      await api.put(`orders/${order.id}`, updatedOrder);
    }
    navigate(`/consulting`);
  };

  const handleApprovedOrder = async () => {
    try {
      const updatedOrder = { ...order, status: "PROCESSING" };

      if (order.serviceType === "maintenance") {
        await api.put(`maintenance/${order.id}`, updatedOrder);
        navigate(`/consulting`, { state: { actor: "consulting" } });
      } else {
        await api.put(`orders/${order.id}`, updatedOrder);
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
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Lịch sử đơn hàng"
                valueRender={() => (
                  <Button
                    type="link"
                    onClick={() => {
                      navigate(`customer-information/${record.id}`);
                    }}
                  >
                    Xem chi tiết
                  </Button>
                )}
              ></Statistic>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Nhà thiết kế rảnh"
                value={freeStaffs?.freeDesigner}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="Nhà thi công rảnh"
                value={freeStaffs?.freeConstructor}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
        </Row>
        <Form
          initialValues={{
            pondAddress: order?.pondAddress,
            pondVolumeMaintenance: order?.pondVolume,
            pondVolumeConstruction: order?.quotation?.pondVolume,
          }}
          onFinish={onFinish}
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
              <Form.Item
                label="Địa chỉ thi công"
                name="pondAddress"
                labelCol={{ span: 24 }}
              >
                <Input placeholder="Nhập địa chỉ thi công" />
              </Form.Item>
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
                  <Form.Item
                    label="Thể tích hồ"
                    name="pondVolumeMaintenance"
                    labelCol={{ span: 24 }}
                  >
                    <Input placeholder="Nhập thể tích hồ" />
                  </Form.Item>
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
                  <Form.Item
                    label="Thể tích hồ"
                    name="pondVolumeConstruction"
                    labelCol={{ span: 24 }}
                  >
                    <Input placeholder="Nhập thể tích hồ" />
                  </Form.Item>
                </Col>
              </>
            )}
          </Row>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button onClick={() => navigate(`/consulting`)}>Tạm hoãn</Button>
            <Button htmlType="submit">Cập nhật thông tin</Button>
            <Button onClick={handleApprovedOrder}>Xác nhận đơn hàng</Button>
            <Button onClick={handleCanceledOrder}>Hủy đơn hàng</Button>
          </div>
        </Form>
      </div>
    </NavDashboard>
  );
}

export default ApproveOrder;
