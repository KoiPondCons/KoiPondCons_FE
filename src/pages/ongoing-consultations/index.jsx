import React, { useEffect, useState } from "react";
import NavDashboard from "../../components/navbar-dashboard";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Button, Table } from "antd";
import axios from "axios";


function OngoingConsultations() {
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
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Chi tiết",
      key: "actions",
      render: (record) => {
        const history = useHistory();
        const handleDetailClick = () => {
          history.push(`/order-detail/${record.id}`);
        };
        return (
          <Button onClick={handleDetailClick} style={{ cursor: `pointer` }}>
            <AiOutlineUnorderedList />
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <NavDashboard>
        <h1>Khách hàng đang tư vấn</h1>
        <Table columns={columns} dataSource={requests} />
      </NavDashboard>
    </div>
  );
}

export default OngoingConsultations;
