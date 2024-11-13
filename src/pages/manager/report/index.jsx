import React, { useEffect, useState } from "react";
import NavDashboard from "../../../components/navbar-dashboard";
import api from "../../../config/axios";
import { Button, Card, Col, Row, Select, Statistic } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const { Option } = Select;

function Report() {
  const title = "BẢNG ĐIỀU KHIỂN";
  const [stats, setStats] = useState();
  const [revenue, setRevenue] = useState([]);
  const [selectedYear, setSelectedYear] = useState();
  const [dataBar, setDataBar] = useState([]);
  const [formatData, setFormatData] = useState([]);
  const pieColor = ["#0088FE", "#00C49F", "#FFBB28"];

  const fetchStats = async () => {
    try {
      const response = await api.get("manager/dashboard-stats");
      console.log(response.data);
      setStats(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchRevenue = async () => {
    try {
      const response = await api.get("manager/monthly-revenue");
      console.log(response.data);
      setRevenue(response.data);
      setSelectedYear(response.data[response.data.length - 1].year);
      setDataBar(response.data[response.data.length - 1].monthlyRevenue);
      console.log("selected year:", response.data[response.data.length - 1]);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleYearChange = (value) => {
    console.log(value);
    const selectedRevenue = revenue.find((yearInfo) => yearInfo.year === value);
    if (selectedRevenue) {
      setSelectedYear(value);
      setDataBar(selectedRevenue.monthlyRevenue);
    }
  };

  const exportRevenueReport = () => {
    const doc = new jsPDF();

    doc.setFont("Helvetica");
    doc.setFontSize(20);
    doc.text(`Báo cáo doanh thu năm ${selectedYear}`, 14, 20);
    doc.setFontSize(12);

    const columns = [
      { header: "Tháng", dataKey: "month" },
      { header: "Doanh thu (VNĐ)", dataKey: "revenue" },
    ];

    const data = formatData.map((item) => ({
      month: item.month,
      revenue: new Intl.NumberFormat("vi-VN").format(item.revenue),
    }));

    doc.autoTable({
      columns,
      body: data,
      startY: 30,
      theme: "grid",
      styles: {
        font: "Helvetica",
      },
    });

    doc.save(`Doanh_thu_nam_${selectedYear}.pdf`);
  };

  useEffect(() => {
    fetchStats();
    fetchRevenue();
  }, []);

  useEffect(() => {
    setFormatData(
      dataBar.map((item) => ({
        month: `Tháng ${item.month}`,
        revenue: item.revenue,
      }))
    );
  }, [dataBar]);

  return (
    <div>
      <NavDashboard actor="manager">
        <h1 style={{ textAlign: "center" }}>{title}</h1>
        <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Tài khoản khách hàng"
                value={stats?.totalCustomerAccounts}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Khách hàng dùng dịch vụ"
                value={stats?.totalCustomersUsedService}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Đơn hàng thi công"
                value={stats?.totalConstructionProjects}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Đơn hàng bảo dưỡng"
                value={stats?.totalMaintenanceOrders}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
          }}
        >
          <PieChart width={300} height={350}>
            <Pie
              data={stats?.totalOrdersByCombo}
              dataKey="totalOrders"
              nameKey="comboName"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {stats?.totalOrdersByCombo.map((item, index) => (
                <Cell key={index} fill={pieColor[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
          <div>
            <h3 style={{ textAlign: "center", marginTop: "50px" }}>
              Doanh thu
            </h3>
            <div style={{ textAlign: "right" }}>
              <label>Năm:</label>
              <Select
                value={selectedYear}
                onChange={handleYearChange}
                style={{ width: 90, margin: 16 }}
              >
                {revenue.map((yearInfo, index) => (
                  <Option key={index} value={yearInfo.year} />
                ))}
              </Select>
            </div>
            <BarChart
              width={700}
              height={300}
              data={formatData}
              margin={{ left: 50, right: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) =>
                  `${new Intl.NumberFormat("vi-VN").format(value)}`
                }
              />
              <Tooltip
                formatter={(value) => [
                  `${new Intl.NumberFormat("vi-VN").format(value)} VNĐ`,
                  "Doanh thu",
                ]}
              />
              <Legend formatter={() => "Doanh thu tháng (VNĐ)"} />
              <Bar dataKey="revenue" fill="#8884d8" barSize={100} />
            </BarChart>
          </div>
        </div>
        <Button style={{ float: "right" }} onClick={exportRevenueReport}>
          Xuất báo cáo
        </Button>
      </NavDashboard>
    </div>
  );
}

export default Report;
