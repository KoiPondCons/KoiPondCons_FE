import React from 'react'
import TableTemplate from '../../../components/table'
import './index.css'

function constructionOrders() {
    const title = "Quản lí đơn thi công";
  return (
    <div>
        <TableTemplate
        title={title}
        actor="manager">
        </TableTemplate>
    </div>
  )
}

export default constructionOrders