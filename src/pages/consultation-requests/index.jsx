import React, { useEffect, useState } from "react";
import AuthenTemplateDashboard from "../../components/authen-template-dashboard";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import "./index.css";
function ConsultationRequests() {
  const [requests, setRequests] = useState([]);
  const api =
    "https://66fa4cd2afc569e13a9b1aed.mockapi.io/Consultation-requests";
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
    },
    {
      title: "Họ tên",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "", // Tên cột
      key: "actions",
      render: (_, record) => (
        <>
          <Button
            className="consultation__button"
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
      <AuthenTemplateDashboard>
        <Table
          className="consultation-requests__table"
          columns={columns}
          dataSource={requests}
          pagination={{ pageSize: 9 }}
        />
      </AuthenTemplateDashboard>
    </div>
  );
}

export default ConsultationRequests;
