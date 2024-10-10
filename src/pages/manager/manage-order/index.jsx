import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import "../../../utils/common.css";
import api from "../../../config/axios";
import TableTemplate from "../../../components/table";
import { useNavigate } from "react-router-dom";
import { AiOutlineUnorderedList } from "react-icons/ai";
import moment from "moment";
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
      title: "Ngày gửi đơn",
      key: "requestDate",
      render: (record) => (
        <p>{moment(record.requestDate).format("DD/MM/YYYY")}</p>
      ),
    },
    {
      title: "chi tiết",
      key: "actions",
      render: (_, record) => {
        return (
          <AiOutlineUnorderedList
            onClick={() =>
              navigate(`/order-detail/${record.id}`, { state: "manager" })
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
