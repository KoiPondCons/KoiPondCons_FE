import React, { useEffect, useState } from 'react'
import TableTemplate from '../../../components/table'
import api from '../../../config/axios'
import { MdDeleteOutline } from "react-icons/md";
import { Modal } from 'antd';

function manageStaff() {
    const [staffs, setStaffs] = useState([]);
    const role = "CONSULTANT";
    const fetchStaffs = async () => {
        const response = await api.get("role/staff");
        setStaffs(response.data);
        console.log(response.data);
    };
    const handleDeleteConfirmation = (id) => {
        Modal.confirm({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa không?',
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: () => handleDelete(id),
        });
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`delete/${id}`);
            fetchStaffs();
        } catch (error) {
            console.error("Lỗi khi xóa nhân viên:", error);
        }
    };
    useEffect(() => {
        fetchStaffs();
    }, []);
    const columns = [
        {
            title: "Mã nhân viên",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Họ tên",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Vị trí",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Chi tiết",
            dataIndex: "staffDetail",
            key: "staffDetail",
        },
        {
            title: "Xóa",
            key: "delete",
            render: (text, record) => {
                return (
                    <MdDeleteOutline style={{ fontSize: "40px", cursor: "pointer" }}
                        onClick={() => handleDeleteConfirmation(record.id)}>
                    </MdDeleteOutline>
                );
            }
        }
    ]
    const title = "Quản lí nhân sự";
    return (
        <div>
            <TableTemplate
                columns={columns}
                requests={staffs}
                title={title}
                actor="manager">
            </TableTemplate>
        </div>
    )
}

export default manageStaff