import React, { useEffect, useState } from "react";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import "./index.css";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

function customerProfileManagement() {
  const title = "QUẢN LÍ HỒ SƠ KHÁCH HÀNG";
  const [customer, setCustomer] = useState([]);
  const role = "CUSTOMER";
  const navigate = useNavigate();
  const fetchCustomer = async () => {
    try {
      const response = await api.get(`account/role/${role}`);
      setCustomer(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };
  useEffect(() => {
    fetchCustomer();
  }, []);
  const handleDelete = async (id) => {
    await api.delete(`account/delete/${id}`);
    fetchCustomer();
  };
  const handleDeleteConfirmation = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => handleDelete(id),
    });
  };

  const columns = [
    {
      title: "Mã khách hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Chức năng",
      dataIndex: "customerDetail",
      key: "customerDetail",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <BiSolidUserDetail
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(
                  `/manager/customer-profile-management/customer-information/${record.id}`,
                  {
                    state: {
                      actor: "manager",
                    },
                  }
                );
              }}
            />
            <p style={{ fontSize: "10px", fontStyle: "italic" }}>Chi tiết</p>
          </div>
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <MdDeleteOutline
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() => handleDeleteConfirmation(record.id)}
            />
            <p style={{ fontSize: "10px", fontStyle: "italic" }}>Xóa</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <TableTemplate
        title={title}
        columns={columns}
        requests={customer}
        actor="manager"
      ></TableTemplate>
    </div>
  );
}

export default customerProfileManagement;
