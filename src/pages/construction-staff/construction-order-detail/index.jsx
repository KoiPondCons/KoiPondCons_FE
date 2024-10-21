import React, { useEffect, useState } from "react";
import api from "../../../config/axios";
import { Button, Col, Modal, Progress, Row, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import NavDashboard from "../../../components/navbar-dashboard";
import { RiDraftLine } from "react-icons/ri";
import OrderInfor from "../../../components/order-information";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import ProgressConstruction from "../../../components/progress-construction";

function ConstructionOrderDetail() {
  return (
    <div>
      <NavDashboard actor="construction">
        <ProgressConstruction />
      </NavDashboard>
    </div>
  );
}

export default ConstructionOrderDetail;
