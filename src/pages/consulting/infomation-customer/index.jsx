import React, { useEffect, useState } from "react";
import NavDashboard from "../../../components/navbar-dashboard";
import { Button, Col, Form, Row, Select, Table } from "antd";
import api from "../../../config/axios";
import "../../../utils/common.css";
import FormItem from "antd/es/form/FormItem";
import { useLocation, useParams } from "react-router-dom";
function InfomationCustomer() {
  const { id } = useParams();
  const location = useLocation();
  const actor = location.state;
  const [listCombo, setListCombo] = useState([]);
  const [selectedCombo, setSelectedCombo] = useState(null);
  const [constructionOrder, setConstructionOrder] = useState(null);
  const [comboConstructionItems, setComboConstructionItems] = useState([]);
  const [unitPrice, setUnitPrice] = useState();
  const [promotionList, setPromotionList] = useState([]);
  const columnsPackage = [
    {
      title: "STT",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Đặc tả",
      dataIndex: "itemContent",
      key: "itemContent",
    },
    {
      title: "Thời lượng thi công",
      dataIndex: "duration",
      key: "duration",
      width: 200,
      render: (text, record) => (
        <span style={{ textAlign: "center" }}>{text} ngày</span>
      ),
    },
  ];
  const fecthCombo = async () => {
    try {
      const response = await api.get("combos");
      setListCombo(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchConstructionOrder = async () => {
    try {
      const response = await api.get(`orders/${id}`);
      setConstructionOrder(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fecthCombo();
    fetchConstructionOrder();
  }, []);

  useEffect(() => {
    if (constructionOrder) {
      console.log(constructionOrder.data);
    }
  }, [constructionOrder]);

  const handleSelectChange = (value) => {
    setSelectedCombo(value);
    console.log("Selected combo:", value);
  };

  const fetchConstructionItems = async () => {
    try {
      if (selectedCombo) {
        const response = await api.get(
          `comboconstructionitems/combo/${selectedCombo}`
        );
        setComboConstructionItems(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log("Bug at fetchConstructionItems, " + error);
    }
  };
  const fetchUnitPrice = async () => {
    try {
      const response = await api.get(
        `comboprices/combo/volume/${selectedCombo}/${constructionOrder.quotation.pondVolume}`
      );
      setUnitPrice(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Bug at fetchUnitPrice, " + error);
    }
  };
  const fecthPromotionList = async () => {
    try {
      const response = await api.get(
        `promotions/customer/${constructionOrder.customer.id}`
      );
      setPromotionList(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Bug at fecthPromotion, " + error);
    }
  };
  useEffect(() => {
    fetchConstructionItems();
    fetchUnitPrice();
    fecthPromotionList();
  }, [selectedCombo]);
  useEffect(() => {
    if (unitPrice) {
      console.log(unitPrice.data);
    }
  }, [unitPrice]);
  const isComboSelected = selectedCombo !== null;
  let totalDiscountPrice = 0;
  promotionList.forEach((promotion) => {
    const discountPrice =
      promotion.discountPercent *
      unitPrice.unitPrice *
      constructionOrder.quotation.pondVolume;
    totalDiscountPrice += discountPrice;
  });
  return (
    <NavDashboard actor={actor}>
      <h1>THÔNG TIN ĐƠN HÀNG</h1>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col span={8}>
            <label>Họ tên</label>
            <div className="display-input">
              <span>
                {constructionOrder ? constructionOrder.customerName : "N/A"}
              </span>
            </div>
          </Col>
          <Col span={8}>
            <label>Số điện thoại</label>
            <div className="display-input">
              <span>
                {constructionOrder ? constructionOrder.customerPhone : "N/A"}
              </span>
            </div>
          </Col>
          <Col span={8}>
            <label>Email</label>
            <div className="display-input">
              <span>
                {constructionOrder
                  ? constructionOrder.customer.account.email
                  : "N/A"}
              </span>
            </div>
          </Col>
          <Col span={16}>
            <label>Địa chỉ thi công</label>
            <div className="display-input">
              <span>
                {constructionOrder ? constructionOrder.pondAddress : "N/A"}
              </span>
            </div>
          </Col>
          <Col span={8}>
            <label>Thể tích hồ</label>
            <div className="display-input">
              <span>
                {constructionOrder && constructionOrder.quotation
                  ? constructionOrder.quotation.pondVolume
                  : "N/A"}
              </span>
            </div>
          </Col>
          <Col span={24}>
            <label>Nội dung khách hàng yêu cầu</label>
            <div className="display-input" style={{ textAlign: "justify" }}>
              {constructionOrder
                ? constructionOrder.customerDescription
                : "N/A"}
            </div>
          </Col>
          <Col span={12}>
            <FormItem
              name="comboId"
              label="Gói"
              key="packages"
              rules={[{ required: true, message: "Vui lòng chọn gói!" }]}
            >
              <Select placeholder="Chọn gói" onChange={handleSelectChange}>
                {listCombo.map((combo) => (
                  <Select.Option key={combo.id} value={combo.id}>
                    {combo.name}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </Col>
          <Col span={12} style={{ display: "flex", alignItems: "center" }}>
            <Button>Tạo bảng báo giá</Button>
          </Col>
        </Row>
      </Form>
      {isComboSelected && (
        <>
          <div className="price-list-staff-result">
            <h1>Chi tiết hạng mục</h1>
            <Table
              className="table-template"
              dataSource={comboConstructionItems}
              columns={columnsPackage}
              pagination={false}
            />
          </div>
          <div className="container">
            <div className="card cart">
              <label className="title">BÁO GIÁ</label>
              <div className="steps">
                <div className="step" style={{ maxWidth: "100%" }}>
                  <div className="payments">
                    <p>ƯỚC LƯỢNG</p>
                    <div className="details">
                      <span style={{ fontWeight: "bold" }}>Đơn giá</span>
                      <span style={{ textAlign: "right" }}>
                        <span style={{ textAlign: "right" }}>
                          {unitPrice
                            ? `${new Intl.NumberFormat("vi-VN").format(
                                unitPrice.unitPrice
                              )} VND/m3`
                            : "Loading VND/m3"}
                        </span>
                      </span>
                      <span style={{ fontWeight: "bold" }}>Thể tích</span>
                      <span style={{ textAlign: "right" }}>
                        {constructionOrder.quotation.pondVolume} m3
                      </span>
                    </div>
                    <hr />
                    <p style={{ marginTop: "20px" }}>THANH TOÁN</p>
                    <div className="details">
                      <span style={{ fontWeight: "bold" }}>Thành tiền</span>
                      <span style={{ textAlign: "right" }}>
                        {unitPrice
                          ? `${new Intl.NumberFormat("vi-VN").format(
                              unitPrice.unitPrice *
                                constructionOrder.quotation.pondVolume
                            )} VND`
                          : "Loading VND"}
                      </span>

                      {promotionList.map((promotion) => (
                        <>
                          <span style={{ fontWeight: "bold" }}>Giảm giá</span>
                          <span style={{ textAlign: "right" }}>
                            {promotion.content}
                          </span>
                          <span style={{ fontWeight: "bold" }}></span>
                          <span style={{ textAlign: "right", gap: "1px" }}>
                            {new Intl.NumberFormat("vi-VN").format(
                              promotion.discountPercent *
                                unitPrice.unitPrice *
                                constructionOrder.quotation.pondVolume
                            )}{" "}
                            VND
                          </span>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card checkout">
              <div className="footer">
                <label className="price">
                  {unitPrice
                    ? `${new Intl.NumberFormat("vi-VN").format(
                        unitPrice.unitPrice *
                          constructionOrder.quotation.pondVolume -
                          totalDiscountPrice
                      )} VND`
                    : "Loading VND"}
                </label>
                <button className="checkout-btn">Gửi báo giá</button>
              </div>
            </div>
          </div>
        </>
      )}
    </NavDashboard>
  );
}

export default InfomationCustomer;
