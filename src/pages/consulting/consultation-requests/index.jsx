import React, { useEffect, useState } from "react";
import { Button, Modal, Spin } from "antd";
import "./index.css";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../components/loading";
function ConsultationRequests() {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchConsultationRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get("orders/status", {
        params: {
          status: "REQUESTED",
        },
      });
      console.log(response.data);
      setRequests(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultationRequests();
  }, []);

  const showModal = (record) => {
    setSelectedOrder(record);
    console.log(record);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    selectedOrder.status = "PROCESSING";
    console.log(selectedOrder);
    await api.put(`orders/consultant/${selectedOrder.id}`);
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
      dataIndex: "customerDescription",
      key: "customerDescription",
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
            open={isModalOpen && selectedOrder?.id === record.id}
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
      {loading ? (
        <LoadingPage />
      ) : (
        <TableTemplate
          columns={columns}
          requests={requests}
          title={title}
          actor="consulting"
        />
      )}
    </div>
  );
}

export default ConsultationRequests;
