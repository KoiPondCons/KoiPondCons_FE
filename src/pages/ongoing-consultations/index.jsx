import React, { useEffect, useState } from "react";
import NavDashboard from "../../components/navbar-dashboard";
import { Table } from "antd";
import axios from "axios";
import { AiOutlineUnorderedList } from "react-icons/ai";
import "../../utils/table.css";
import "./index.css";
import { useNavigate } from "react-router-dom";
function OngoingConsultations() {
  const navigate = useNavigate(); 
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
      title: "Số điện thoại",
      dataIndex: "customer_phone",
      key: "customer_phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      key: "",
      render: (record) => {
        return <AiOutlineUnorderedList onClick={() => navigate(`/order/${record.id}`)} />;
      },
    },
  ];

  return (
    <div>
      <NavDashboard>
        <h1>Khách hàng đang tư vấn</h1>
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

export default OngoingConsultations;
