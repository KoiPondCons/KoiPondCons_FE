import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import "./index.css";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
function ConsultationRequests() {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectOrder] = useState(null);
  const fetchConsultationRequests = async () => {
    const response = await api.get("orders/status", {
      params: {
        status: "REQUESTED",
      },
    });
    console.log(response.data);
    setRequests(response.data);
  };
  useEffect(() => {
    fetchConsultationRequests();
  }, []);

  const showModal = () => {
    setSelectOrder;
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
      dataIndex: "customerName",
      key: "customerName",
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "statusDescription",
      key: "statusDescription",
      width: 150,
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
            onClick={() => showModal(record)}
          >
            Tư vấn
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
  const title = "Khách hàng cần tư vấn";
  return (
    <div>
      <TableTemplate
        columns={columns}
        requests={requests}
        title={title}
        actor="consulting"
      />
    </div>
  );
}

export default ConsultationRequests;
