import React from 'react';
import "./index.css"
import { useNavigate } from 'react-router-dom'; // Đảm bảo import đúng
import error from "../../../images/Error404.png";
function NotFound() {
    const navigate = useNavigate(); 

    return (
        <div className='notfound404-container'>
            <div className='notfound404-shape'>
                <div><img src={error} alt="" /></div>
                <h1>Oops! Đã có lỗi xảy ra</h1>
                <p>Trang bạn đang tìm không tồn tại hoặc đã bị xoá.                </p>
                <p>Click vào nút bên dưới để quay lại trang chủ.
                </p>
                <button onClick={() => navigate('/homepage')}>VỀ TRANG CHỦ</button> 
            </div>
        </div>
    );
}

export default NotFound;
