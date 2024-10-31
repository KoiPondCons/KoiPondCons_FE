import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdFactCheck, MdOutlinePriceChange } from "react-icons/md";
import "./index.css";
import { useNavigate } from "react-router-dom";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
import LoadingPage from "../../../components/loading";
import { Radio, Spin } from "antd";
function OngoingConsultations() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("construction");
  const fetchConsultationRequests = async () => {
    setLoading(true);
    try {
      let response;
      if (type === "construction") {
        response = await api.get("orders/consultant");
      } else if (type === "maintenance") {
        response = await api.get("maintenance/consultant");
      }
      const requestsWithServiceType = response.data.map((req) => ({
        ...req,
        serviceType: type === "construction" ? "construction" : "maintenance",
      }));
      setRequests(requestsWithServiceType);
      console.log(requestsWithServiceType);
    } catch (error) {
      console.error("Error fetching consultation requests:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChangeType = (e) => {
    setType(e.target.value);
  };
  useEffect(() => {
    fetchConsultationRequests();
  }, [type]);
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

        if (record.serviceType === "construction") {
          if (record?.status === "PROCESSING") {
            return (
              <div style={textStyle}>
                {record?.quotationResponse &&
                record?.quotationResponse?.statusDescription ? (
                  <p>{record?.quotationResponse?.statusDescription} báo giá</p>
                ) : (
                  <p>Không có thông tin báo giá, hãy tạo báo giá</p>
                )}
              </div>
            );
          } else if (record?.status === "DESIGNING") {
            return (
              <div style={textStyle}>
                {record?.designDrawResponse &&
                record?.designDrawResponse?.statusDescription ? (
                  <p>
                    {record?.designDrawResponse?.statusDescription} bản thiết kế
                  </p>
                ) : (
                  <p>Chờ chỉ định nhà thiết kế</p>
                )}
              </div>
            );
          } else {
            return (
              <div style={textStyle}>
                <p>{record?.statusDescription}</p>
              </div>
            );
          }
        } else if (record.serviceType === "maintenance") {
          return (
            <div style={textStyle}>
              <p>{record?.statusDescription}</p>
            </div>
          );
        }
      },
    },
    {
      title: "Chức nănng",
      key: "function",
      render: (record) => {
        if (record.serviceType === "construction") {
          if (
            record?.quotationResponse?.status === "PROCESSING" ||
            record?.quotationResponse?.status === "MANAGER_REJECTED" ||
            record?.quotationResponse?.status === "CUSTOMER_REJECTED"
          ) {
            return (
              <div style={{ textAlign: "center", cursor: "pointer" }}>
                <MdOutlinePriceChange
                  style={{ cursor: "pointer" }}
                  size={30}
                  onClick={() => {
                    navigate(`/consulting/approve-order`, {
                      state: {
                        actor: "consulting",
                        order: record,
                      },
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
                      state: { actor: "consulting" },
                    })
                  }
                />
                <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                  Chi tiết
                </p>
              </div>
            );
          }
        } else if (record.serviceType === "maintenance") {
          if (record.status === "PENDING") {
            return (
              <div
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => {
                  navigate(`/consulting/approve-order`, {
                    state: {
                      actor: "consulting",
                      order: record,
                    },
                  });
                }}
              >
                <MdFactCheck size={30} />
                <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                  Chốt đơn hàng
                </p>
              </div>
            );
          }
        }
      },
    },
  ];
  const title = "Khách hàng đang tư vấn";
  return (
    <div>
      <Spin spinning={loading} indicator={<LoadingPage />}>
        <TableTemplate
          columns={columns}
          requests={requests}
          title={title}
          actor="consulting"
        >
          <Radio.Group
            block
            buttonStyle="solid"
            defaultValue="all"
            size="large"
            onChange={handleChangeType}
          >
            <Radio.Button value="all">Tất cả</Radio.Button>
            <Radio.Button value="construction">Thi công</Radio.Button>
            <Radio.Button value="maintenance">Dịch vụ</Radio.Button>
          </Radio.Group>
        </TableTemplate>
      </Spin>
    </div>
  );
}

export default OngoingConsultations;
