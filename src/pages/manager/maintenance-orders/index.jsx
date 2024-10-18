import React from 'react'
import TableTemplate from '../../../components/table'
import './index.css'
function maintenanceOrders() {
    const title = "Quản lí đơn bảo trì";
  return (
    <div>
        <TableTemplate
        title={title}
        actor="manager">
        </TableTemplate>
    </div>
  )
}

export default maintenanceOrders