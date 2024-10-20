import React from 'react'
import './index.css'
import paySuccess from "../../../images/payment-fail.png";
import { useNavigate } from 'react-router-dom';
function payFailed() {
    const navigate = useNavigate(); 
    return (
        <div className='notfound404-container'>
            <div className='notfound404-shape'>
                <div style={{ margin: "0px auto" }}><img src={paySuccess} alt="" /></div>
                <h1>Thanh toán thất bại</h1>
                <p>Oops! Đã có lỗi xảy ra</p>
                <p>Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.
                </p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <button onClick={() => navigate('/homepage')}>VỀ TRANG CHỦ</button>
                    <button onClick={() => navigate('/history')}>XEM LỊCH SỬ ĐƠN HÀNG</button>
                </div>
            </div>
        </div>
    );
}

export default payFailed
