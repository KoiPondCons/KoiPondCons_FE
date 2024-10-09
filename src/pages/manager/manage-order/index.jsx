import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import "../../../utils/common.css";
import api from "../../../config/axios";
import TableTemplate from "../../../components/table";
import { useNavigate } from "react-router-dom";
import { AiOutlineUnorderedList } from "react-icons/ai";
function OrderManagement() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const fetchConsultationRequests = async () => {
    const response = await api.get("orders");
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
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusDescription",
      key: "statusDescription",
    },
    {
      title: "Ngày gửi đơn",
      dataIndex: "requestDate",
      key: "requestDate",
    },
    {
      title: "chi tiết",
      key: "actions",
      render: (_, record) => {
        return (
          <AiOutlineUnorderedList
            onClick={() =>
              navigate(`/order/${record.id}`, { state: "manager" })
            }
          />
        );
      },
    },
  ];
  const title = "Khách hàng cần tư vấn";
  return (
    <div>
      <TableTemplate
        columns={columns}
        requests={requests}
        title={title}
        actor="manager"
      />
    </div>
  );
}

export default OrderManagement;
