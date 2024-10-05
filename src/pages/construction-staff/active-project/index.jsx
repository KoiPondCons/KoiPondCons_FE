import React from "react";
import "./index.css";
import TableTemplate from "../../../components/table";
import { Button, Col, Progress, Row } from "antd";
import NavDashboard from "../../../components/navbar-dashboard-construction";
import { RiDraftLine } from "react-icons/ri";

function ActiveProject() {
  return (
    <div>
      <NavDashboard>
        <h1>Thông tin dự án</h1>
        <Row gutter={60}>
          <Col span={12}>
            <label>Dịch vụ</label>
            <div className="display-input">
              <span> Thi công và thiết kế hồ cá</span>
            </div>
          </Col>
          <Col span={4}>
            <label>File thiết kế</label>
            <div className="display-input">
              {<RiDraftLine style={{ fontSize: "24px" }} />}
            </div>
          </Col>
          <Col span={4}>
            <div className="progress">
              <Progress type="circle" percent={14.2} />
            </div>
          </Col>
          <Col span={16}>
            <label>Địa chỉ thi công</label>
            <div className="display-input">
              <span> 15 Long Hưng, P.7, Q.Tân Bình</span>
            </div>
          </Col>
          <Col span={4}>
            <h3 style={{ textAlign: "center", margin: " 20px 20px 0px 20px" }}>
              Tiến độ
            </h3>
          </Col>
        </Row>

        <h1>Bảng công việc</h1>
        <Row gutter={60}>
          <Col span={16}>
            <div className="display-input">
              <span> Đổ bê tông, chống thấm thành hồ, đáy hồ và hầm lọc.</span>
            </div>
            <div className="display-input">
              <span> Công tác M&E đấu nối điện nước sân vườn</span>
            </div>
            <div className="display-input">
              <span> Hệ thống lọc nước.</span>
            </div>
            <div className="display-input">
              <span> Thi công kè đá nghệ thuật</span>
            </div>
            <div className="display-input">
              <span> Thi công lắp đặt đèn đá Nhật.</span>
            </div>
            <div className="display-input">
              <span> Thi công sàn gỗ hầm lọc.</span>
            </div>
            <div className="display-input">
              <span>
                {" "}
                Thi công phối kết cây bụi và hoa tạo cảnh nghệ thuật 
              </span>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ fontSize: "16px", padding: "10px" }}>
              Đã xong ngày 30/09/2024
            </div>
            <Button className="button-template" style={{ margin: "10px" }}>
              Nhấn hoàn tất
            </Button>
          </Col>
        </Row>
      </NavDashboard>
    </div>
  );
}

export default ActiveProject;
