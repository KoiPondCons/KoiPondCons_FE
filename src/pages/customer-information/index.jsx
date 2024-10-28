import React, { useState, useEffect } from 'react';
import NavDashboard from '../../components/navbar-dashboard';
import { Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import api from "../../config/axios";
import { useParams } from 'react-router-dom';
import CustomerInformation from '../../components/customer-information'; // Import the component

function CustomerInformationPageManager() {
  const [customerData, setCustomerData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchCustomerData();
  }, []);
  const { id } = useParams();
  const fetchCustomerData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`account/id/${id}`);
      console.log(response.data);
      setCustomerData(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Không thể tải thông tin khách hàng');
      setLoading(false);
    }
  };
  if (loading) {
    return <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />;
  }

  return (
    <NavDashboard actor="manager">
      <div>
        <CustomerInformation constructionOrder={customerData} userRole="manager" onFetchCustomerData={fetchCustomerData} />
      </div>  
    </NavDashboard>

  );
}

export default CustomerInformationPageManager;
