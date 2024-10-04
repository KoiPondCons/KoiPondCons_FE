import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import "./index.css";
import "../../utils/table.css";
import NavDashboard from "../../components/navbar-dashboard-construction";
function ConsultationRequests() {
  const [requests, setRequests] = useState([]);
  const api = "https://66fa4cd2afc569e13a9b1aed.mockapi.io/ConstructionOrder";
  const fetchConsultationRequests = async () => {
    const response = await axios.get(api);
    console.log(response.data);
    setRequests(response.data);
  };
  useEffect(() => {
    fetchConsultationRequests();
  }, []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 30,
    },
    {
      title: "Họ tên",
      dataIndex: "customer_name",
      key: "customer_name",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 100,
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      key: "description",
      render: (text) => <div className="description-cell">{text}</div>,
      width: 300,
    },
    {
      title: "",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <>
          <Button
            className="button-template"
            type="primary"
            onClick={showModal}
          >
            Open Modal
          </Button>
          <Modal
            title="Xác nhận tư vấn"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Khách: {record.customer_name}</p>
            <p>Dịch vụ: {record.service}</p>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <div>
      <NavDashboard>
        <h1>Khách hàng cần tư vấn</h1>

        <Table
          className="table-template"
          columns={columns}
          dataSource={requests}
          pagination={{ pageSize: 8 }}
        />
      </NavDashboard>
    </div>
  );
}

export default ConsultationRequests;
