import React from 'react'
import './index.css'
import paySuccess from "../../../images/payment-success.png";
import { useNavigate } from 'react-router-dom';
function payFailed() {
    const navigate = useNavigate(); 
    return (
        <div className='notfound404-container'>
            <div className='notfound404-shape'>
                <div style={{ margin: "40px auto" }}><img src={paySuccess} alt="" /></div>
                <h1>Thanh toán thành công</h1>
                <p>Cám ơn quý khách đã tin tưởng và sử dụng dịch vụ của chúng tôi.</p>
                <p>Trở về trang chủ hoặc xem lịch sử đơn hàng.
                </p>
                <div className='notfound404-button' style={{display: "flex", justifyContent: "center"}}>
                    <button style={{backgroundColor: "#23c483", color: "white"}} onClick={() => navigate('/homepage')}>VỀ TRANG CHỦ</button>
                    <button style={{backgroundColor: "#23c483", color: "white"}} onClick={() => navigate('/history')}>XEM LỊCH SỬ ĐƠN HÀNG</button>
                </div>
            </div>
        </div>
    );
}

export default payFailed
