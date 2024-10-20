import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import "../../../utils/common.css";
import api from "../../../config/axios";
import TableTemplate from "../../../components/table";
import { useNavigate } from "react-router-dom";
import { AiOutlineUnorderedList } from "react-icons/ai";
import moment from "moment";
import { MdOutlinePriceChange } from "react-icons/md";
import { Spin } from "antd";
import LoadingPage from "../../../components/loading";
import { RiDraftLine } from "react-icons/ri";
import { FaSquareCheck } from "react-icons/fa6";
function OrderManagement() {
  const navigate = useNavigate();
  const actor = "manager";
  const [constructionOrders, setConstructionOrders] = useState([]);
  const [loading, setLoading] = useState();
  const fetchConstructionOrders = async () => {
    setLoading(true);
    try {
      const response = await api.get("orders");
      setConstructionOrders(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchConstructionOrders();
  }, []);
  const handleCloseOrder = async (constructionOrder) => {
    const value = {
      status: "CLOSED",
      customerName: constructionOrder.customerName,
      customerPhone: constructionOrder.customerPhone,
      customerEmail: constructionOrder.customerEmail,
      pondAddress: constructionOrder.pondAddress,
      designed: constructionOrder.designed,
    };
    try {
      await api.put(`orders/${constructionOrder.id}`, value);
      await fetchConstructionOrders();
      console.log("Update status order: " + constructionOrder.status);
    } catch (error) {
      console.error(error);
    }
  };
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
      title: "Ngày gửi đơn",
      key: "requestDate",
      render: (record) => (
        <p>{moment(record.requestDate).format("DD/MM/YYYY")}</p>
      ),
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
              {record.designDrawingResponse &&
              record.designDrawingResponse.status ? (
                <p>
                  {record.designDrawingResponse.statusDescription} bản thiết kế
                </p>
              ) : (
                <p>Chờ chỉ định nhà thiết kế</p>
              )}
            </div>
          );
        } else if (record.status === "CONSTRUCTING") {
          return (
            <div style={textStyle}>
              {!record.constructorAccount && <p>Chờ chỉ định nhà thiết kế</p>}
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
        if (record.quotationResponse.status === "MANAGER_PENDING") {
          return (
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <MdOutlinePriceChange
                style={{ cursor: "pointer" }}
                size={30}
                onClick={() => {
                  navigate(`/consulting/price-list-staff/${record.id}`, {
                    state: { actor },
                  });
                }}
              />
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Duyệt báo giá
              </p>
            </div>
          );
        } else if (record.designDrawingResponse.status === "MANAGER_PENDING") {
          return (
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <RiDraftLine
                style={{ cursor: "pointer" }}
                size={30}
                onClick={() => {
                  navigate(`/design-review/${record.id}`, {
                    state: { actor },
                  });
                }}
              />
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Duyệt bản thiết kế
              </p>
            </div>
          );
        } else if (record.status === "FINISHED") {
          return (
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <FaSquareCheck
                style={{ cursor: "pointer" }}
                size={30}
                onClick={() => handleCloseOrder(record)}
              />
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Đóng dự án thi công
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
                    state: { actor },
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
  const title = "Quản lý đơn hàng";
  return (
    <div>
      <Spin spinning={loading} indicator={<LoadingPage />}>
        <TableTemplate
          columns={columns}
          requests={constructionOrders}
          title={title}
          actor="manager"
          loading={loading}
        />
      </Spin>
    </div>
  );
}

export default OrderManagement;
