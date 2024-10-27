import React, { useEffect, useState } from "react";
import TableTemplate from "../../../components/table";
import "./index.css";
import { Button, Radio } from "antd";
import api from "../../../config/axios";
function maintenanceOrders() {
  const title = "Quản lí đơn bảo trì";
  const [maintenanceOrders, setMaintenanceOrders] = useState();
  const [selectedType, setSelectedType] = useState("all");
  const fetchMaintenanceOrders = async () => {
    let response;
    try {
      if (selectedType === "all") {
        response = await api.get("maintenance/confirmed-orders");
      } else if (selectedType === "cancel") {
        response = await api.get("maintenance/processed-or-finished", {
          params: { status: "CANCELED" },
        });
      } else if (selectedType === "complete") {
        response = await api.get("maintenance/processed-or-finished", {
          params: { status: "FINISHED" },
        });
      } else if (selectedType === "construction") {
        response = await api.get("maintenance/processed-or-finished", {
          params: { status: "PROCESSING" },
        });
      }
      console.log(response.data);
      setMaintenanceOrders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMaintenanceOrders();
  }, [selectedType]);

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
      title: "Loại dịch vụ",
      width: 100,
      render: (_, record) => {
        return <p>{record.warranted === "true" ? "Bảo hành" : "Bảo dưỡng"}</p>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "statusDescription",
      key: "statusDescription",
      width: 100,
    },
    {
      title: "",
      key: "actions",
      width: 100,
      render: (_, record) => (
        <Button type="primary">
          {record.constructorName === null ? "Chỉ định xây dựng" : "Chi tiết"}
        </Button>
      ),
    },
  ];
  const handleChangeSelectedType = (e) => {
    setSelectedType(e.target.value);
  };
  return (
    <div>
      <TableTemplate
        title={title}
        actor="manager"
        columns={columns}
        requests={maintenanceOrders}
      >
        <Radio.Group
          block
          buttonStyle="solid"
          defaultValue="all"
          size="large"
          onChange={handleChangeSelectedType}
        >
          <Radio.Button value="all">Tất cả</Radio.Button>
          <Radio.Button value="cancel">Đơn bị hủy</Radio.Button>
          <Radio.Button value="complete">Đơn hoàn thành</Radio.Button>
          <Radio.Button value="construction">
            Đang thực hiện bảo trì
          </Radio.Button>
        </Radio.Group>
      </TableTemplate>
    </div>
  );
}

export default maintenanceOrders;
