import React from 'react'
import TableTemplate from '../../../components/table'
import './index.css'
function manageDesign() {
    const title = "Quản lí thiết kế";
  return (
    <div>
        <TableTemplate
        title={title}
        actor="manager">
        </TableTemplate>
    </div>
  )
}

export default manageDesign