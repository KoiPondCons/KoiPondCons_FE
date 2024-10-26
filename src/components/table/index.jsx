import React from "react";
import { Radio, Table } from "antd";
import "./index.css";
import NavDashboard from "../../components/navbar-dashboard";
import PropTypes from "prop-types";
function TableTemplate({ children, columns, requests, title, actor }) {
  return (
    <div>
      <NavDashboard actor={actor}>
        <h1 style={{ textAlign: "center", fontSize: "2.5rem" }}>{title}</h1>
        {children}
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
TableTemplate.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ).isRequired,
  requests: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  actor: PropTypes.string.isRequired,
};
export default TableTemplate;
