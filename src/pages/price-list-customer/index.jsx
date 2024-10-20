import React, { useEffect, useState } from "react";
import { Table } from "antd";
import api from "../../config/axios";
import "./index.css";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Bill from "../../components/bill";

function PriceListCustomer() {
  const { id } = useParams();
  const location = useLocation();
  const actor = location.state?.actor || "customer";
  const [constructionOrder, setConstructionOrder] = useState({});
  const [comboConstructionItems, setComboConstructionItems] = useState([]);
  const [comboPrice, setComboPrice] = useState();

  const fetchConstructionOrder = async () => {
    try {
      const response = await api.get(`orders/${id}`);
      setConstructionOrder(response.data);
      const comboId = response.data.quotationResponse.combo.id;
      console.log(comboId.data);
      console.log("fetchConstructionOrder");
      console.log(response.data);
      console.log("Actor: " + actor);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchConstructionItems = async () => {
    try {
      const response = await api.get(
        `comboconstructionitems/combo/${constructionOrder.quotationResponse.combo.id}`
      );
      setComboConstructionItems(response.data);
      console.log("fetchConstructionItems");
      console.log(response.data);
    } catch (error) {
      console.log("Bug at fetchConstructionItems, " + error);
    }
  };
  const fetchComboPrice = async () => {
    try {
      const response = await api.get(
        `comboprices/combo/volume/${constructionOrder.quotationResponse.combo.id}/${constructionOrder.quotationResponse.pondVolume}`
      );
      setComboPrice(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Bug at fetchComboPrice, " + error);
    }
  };
  useEffect(() => {
    fetchConstructionOrder();
  }, []);
  useEffect(() => {
    fetchConstructionItems();
    fetchComboPrice();
  }, [constructionOrder]);

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
      render: (text) => <span>{text} ngày</span>,
    },
  ];

  return (
    <div style={{ backgroundColor: "white", height: "auto" }}>
      <Header />
      <div className="price-list-staff-container">
        <div className="price-list-staff-result">
          <h1>Chi tiết hạng mục</h1>
          <Table
            className="table-template"
            dataSource={comboConstructionItems}
            columns={columnsPackage}
            pagination={false}
          />
        </div>

        <Bill
          constructionOrder={constructionOrder}
          actor={actor}
          unitPrice={comboPrice?.unitPrice}
          selectCombo={constructionOrder?.quotationResponse?.combo?.id}
          // pondVolume={constructionOrder.quotationResponse.pondVolume}
          // promotionList={promotionList}
          // comboId={selectedCombo}
          // quotationId={constructionOrder.quotationResponse.id}
          // onPromotionDeleted={fecthPromotionList}
        />
        <Footer />
      </div>
    </div>
  );
}

export default PriceListCustomer;
