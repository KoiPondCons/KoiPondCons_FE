import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import "./index.css";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";
function ConsultationRequests() {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();
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

  const showModal = (record) => {
    setSelectedOrder(record);
    setIsModalOpen(true);
  };
  const consulting = async () => {
    await api.put(`orders/consultant/${selectedOrder.id}`);
  };
  const handleOk = async () => {
    selectedOrder.status = "PROCESSING";
    console.log(selectedOrder);
    consulting();
    console.log(selectedOrder);
    await api.put(`orders/${selectedOrder.id}`, selectedOrder);
    console.log("Update order status success");
    navigate("/consulting/ongoing-consultation");
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
      title: "Số điện thoại",
      dataIndex: "customerPhone",
      key: "customerPhone",
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
            <p>Khách: {record.customerName}</p>
            <p>Số điện thoại: {record.customerPhone}</p>
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
