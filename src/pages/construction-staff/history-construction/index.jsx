import React, { useEffect, useState } from "react";
import "./index.css";
import TableTemplate from "../../../components/table";
import { Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function HistoryConstruction() {
  const navigate = useNavigate();
  const [listOrder, setListOrder] = useState([]);
  const [isOrderListFetched, setOrderListFetched] = useState(false);

  const fetchConstructedOrder = async () => {
    try {
      const response = await api.get("/orders/constructor/current/finished");
      setListOrder(response.data);
      console.log("Fetch order list successfully!");
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    } finally {
      setOrderListFetched(true);
    }
  };

  useEffect(() => {
    fetchConstructedOrder();
  }, []);

  const handleClick = (id) => {
    navigate(`construction-order-detail/${id}`);
  };
  
  const columns = [
    {
      title: "Mã dự án",
      dataIndex: "id",
      key: "id",
      width: "150px",
    },
    {
      title: "Địa chỉ thi công",
      dataIndex: "pondAddress",
      key: "pondAddress",
      width: "550px",
    },
    {
      title: "Ngày bàn giao",
      dataIndex: "confirmedDate",
      key: "confirmedDate",
      width: "200px",
      render: (text) => {
        return `${dayjs(text).format('DD/MM/YYYY')}`;
    },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Button
          className="button-template"
          type="primary"
          onClick={() => handleClick(record.id)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  if (!isOrderListFetched) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    );
  }

  return (
    <div>
      <TableTemplate
        columns={columns}
        requests={listOrder}
        title="Lịch sử dự án"
        actor="construction"
      />
    </div>
  );
}

export default HistoryConstruction;
