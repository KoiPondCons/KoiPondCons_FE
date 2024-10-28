import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import TableTemplate from "../../../components/table";
import { Button, Col, Form, Input, Modal, Progress, Row, Spin } from "antd";
import NavDashboard from "../../../components/navbar-dashboard";
import { RiDraftLine } from "react-icons/ri";
import api from "../../../config/axios";
import OrderInfor from "../../../components/order-information";
import { DoubleRightOutlined, LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";
// import format from 'date-fns';

function ActiveProject() {
  const [order, setOrder] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isOrderFetched, setOrderFetched] = useState(false);
  const strict = useRef(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    console.log("Fetching order");
    try {
      const constructorOrder = await api.get("/orders/constructor/current");

      console.log(constructorOrder.data);
      constructorOrder.data.serviceType = "construction";
      setOrder(constructorOrder.data);
      console.log(order);
    } catch (error) {
      console.log(error.response.data);
      try {
        const maintenanceOrder = await api.get(
          "maintenance/current-constructor"
        );

        maintenanceOrder.data.serviceType = "maintenance";
        setOrder(maintenanceOrder.data);
        console.log(maintenanceOrder.serviceType);
        console.log(maintenanceOrder);
      } catch (error) {
        console.log(error.response.data);
      }
    } finally {
      setOrderFetched(true);
    }
  };

  const fetchTaskList = async (orderId) => {
    try {
      const response = await api.get(`/staffconstructiondetail/${orderId}`);
      setTaskList(response.data);
      console.log(taskList);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  useEffect(() => {
    if (order) {
      // Kiểm tra xem order có khác null không
      console.log("Order updated:", order); // In ra giá trị của order khi nó được cập nhật
      fetchTaskList(order.id);
    }
  }, [order]);

  const handleUpdate = async (detailId, newValues) => {
    setButtonLoading(true);
    setConfirmLoading(true);
    try {
      const response = await api.put(
        `/staffconstructiondetail/${detailId}`,
        newValues
      );

      console.log(response.data);
      // if (strict.current) {
      //   fetchTaskList(order.id);
      //   // strict.current = false;
      // } else {
      //   strict.current = true;
      // }

      await fetchOrder();
      await fetchTaskList(order.id);
      setButtonLoading(false);
      setConfirmLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const showModal = (src) => {
    console.log("Modal is opening with image source:", src);
    setImageSrc(src);
    setIsModalVisible(true);
    console.log(isModalVisible);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConstructed = async () => {
    const updateData = {
      status: "CONSTRUCTED",
      confirmedDate: new Date(),
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerEmail: order.customerEmail,
      pondAddress: order.pondAddress,
      designed: order.designed,
    };
    try {
      const response = await api.put(`/orders/${order.id}`, updateData);
      console.log(response.data, "data update nè");
      navigate(
        `/construction/history-construction/construction-order-detail/${order.id}`
      );
    } catch (error) {
      console.log(error.response.data);
    }
    //cập nhật status order
    //navigate qua chi tiết dự án đã thi công
  };

  if (!isOrderFetched) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    );
  }
  const handleUpdatePriceMaintenance = async (value) => {
    try {
      await api.put(`maintenance/${order.id}`, {
        ...order,
        price: value.price,
      });
      fetchOrder();
    } catch (error) {
      console.error(error);
    }
  };
  const handleFinishedMaintenance = async () => {
    try {
      await api.put(`maintenance/${order.id}`, {
        ...order,
        status: "PROCESSED",
      });
      navigate("/construction/history-construction");
      fetchOrder();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {order ? (
        <div>
          <NavDashboard actor="construction">
            <label>
              <b>Mã dự án: {order.id}</b>
            </label>

            <Row gutter={60}>
              <Col span={order.serviceType === "construction" ? 18 : 22}>
                <OrderInfor
                  constructionOrder={order}
                  type={order.serviceType}
                />
              </Col>
              {order.serviceType === "construction" && (
                <Col
                  span={6}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                  }}
                >
                  <div className="progressss">
                    <Progress
                      type="circle"
                      percent={order.constructionProgress}
                    />
                    <h3 style={{ margin: " 20px 20px 20px 30px" }}>Tiến độ </h3>
                  </div>
                  <div>
                    <div
                      style={{
                        textAlign: "center",
                        cursor: "pointer",
                        width: "120px",
                      }}
                      onClick={() =>
                        showModal(`${order.designDrawingResponse?.designFile}`)
                      }
                    >
                      <RiDraftLine size={50} />
                      <p style={{ fontSize: "14px", fontStyle: "italic" }}>
                        Xem file thiết kế
                      </p>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
            {order.serviceType === "construction" ? (
              <div style={{ margin: "50px 20px" }}>
                <h1 style={{ marginBottom: "20px" }}>Bảng công việc</h1>
                {taskList.length === 0 ? <Spin spinning={true}></Spin> : null}
                {taskList.map((task, index) => (
                  <Row gutter={60} key={index}>
                    <Col span={16}>
                      <div className="display-input">
                        <span>{task.constructionItem.itemContent}</span>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div>
                        {!task.dateStart &&
                        (!taskList[index - 1] ||
                          taskList[index - 1].finished) ? (
                          <Button
                            className="button-template"
                            style={{ margin: "10px" }}
                            loading={buttonLoading}
                            onClick={() => {
                              const updateData = {
                                constructionItem: task.constructionItem,
                                constructorAccount: task.constructorAccount,
                                dateEnd: task.dateEnd,
                                dateStart: new Date()
                                  .toISOString()
                                  .split("T")[0],
                                finished: task.finished,
                                id: task.id,
                              };
                              console.log(updateData, "data của tui");
                              console.log(task, "task của tui");
                              handleUpdate(task.id, updateData);
                            }}
                          >
                            Bắt đầu
                          </Button>
                        ) : task.dateStart && !task.finished ? (
                          <Button
                            className="button-template"
                            style={{ margin: "10px" }}
                            loading={buttonLoading}
                            onClick={() => {
                              const updateData = {
                                constructionItem: task.constructionItem,
                                constructorAccount: task.constructorAccount,
                                dateEnd: new Date().toISOString().split("T")[0],
                                dateStart: task.dateStart,
                                finished: true,
                                id: task.id,
                              };
                              if (index === taskList.length - 1) {
                                Modal.confirm({
                                  title: "Xác nhận",
                                  content: "Nhấn OK để hoàn thành thi công!",
                                  okButtonProps: { confirmLoading },
                                  onOk() {
                                    handleUpdate(task.id, updateData);
                                    handleConstructed();
                                  },
                                });
                              } else handleUpdate(task.id, updateData);
                            }}
                          >
                            Nhấn hoàn thành
                          </Button>
                        ) : task.finished ? (
                          <div style={{ fontSize: "16px", padding: "10px" }}>
                            Đã xong ngày{" "}
                            {moment(task.dateEnd).format("DD/MM/YYYY")}
                          </div>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                ))}
              </div>
            ) : order.warranted == false ? (
              <div>
                <Form
                  onFinish={handleUpdatePriceMaintenance}
                  initialValues={{
                    price: order?.price,
                  }}
                >
                  <Row>
                    <Col span={22}>
                      <FormItem
                        name="price"
                        label="Tổng tiền"
                        labelCol={{ span: 24 }}
                      >
                        <Input
                          type="Number"
                          placeholder="Nhập số tiền bảo dưỡng khách cần thanh toán"
                        ></Input>
                      </FormItem>
                    </Col>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "40%", marginRight: "12%" }}
                    >
                      Lưu
                    </Button>
                    <Button
                      style={{ width: "40%" }}
                      onClick={() => handleFinishedMaintenance()}
                    >
                      Hoàn thành
                    </Button>
                  </Row>
                </Form>
              </div>
            ) : null}

            <Modal
              title="Hình ảnh bản vẽ"
              open={isModalVisible}
              onCancel={handleCancel}
              footer={null}
              width={900}
              height={700}
            >
              <img
                alt="Design"
                src={imageSrc}
                style={{ width: "100%", height: "auto" }}
              />
              <Button>Download</Button>
            </Modal>
          </NavDashboard>
        </div>
      ) : (
        <NavDashboard actor="construction">
          <h3 style={{ marginBottom: "20px" }}>
            Không có dự án nào đang thực hiện!
          </h3>
          <Link to="/construction/history-construction">
            <DoubleRightOutlined />
            Xem lịch sử dự án thi công
          </Link>
        </NavDashboard>
      )}
    </>
  );
}

export default ActiveProject;
