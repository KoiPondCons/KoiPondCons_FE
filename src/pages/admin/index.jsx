import React from 'react';
import './index.css';
import NavDashboard from '../../components/navbar-dashboard'; // Đổi tên thành chữ hoa
import { Table } from "antd";

function Index() { // Đổi tên thành chữ hoa
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  
  return (
    <div>
      <div className='authen-template-dashboard'>
      <div className='sidebar'>
        <a href="admin  "><img className='dashboard' src="https://media.discordapp.net/attachments/1281613412111225009/1289420986487148599/Group_145.png?ex=66fa13df&is=66f8c25f&hm=2af1dcbe9f8fff8306a5677d7871d06aa728298eb80c368778a66fb2f101da48&=&format=webp&quality=lossless" alt="" /></a>
        <ul>
          <li><a href="">Khách hàng cần tư vấn</a></li>
          <li><a href="">Khách hàng đang tư vấn</a></li>
          <li><a href="">Đơn hàng đã tạo</a></li>
          <li><a href="">Hồ sơ của tôi</a></li>
        </ul>

      </div>
      
      <div className='content'>
        {/* Nội dung chính của dashboard sẽ được hiển thị ở đây */}
        <NavDashboard /> {/* Đổi tên thành chữ hoa */}
        <h1>Khách hàng cần tư vấn</h1>
        <hr className="divider"></hr>
        <Table dataSource={dataSource} columns={columns} />
        {/* Thêm bảng hoặc nội dung khác ở đây */}
      </div>
    </div>
    </div>
  )
}

export default Index; // Đổi tên thành chữ hoa