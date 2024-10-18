import React from 'react'
import TableTemplate from '../../../components/table'
import './index.css'

function customerProfileManagement() {
    const title = "Quản lí hồ sơ khách hàng";
  return (
    <div>
        <TableTemplate
        title={title}
        actor="manager">
        </TableTemplate>
    </div>
  )
}

export default customerProfileManagement