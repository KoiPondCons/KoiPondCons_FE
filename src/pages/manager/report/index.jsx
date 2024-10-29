import React from "react";
import TableTemplate from "../../../components/table";
import NavDashboard from "../../../components/navbar-dashboard";

function Report() {
  const title = "Báo cáo doanh thu";
  return (
    <div>
      <NavDashboard actor="manager">
        <h1 style={{ textAlign: "center" }}>{title}</h1>
      </NavDashboard>
    </div>
  );
}

export default Report;
