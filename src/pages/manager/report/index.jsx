import React from "react";
import TableTemplate from "../../../components/table";

function Report() {
  const title = "Báo cáo doanh thu";
  return (
    <div>
      <TableTemplate title={title} actor="manager"></TableTemplate>
    </div>
  );
}

export default Report;
