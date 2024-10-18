import React from 'react'
import TableTemplate from '../../../components/table'
import './index.css'
function manageQuote() {
    const title = "Quản lí báo giá";
  return (
    <div>
        <TableTemplate
        title={title}
        actor="manager">
        </TableTemplate>
    </div>
  )
}

export default manageQuote