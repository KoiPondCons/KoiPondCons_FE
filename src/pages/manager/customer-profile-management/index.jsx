import React,{useEffect, useState } from 'react'
import TableTemplate from '../../../components/table';
import api from "../../../config/axios";
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import './index.css'

function customerProfileManagement() {
    const title = "Quản lí hồ sơ khách hàng";
    const [customer, setCustomer] = useState([]);
    const role = "CUSTOMER";
    const navigate = useNavigate();
    const handleDelete = async (id) => {
      await api.delete(`delete/${id}`);
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
        title: "Chi tiết",
        dataIndex: "customerDetail",
        key: "customerDetail",
        render: (text, record) => (
          <Button type="link" onClick={() => navigate(`customer-information/${record.id}`)}>Chi tiết</Button>
        ),
      },
      {
        title: "Xóa",
        dataIndex: "delete",
        key: "delete",
        render: (text, record) => (
          <Button type="link" onClick={() => handleDeleteConfirmation(record.id)}>Xóa</Button>
        ),
      }
    ]

    const fetchCustomer = async () => {
      try {
        const response = await api.get(`role/${role}`);
        setCustomer(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      }
    };
    useEffect(() => {
      fetchCustomer();
    }, []);
  return (
    <div>
        <TableTemplate
        title={title}
        columns={columns}
        requests={customer}
        actor="manager">
        </TableTemplate>
    </div>
  )
}

export default customerProfileManagement
