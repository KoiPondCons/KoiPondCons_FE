import React from 'react'
import './index.css'
import '@ant-design/icons';
import { BellOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';


function index() {
    return (
        <div class="navbar-admin">
            <div class="menu-icon">☰</div>
            <div class="greeting">Xin chào, admin!</div>
            <div class="icons">
                <BellOutlined className='icon noti' />
                <SettingOutlined className='icon setting' />
                <LogoutOutlined className='icon logout'/>
            </div>
        </div>
    )
}

export default index