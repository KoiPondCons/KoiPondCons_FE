import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import "../../../utils/table.css";
import { AiOutlineUnorderedList } from "react-icons/ai";
import TableTemplate from "../../../components/table";
function OrderManagement() {
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
      // render: (_, record) => {
      //   const link = {}; //Ý là để điều hướng sang trang order-detail
      //   return <AiOutlineUnorderedList onClick={link} />;
      // },
    },
  ];
  const title = "Khách hàng cần tư vấn";
  return (
    <div>
      <TableTemplate columns={columns} requests={requests} title={title} />
    </div>
  );
}

export default OrderManagement;
