import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlinePriceChange } from "react-icons/md";

import "./index.css";
import { useNavigate } from "react-router-dom";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
function OngoingConsultations() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const fetchConsultationRequests = async () => {
    const response = await api.get("orders/consultant");
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
      title: "Số điện thoại",
      dataIndex: "customerPhone",
      key: "customerPhone",
    },
    {
      title: "Trạng thái",
      dataIndex: "statusDescription",
      key: "statusDescription",
    },
    {
      title: "",
      key: "",
      render: (record) => {
        return record.status === "PROCESSING" ? (
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <MdOutlinePriceChange
              size={30}
              onClick={() =>
                navigate(`/consulting/information-customer/${record.id}`, {
                  state: "consulting",
                })
              }
            />
            <p style={{ fontSize: "10px", fontStyle: "italic" }}>Tạo báo giá</p>
          </div>
        ) : (
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <AiOutlineUnorderedList
              onClick={() =>
                navigate(`/order/${record.id}`, { state: "consulting" })
              }
            />
            <p style={{ fontSize: "10px", fontStyle: "italic" }}>Chi tiết</p>
          </div>
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
