import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import "./index.css";
import "../../utils/table.css";
import NavDashboard from "../../components/navbar-dashboard";
import { AiOutlineUnorderedList } from "react-icons/ai";
function OrderManagement() {
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
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ngày gửi đơn",
      dataIndex: "request_date",
      key: "request_date",
    },
    {
      title: "chi tiết",
      key: "actions",
      render: (_, record) => {
        const link = {}; //Ý là để điều hướng sang trang order-detail
        return <AiOutlineUnorderedList onClick={link} />;
      },
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

export default OrderManagement;
