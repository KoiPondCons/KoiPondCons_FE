import React, { useState, useEffect } from "react";
import NavDashboard from "../../components/navbar-dashboard";
import { Spin, Table, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import api from "../../config/axios";
import { useNavigate, useParams } from "react-router-dom";
import CustomerInformation from "../../components/customer-information"; // Import the component
import moment from "moment";
import { AiOutlineUnorderedList } from "react-icons/ai";

function CustomerInformationPageManager() {
  const [customerData, setCustomerData] = useState(null);
  const [historyCustomer, setHistoryCustomer] = useState();
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`account/id/${id}`);
      console.log(response.data);
      setCustomerData(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Không thể tải thông tin khách hàng");
      setLoading(false);
    }
  };
  const fetchHistoryCustomer = async () => {
    try {
      setLoadingHistory(true);
      const response = await api.get(`orders/customer/${id}`);
      console.log(response.data);
      setHistoryCustomer(response.data);
    } catch (error) {
      message.error("Không thể tải lịch sử đặt đơn khách hàng");
      console.error("fecthHistoryCustomer: " + error);
    } finally {
      setLoadingHistory(false);
    }
  };
  useEffect(() => {
    fetchCustomerData();
    fetchHistoryCustomer();
  }, []);
  if (loading) {
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    );
  }
  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Ngày đặt",
      key: "requestDate",
      render: (record) => (
        <p>{moment(record.requestDate).format("DD/MM/YYYY")}</p>
      ),
    },
    {
      title: "Trạng thái",
      key: "statusDescription",
      dataIndex: "statusDescription",
    },
    {
      title: "Hạn bảo hành",
      key: "warrantyEndDate",
      render: (record) => (
        <p>{moment(record.warrantyEndDate).format("DD/MM/YYYY")}</p>
      ),
    },
    {
      title: "Số lượt bảo hành",
      key: "warrantyRemaining",
      render: (record) => {
        if (record.warrantyEndDate == null) {
          return <p>Chưa có bảo hành</p>;
        }
        return <p>{record.warrantyRemaining} lần</p>;
      },
    },
    {
      title: "Chức năng",
      key: "action",
      render: (record) => {
        const actor = "manager";
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
      },
    },
  ];
  return (
    <NavDashboard actor="manager">
      <div>
        <CustomerInformation
          constructionOrder={customerData}
          userRole="manager"
          onFetchCustomerData={fetchCustomerData}
        >
          <h1>LỊCH SỬ</h1>
          <Table
            columns={columns}
            dataSource={historyCustomer}
            pagination={8}
          ></Table>
        </CustomerInformation>
      </div>
    </NavDashboard>
  );
}

export default CustomerInformationPageManager;
