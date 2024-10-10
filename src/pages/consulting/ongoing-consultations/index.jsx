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
    console.log(response.data);
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
        if (record.quotationResponse.status === "PROCESSING") {
          return (
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <MdOutlinePriceChange
                style={{ cursor: "pointer" }}
                size={30}
                onClick={() =>
                  navigate(`/consulting/price-list-staff/${record.id}`, {
                    state: "consulting",
                  })
                }
              />
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Tạo báo giá
              </p>
            </div>
          );
        } else {
          return (
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <AiOutlineUnorderedList
                style={{ cursor: "pointer" }}
                size={30}
                onClick={() =>
                  navigate(`/order-detail/${record.id}`, {
                    state: "consulting",
                  })
                }
              />
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>Chi tiết</p>
            </div>
          );
        }
      },
    },
    {
      title: "Tình trạng",
      key: "",
      render: (record) => {
        if (record.status === "PROCESSING") {
          return (
            <div style={{ textAlign: "center" }}>
              {record.quotationResponse &&
              record.quotationResponse.statusDescription ? (
                <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                  {record.quotationResponse.statusDescription} báo giá
                </p>
              ) : (
                <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                  Không có thông tin báo giá, hãy tạo báo giá
                </p>
              )}
            </div>
          );
        } else if (record.status === "DESIGNING") {
          return (
            <div style={{ textAlign: "center" }}>
              {record.designDrawResponse &&
              record.designDrawResponse.statusDescription ? (
                <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                  {record.designDrawResponse.statusDescription} bản thiết kế
                </p>
              ) : (
                <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                  Chờ chỉ định nhà thiết kế
                </p>
              )}
            </div>
          );
        }
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
