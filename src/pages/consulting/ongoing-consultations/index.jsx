import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUnorderedList } from "react-icons/ai";
import "./index.css";
import { useNavigate } from "react-router-dom";
import TableTemplate from "../../../components/table";
function OngoingConsultations() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const api = "https://66fa4cd2afc569e13a9b1aed.mockapi.io/ConstructionOrder";
  const fetchConsultationRequests = async () => {
    const response = await axios.get(api);
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
      title: "Chi tiết",
      key: "",
      render: (record) => {
        return (
          <AiOutlineUnorderedList
            onClick={() => navigate(`/order/${record.id}`)}
          />
        );
      },
    },
  ];
  const title = "Khách hàng đang tư vấn";
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

export default OngoingConsultations;
