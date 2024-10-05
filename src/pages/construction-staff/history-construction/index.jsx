import React from "react";
import "./index.css";
import TableTemplate from "../../../components/table";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function HistoryConstruction() {
  const navigate = useNavigate();
  const { id } = "1";
  const handleClick = (id) => {
    navigate(`/order-detail/1`);
  };
  const requests = [
    {
      construction_order_id: "123456",
      pond_address: "3154 Kiehn Branch",
      confirmed_date: "2071-12-08T06:37:42.547Z",
      customer_rating: "5",
    },
  ];
  const columns = [
    {
      title: "Mã dự án",
      dataIndex: "construction_order_id",
      key: "construction_order_id",
    },
    {
      title: "Địa chỉ",
      dataIndex: "pond_address",
      key: "pond_address",
    },
    {
      title: "Ngày bàn giao",
      dataIndex: "confirmed_date",
      key: "confirmed_date",
    },
    {
      title: "Đánh giá khách hàng",
      dataIndex: "customer_rating",
      key: "customer_rating",
      render: (text, record) => <span>{text} sao</span>,
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
  return (
    <div>
      <TableTemplate
        columns={columns}
        requests={requests}
        title="Lịch sử dự án"
        actor="construction"
      />
    </div>
  );
}

export default HistoryConstruction;
