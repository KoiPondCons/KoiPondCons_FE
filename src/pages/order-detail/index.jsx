import { Col, Form, Input, Popover, Row, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import NavDashboard from "../../components/navbar-dashboard-construction";
import { useParams } from "react-router-dom";
import "../../utils/table.css"
function Order() {
  const {id} = useParams();
  const [constructionOrder, setConstructionOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [packageItems, setPackageItems] = useState([]);
  useEffect(() => {
    const fetchConstructionOrder = async () => {
      try {
        const response = await axios.get(
          `https://66fa4cd2afc569e13a9b1aed.mockapi.io/ConstructionOrder/${id}`
        );
        setConstructionOrder(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchConstructionOrder();
  }, [id]);
  const apiPackage = "https://66fa4cd2afc569e13a9b1aed.mockapi.io/PackageConstructionItem";
  useEffect(() => {
    const fetchPackageConstructionItem = async () => {
      try {
        const response = await axios.get(apiPackage);
        setPackageItems(response.data); // Cập nhật state với dữ liệu gói
      } catch (err) {
        console.error(err);
      }
    };

    fetchPackageConstructionItem();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
    const dataSource = [
      {
        key: '1',
        installment: 'Chi phí xây',
        percentage: '',
        amount: 3300000,
        status: '',
        remaining: '', // Tổng số tiền còn lại
      },
      {
        key: '2',
        installment: 'Giảm Giá',
        percentage: '',
        amount: -300000,
        status: '',
        remaining: '',
      },
      {
        key: '3',
        installment: 'Tổng Sau Giảm',
        percentage: '',
        amount: 3000000,
        status: '',
        remaining: '',
      },
      {
        key: '4',
        installment: 'Đợt 1',
        percentage: '20%',
        amount: 600000,
        status: 'Đã Thanh Toán',
        remaining: 0,
      },
      {
        key: '5',
        installment: 'Đợt 2',
        percentage: '30%',
        amount: 900000,
        status: 'Chưa Thanh Toán',
        remaining: 900000,
      },
      {
        key: '6',
        installment: 'Đợt 3',
        percentage: '50%',
        amount: 1500000,
        status: 'Chưa Thanh Toán',
        remaining: 1500000,
      },
    
    ];
  
    const columns = [
      {
        title: 'Đợt Thanh Toán',
        dataIndex: 'installment',
        key: 'installment',
      },
      {
        title: 'Tỷ Lệ (%)',
        dataIndex: 'percentage',
        key: 'percentage',
      },
      {
        title: 'Số Tiền (VND)',
        dataIndex: 'amount',
        key: 'amount',
        render: (text) => text.toLocaleString('vi-VN'), // Định dạng số tiền
      },
      {
        title: 'Tình Trạng',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Còn Lại (VND)',
        dataIndex: 'remaining',
        key: 'remaining',
        render: (text) => text ? text.toLocaleString('vi-VN') : '', // Định dạng số tiền
      },
    ];

 
    const columnsPackage = [
      {
        title: "STT",
        key: "index",
        render: (text, record, index) => index + 1, 
      },
      {
        title: "Đặc tả",
        dataIndex: "item_content",
        key:"item_content",
      },
      {
        title: "Thời lượng thi công",
        dataIndex:"duration",
        key: "duration",
      }
      
    ]
  return (
    <NavDashboard>
      <div>
        <h1>THÔNG TIN ĐƠN HÀNG</h1>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={8}>
              <FormItem label={"Họ tên"}>
                <Input value={constructionOrder.customer_name} readOnly />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={"Số điện thoại"}>
                <Input value={constructionOrder.customer_phone} readOnly />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={"Email"}>
                <Input value={constructionOrder.customer_email} readOnly />
              </FormItem>
            </Col>
            <Col span={24}>
              <FormItem label={"Địa chỉ thi công"}>
                <Input value={constructionOrder.pond_address} readOnly />
              </FormItem>
            </Col>
            <Col span={10}>
              <FormItem label={"Trạng thái"}>
                <Input value={constructionOrder.status} readOnly />
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem label={"Gói"}>
                <Input value={constructionOrder.package_id} readOnly />
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem label={"Thể tích hồ"}>
                <Input value={constructionOrder.pond_volume} readOnly />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <h1>ĐẢM NHẬN VÀ TIẾN ĐỘ THI CÔNG</h1>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={4}>
              <div>Đây quăng cái hình tròn tiến độ vô đây nà</div>
              <h3>Tiến độ</h3>
              <a href="">Xem chi tiết</a>
            </Col>
            <Col span={20}>
              <FormItem label={"Tư vấn viên"}>
                <Input value={"Trần Kim Nhã"} readOnly />
              </FormItem>
              <FormItem label={"Nhà thiết kế"}>
                <Input value={"Trần Kim Nhã"} readOnly />
              </FormItem>
              <FormItem label={"Chịu trách nhiệm thi công"}>
                <Input value={"Trần Kim Nhã"} readOnly />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={"Ngày tiếp nhận"}>
                <Input value={constructionOrder.request_date} readOnly />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label={"File bản vẽ thiết kế"}>
                <Input value="FIle thiết kế chưa có (cú)" readOnly />
              </FormItem>
            </Col>
          </Row>
        </Form>
        <h1>Chi tiết gói</h1>
        <Table className="table-template" dataSource={packageItems} columns={columnsPackage} pagination={false} />
        <h1>Báo giá</h1>
        <Table className="table-template" dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    </NavDashboard>
  );
}
export default Order;
