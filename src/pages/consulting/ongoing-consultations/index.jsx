import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdOutlinePriceChange } from "react-icons/md";
import "./index.css";
import { useNavigate } from "react-router-dom";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
import { Spin } from "antd";
function OngoingConsultations() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConsultationRequests = async () => {
    setLoading(true);
    try {
      const response = await api.get("orders/consultant");
      setRequests(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching consultation requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultationRequests();
  }, []);
  if (loading) {
    return <Spin size="large" />;
  }

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
      key: "status",
      render: (record) => {
        const textStyle = {
          fontSize: "1rem",
          fontStyle: "italic",
          textAlign: "center",
        };

        if (record.status === "PROCESSING") {
          return (
            <div style={textStyle}>
              {record.quotationResponse &&
              record.quotationResponse.statusDescription ? (
                <p>{record.quotationResponse.statusDescription} báo giá</p>
              ) : (
                <p>Không có thông tin báo giá, hãy tạo báo giá</p>
              )}
            </div>
          );
        } else if (record.status === "DESIGNING") {
          return (
            <div style={textStyle}>
              {record.designDrawResponse &&
              record.designDrawResponse.statusDescription ? (
                <p>
                  {record.designDrawResponse.statusDescription} bản thiết kế
                </p>
              ) : (
                <p>Chờ chỉ định nhà thiết kế</p>
              )}
            </div>
          );
        } else {
          return (
            <div style={textStyle}>
              <p>{record.statusDescription}</p>
            </div>
          );
        }
      },
    },
    {
      title: "",
      key: "",
      render: (record) => {
        if (
          record.quotationResponse.status === "PROCESSING" ||
          record.quotationResponse.status === "MANAGER_REJECTED" ||
          record.quotationResponse.status === "CUSTOMER_REJECTED"
        ) {
          return (
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <MdOutlinePriceChange
                style={{ cursor: "pointer" }}
                size={30}
                onClick={() => {
                  const actor = "consulting";
                  navigate(`/consulting/price-list-staff/${record.id}`, {
                    state: { actor },
                  });
                }}
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
