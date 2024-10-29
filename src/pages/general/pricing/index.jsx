import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./index.css";
import CommonTemplate from '../../../components/common-page-template';
import { Table } from "antd";
import api from "../../../config/axios";
import price from '../../../images/baogia.png';
import { ConfigProvider } from "antd";
const title = 'Báo giá';
const context = 'Trang chủ » Báo giá';
const banner = 'https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/toby-sakata-lJ62jee7oSM-unsplash.jpg?alt=media&token=92c638c4-75d1-4441-932a-f804c3aacd4e';

function ListProject() {
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const basicId = 1;
  const popularId = 2;
  const premiumId = 3;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBasic = await api.get(`comboprices/combo/${basicId}`); // API cho Gói cơ bản
        const responsePopular = await api.get(`comboprices/combo/${popularId}`); // API cho Gói phổ thông
        const responsePremium = await api.get(`comboprices/combo/${premiumId}`); // API cho Gói cao cấp
        const formattedData = responseBasic.data.map((item, index) => ({
          basic: item.unitPrice, // Gói cơ bản
          popular: responsePopular.data[index]?.unitPrice || 'N/A', // Gói phổ thông
          premium: responsePremium.data[index]?.unitPrice || 'N/A', // Gói cao cấp
        }));
        setDataSource(formattedData);
        console.log(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Kích thước',
      dataIndex: 'size',
      key: 'size',
      render: (_, __, index) => sizes[index],
      align: 'center',
    },
    {
      title: 'Gói cơ bản',
      dataIndex: 'basic',
      key: 'basic',
      render: (text) => formatNumberWithCommas(text), // Định dạng giá trị
      align: 'center',
    },
    {
      title: 'Gói phổ thông',
      dataIndex: 'popular',
      key: 'popular',
      render: (text) => formatNumberWithCommas(text), // Định dạng giá trị
      align: 'center',
    },
    {
      title: 'Gói cao cấp',
      dataIndex: 'premium',
      key: 'premium',
      render: (text) => formatNumberWithCommas(text), // Định dạng giá trị
      align: 'center',
    },
  ];
  const sizes = [
    '8 - 10m3',
    '10 - 20m3',
    '20 - 50m3',
    '50 - 100m3',
    '100m3 trở lên',
  ];
  function formatNumberWithCommas(num) {
    if (num === 'N/A') return num; // Kiểm tra giá trị không hợp lệ
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }


  return (
    <div>
      <CommonTemplate title={title} context={context} banner={banner}>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", background: "white", padding: "100px 40px" }}>
          <img style={{ width: "60%", height: "auto" }} src={price} alt="" />
          <div style={{ marginTop: "2%" }}>
            <div className="notfound404-shape" style={{ display: "flex", justifyContent: "center", boxShadow: "none" }}>
              <button onClick={() => navigate('/contact')}>NHẬN TƯ VẤN NGAY</button>
            </div>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  fontSize: 20,
                },
              },
            }}
          >
            <Table
              columns={columns}
              dataSource={dataSource}
              style={{ background: "white", margin: "0px 40px" }}
            />
          </ConfigProvider>
        )}
      </CommonTemplate>
    </div>
  );
}

export default ListProject;
