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
      const response = await api.get(`orders/${id}`);
      setMaintenanceOrder(response.data);
      console.log(response.data);
      console.log(actor);
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
      await api.put(
        `/api/maintenance/set-constructor/${maintenanceOrder.id}/${selectedConstructor.id}`
      );
      console.log("Lưu constructor với ID:", selectedConstructor);
      fetchMaintenanceOrder();
    } else {
      alert("Vui lòng chọn nhà thiết kế");
    }
  };
  return (
    <NavDashboard actor={actor}>
      <div>
        <OrderInfor constructionOrder={maintenanceOrder} />
        <h1>ĐẢM NHẬN VÀ TIẾN ĐỘ THI CÔNG</h1>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={4}>
              <div className="progress">
                <Progress
                  type="circle"
                  percent={maintenanceOrder?.constructionProgress}
                />
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
                <span>{maintenanceOrder.consultantAccount?.name || "N/A"}</span>
              </div>
              <Form.Item label="Người chịu trách nhiệm thi công">
                <div className="display-input">
                  <span>
                    {maintenanceOrder.constructorAccount.name || "N/A"}
                  </span>
                </div>
                {actor === "manager" ? (
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
                    <button onClick={() => handleAssignConstructor()}>
                      Lưu
                    </button>
                  </div>
                ) : (
                  <div className="display-input">
                    <span>
                      {constructionOrder.constructorAccount?.name || "N/A"}
                    </span>
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </NavDashboard>
  );
}
export default MaintenanceDetail;
