import React from 'react'
import NavbarDashboard from '../../../../components/navbar-dashboard'
import { ConfigProvider, Table, InputNumber } from 'antd'
import { useState, useEffect } from 'react';
import api from '../../../../config/axios';

function ConfigPrice() {
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

  const handleUpdatePrice = async (id, newPrice) => {
    try {
      // Gọi API để cập nhật giá
      await api.put(`comboprices/${id}`, { unitPrice: newPrice });
      // Cập nhật lại dữ liệu sau khi cập nhật thành công
      fetchData(); // Gọi lại hàm fetchData để lấy dữ liệu mới
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handlePriceChange = (id, value) => {
    // Gọi hàm cập nhật giá với debounce
    clearTimeout(window.priceUpdateTimeout);
    window.priceUpdateTimeout = setTimeout(() => {
      handleUpdatePrice(id, value);
    }, 1000); // Thời gian debounce 1 giây
  };

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
      render: (text, record) => (
        <InputNumber
          defaultValue={text}
          onChange={(value) => handlePriceChange(basicId, value)} // Cập nhật giá khi thay đổi
        />
      ),
      align: 'center',
    },
    {
      title: 'Gói phổ thông',
      dataIndex: 'popular',
      key: 'popular',
      render: (text, record) => (
        <InputNumber
          defaultValue={text}
          onChange={(value) => handlePriceChange(popularId, value)} // Cập nhật giá khi thay đổi
        />
      ),
      align: 'center',
    },
    {
      title: 'Gói cao cấp',
      dataIndex: 'premium',
      key: 'premium',
      render: (text, record) => (
        <InputNumber
          defaultValue={text}
          onChange={(value) => handlePriceChange(premiumId, value)} // Cập nhật giá khi thay đổi
        />
      ),
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
  return (
      <NavbarDashboard
        actor="manager"
      >
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
              pagination={false}
            />
          </ConfigProvider>
        )}
      </NavbarDashboard>
  )
}

export default ConfigPrice;