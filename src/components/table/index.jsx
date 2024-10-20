import React from "react";
import { Table } from "antd";
import "./index.css";
import NavDashboard from "../../components/navbar-dashboard";
import PropTypes from "prop-types";
function TableTemplate({ columns, requests, title, actor }) {
  return (
    <div>
      <NavDashboard actor={actor}>
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
