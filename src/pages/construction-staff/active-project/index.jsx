import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import TableTemplate from "../../../components/table";
import { Button, Col, Modal, Progress, Row, Spin } from "antd";
import NavDashboard from "../../../components/navbar-dashboard";
import { RiDraftLine } from "react-icons/ri";
import api from "../../../config/axios";
import OrderInfor from "../../../components/order-information";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
// import format from 'date-fns';

function ActiveProject() {
  const [order, setOrder] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const strict = useRef(false);

  const fetchOrder = async () => {
    console.log("Fetching order");
    try {
      const response = await api.get("/orders/constructor/current");
      // console.log(response.data);
      setOrder(response.data);
      // console.log(order);
    } catch (error) {
      console.log(error.response.data);
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

  if (!order) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    );
  }

  return (
    <div>
      <NavDashboard actor="construction">
        <label>
          <b>Mã dự án: {order.id}</b>
        </label>

        <Row gutter={60}>
          <Col span={18}>
            <OrderInfor constructionOrder={order} />
          </Col>

          <Col
            span={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <div className="progressss">
              <Progress type="circle" percent={order.constructionProgress} />
              <h3 style={{ margin: " 20px 20px 20px 30px" }}>Tiến độ </h3>
            </div>
            <div>
              <div
                style={{ textAlign: "center", cursor: "pointer", width: '120px' }}
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
        </Row>

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
                  (!taskList[index - 1] || taskList[index - 1].finished) ? (
                    <Button
                      className="button-template"
                      style={{ margin: "10px" }}
                      loading={buttonLoading}
                      onClick={() => {
                        const updateData = {
                          constructionItem: task.constructionItem,
                          constructorAccount: task.constructorAccount,
                          dateEnd: task.dateEnd,
                          dateStart: new Date().toISOString().split("T")[0],
                          finished: task.finished,
                          id: task.id,
                        };
                        console.log(updateData, "data của tui");
                        console.log(task, "task của tui");
                        handleUpdate(task.id, updateData);
                      }}
                      // loading={buttonLoading}
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
                            // onOk={}
                          });
                        } else handleUpdate(task.id, updateData);
                      }}
                      // loading={buttonLoading}
                    >
                      Nhấn hoàn thành
                    </Button>
                  ) : task.finished ? (
                    <div style={{ fontSize: "16px", padding: "10px" }}>
                      Đã xong ngày {moment("2024-10-15").format("DD/MM/YYYY")}
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
          ))}
        </div>
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
  );
}

export default ActiveProject;
