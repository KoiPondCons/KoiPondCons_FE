import { Button, Col, Form, Row, Select, Table } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import NavDashboard from "../../components/navbar-dashboard";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../../components/table/index.css";
import moment from "moment";
import OrderInfor from "../../components/order-information";
function MaintenanceDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { actor } = location.state;
  const { id } = useParams();
  const [maintenanceOrder, setMaintenanceOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [freeConstructors, setFreeConstructors] = useState([]);
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
  const fetchMaintenanceOrder = async () => {
    try {
      const response = await api.get(`maintenance/${id}`);
      setMaintenanceOrder(response.data);
      console.log(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMaintenanceOrder();
    fecthFreeConstructors();
    console.log("Data table:");
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const handleAssignConstructor = async () => {
    if (selectedConstructor) {
      await api.put(`maintenance/set-constructor/${id}/${selectedConstructor}`);
      console.log("Lưu constructor với ID:", selectedConstructor);
      fetchMaintenanceOrder();
    } else {
      alert("Vui lòng chọn nhà thiết kế");
    }
  };
  const handlePayment = async () => {
    try {
      const linkPayment = await api.post(
        `submitMaintainOrder/${maintenanceOrder.id}`
      );
      window.location.href = linkPayment.data;
    } catch (error) {
      console.error("Payment error: ", error);
    }
  };
  const columns = [
    {
      title: "Nội dung",
      align: "center",
      render: () => {
        return <p>Thanh toán đơn bảo dưỡng</p>;
      },
    },
    {
      title: "Số tiền cần thanh toán",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Thanh toán",
      align: "center",
      render: (_, record) => {
        return record.endDate !== null && record.status === "FINISHED" ? (
          <>
            Đã thanh toán vào lúc{" "}
            {moment(record.endDate).format("DD/MM/YYYY HH:mm:ss")}
          </>
        ) : actor === "customer" ? (
          <Button onClick={() => handlePayment()}>Thanh toán</Button>
        ) : (
          <p>Chưa thanh toán</p>
        );
      },
    },
  ];
  const orders = [maintenanceOrder];

  return (
    <NavDashboard actor={actor}>
      <div style={{ backgroundColor: "white", height: "100vh" }}>
        <OrderInfor constructionOrder={maintenanceOrder} type="maintenance" />
        <h1 style={{ textAlign: "center" }}>ĐẢM NHẬN VÀ TIẾN ĐỘ THI CÔNG</h1>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={20}>
              <label>Tư vấn viên</label>
              <div className="display-input">
                <span>{maintenanceOrder?.consultantName || "N/A"}</span>
              </div>
              <Form.Item label="Người chịu trách nhiệm thi công">
                {maintenanceOrder.constructorName ? (
                  <div className="display-input">
                    <span>{maintenanceOrder.constructorName}</span>
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
                    <button onClick={handleAssignConstructor}>Lưu</button>
                  </div>
                ) : (
                  <div className="display-input">
                    <span>Chờ chỉ định người thi công</span>
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          style={{ margin: "3%" }}
          columns={columns}
          dataSource={orders}
          pagination={false}
        ></Table>
      </div>
    </NavDashboard>
  );
}
export default MaintenanceDetail;
