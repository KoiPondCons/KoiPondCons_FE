import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { Button, Col, Modal, Progress, Row, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import NavDashboard from "../../../components/navbar-dashboard";
import { RiDraftLine } from "react-icons/ri";
import OrderInfor from "../../../components/order-information";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

function ConstructionOrderDetail() {
  const [isOrderFetched, setOrderFetched] = useState(false);
  const [order, setOrder] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [taskList, setTaskList] = useState([]);
  const { id } = useParams();

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      console.log(response.data);
      setOrder(response.data);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setOrderFetched(true);
    }
  };

  const fetchTaskList = async (orderId) => {
    try {
      const response = await api.get(`/staffconstructiondetail/${orderId}`);
      setTaskList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchOrder();
    fetchTaskList(id);
  }, []);

  const showModal = (src) => {
    console.log("Modal is opening with image source:", src);
    setImageSrc(src);
    setIsModalVisible(true);
    console.log(isModalVisible);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
        title: "Tên hạng mục",
        dataIndex: ["constructionItem", "itemContent"],
        key: "constructionItem.itemContent",
        width: "500px",
    },
    {
        title: "Ngày hoàn thành",
        dataIndex: "dateEnd",
        key: "dateEnd",
        width: "150px",
        render: (text) => {
            return `${dayjs(text).format('DD/MM/YYYY')}`;
        },
    },
  ];

  if (!isOrderFetched) {
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
        </Row>
        <h1 style={{ marginTop: "50px" }}>Bảng hạng mục</h1>
        <Table 
            columns={columns}
            dataSource={taskList}
            style={{margin: '50px'}}
        >

        </Table>
      </NavDashboard>
    </div>
  );
}

export default ConstructionOrderDetail;