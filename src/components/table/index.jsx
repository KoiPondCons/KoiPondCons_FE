import React  from "react";
import {Table } from "antd";
import "./index.css";
import NavDashboard from "../../components/navbar-dashboard";
function TableTemplate({columns, requests, title}) {

  return (
    <div>
      <NavDashboard>
        <h1>{title}</h1>

        <Table
          className="table-template"
          columns={columns}
          dataSource={requests}
          pagination={{ pageSize: 8 }}
        />
      </NavDashboard>
    </div>
  );
}

export default TableTemplate;
