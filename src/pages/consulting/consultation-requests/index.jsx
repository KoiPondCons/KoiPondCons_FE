import React, { useEffect, useState } from "react";
import { Button, Modal, Radio, Spin } from "antd";
import "./index.css";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../components/loading";

function ConsultationRequests() {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedServiceType, setSelectedServiceType] = useState("all");

  const fetchRequest = async () => {
    setLoading(true);
    try {
      let maintenanceOrder;
      let constructionOrder;
      let order;

      if (selectedServiceType === "maintenance") {
        maintenanceOrder = await api.get("maintenance/requested-orders");
        console.log(maintenanceOrder.data);
        setRequests(
          maintenanceOrder.data.map((req) => ({
            ...req,
            serviceType: "maintenance",
          }))
        );
      } else if (selectedServiceType === "construction") {
        constructionOrder = await api.get("orders/requested");
        console.log(constructionOrder.data);
        setRequests(
          constructionOrder.data.map((req) => ({
            ...req,
            serviceType: "construction",
          }))
        );
      }
      console.log(maintenanceOrder.data);
      console.log(constructionOrder.data);
      setRequests(order);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSelectedServiceType = (e) => {
    setSelectedServiceType(e.target.value);
  };
  useEffect(() => {
    fetchRequest();
  }, [selectedServiceType]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 30,
    },
    {
      title: "Họ tên",
      dataIndex: "customerName",
      key: "customerName",
      width: 200,
    },
    {
      title: "Số điện thoại",
      dataIndex: "customerPhone",
      key: "customerPhone",
      width: 150,
    },
    {
      title: "Nội dung",
      dataIndex: "customerDescription",
      key: "customerDescription",
      render: (text) => <div className="description-cell">{text}</div>,
      width: 300,
    },
    {
      title: "Loại dịch vụ",
      width: 100,
      render: (record) => {
        if (record.serviceType === "construction") return <p>Thi công</p>;
        else return <p>Dịch vụ</p>;
      },
    },
    {
      title: "Chức năng",
      key: "actions",
      width: 100,
      render: (_, record) => {
        const handleAssignConsultant = async () => {
          try {
            if (record.serviceType === "maintenance") {
              record.status = "PENDING";
              await api.put(`maintenance/set-consultant/${record.id}`);
              await api.put(`maintenance/${record.id}`, record);
            } else {
              record.status = "PROCESSING";
              await api.put(`orders/consultant/${record.id}`, record);
              await api.put(`orders/${record.id}`, record);
            }
          } catch (error) {
            console.error("Error updating order:", error);
          }
        };

        return (
          <Button
            className="button-template"
            type="primary"
            onClick={() => {
              handleAssignConsultant();
              navigate(`/consulting/approve-order`, {
                state: {
                  actor: "consulting",
                  order: record,
                },
              });
            }}
          >
            Tư vấn
          </Button>
        );
      },
    },
  ];

  const title = "Khách hàng cần tư vấn";

  return (
    <div>
      <Spin spinning={loading} indicator={<LoadingPage />}>
        <TableTemplate
          columns={columns}
          requests={requests}
          title={title}
          actor="consulting"
        >
          <div className="radio-filter">
            <Radio.Group
              block
              buttonStyle="solid"
              defaultValue="construction"
              size="large"
              onChange={handleChangeSelectedServiceType}
            >
              <Radio.Button value="construction">Thi công</Radio.Button>
              <Radio.Button value="maintenance">Dịch vụ</Radio.Button>
            </Radio.Group>
          </div>
        </TableTemplate>
      </Spin>
    </div>
  );
}

export default ConsultationRequests;
