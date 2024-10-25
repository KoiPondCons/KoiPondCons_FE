import React, { useEffect, useState } from "react";
import { Button, Modal, Radio } from "antd";
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
  const [selectedServiceType, setSelectedServiceType] =
    useState("construction");
  const fetchRequest = async () => {
    setLoading(true);
    try {
      let response;
      if (selectedServiceType == "maintenance") {
        response = await api.get("maintenance/requested-orders");
      } else {
        response = await api.get("orders/status", {
          params: {
            status: "REQUESTED",
          },
        });
      }
      console.log(response.data);
      setRequests(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChangeSelectedServiceType = (e) => {
    const value = e.target.value;
    setSelectedServiceType(value);
    console.log(value);
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  useEffect(() => {
    fetchRequest();
  }, [selectedServiceType]);

  const showModal = (record) => {
    setSelectedOrder(record);
    console.log(record);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    selectedOrder.status = "PROCESSING";
    console.log(selectedOrder);
    await api.put(`orders/consultant/${selectedOrder.id}`);
    await api.put(`orders/${selectedOrder.id}`, selectedOrder);
    console.log("Update order status success");
    navigate(`/consulting/price-list-staff/${selectedOrder.id}`, {
      state: { actor: "consulting" },
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
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
      title: "",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <>
          {selectedServiceType === "construction" ? (
            <>
              <Button
                className="button-template"
                type="primary"
                onClick={() => showModal(record)}
              >
                Tư vấn
              </Button>
              <Modal
                title="Xác nhận tư vấn"
                open={isModalOpen && selectedOrder?.id === record.id}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Khách: {record.customerName}</p>
                <p>Số điện thoại: {record.customerPhone}</p>
              </Modal>
            </>
          ) : (
            <div></div>
          )}
        </>
      ),
    },
  ];
  const title = "Khách hàng cần tư vấn";
  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <TableTemplate
          columns={columns}
          requests={requests}
          title={title}
          actor="consulting"
        >
          <div className="radio-filter">
            <Radio.Group
              block
              defaultValue="a"
              size="large"
              onChange={handleChangeSelectedServiceType}
            >
              <Radio.Button value="construction">Thi công</Radio.Button>
              <Radio.Button value="maintenance">Dịch vụ</Radio.Button>
            </Radio.Group>
          </div>
        </TableTemplate>
      )}
    </div>
  );
}

export default ConsultationRequests;
