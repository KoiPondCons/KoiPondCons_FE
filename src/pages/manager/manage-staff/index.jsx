import React,{ useEffect, useState } from 'react'
import TableTemplate from '../../../components/table'
import api from '../../../config/axios'
function manageStaff() {
    const [staffs, setStaffs] = useState([]);
    const role = "CONSULTANT";
    const fetchStaffs = async () => {
        const response = await api.get("role/staff");
        setStaffs(response.data);
        console.log(response.data);
    }
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