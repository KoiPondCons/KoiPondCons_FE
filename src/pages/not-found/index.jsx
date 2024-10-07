import React from 'react';
import "./index.css"
import { useNavigate } from 'react-router-dom'; // Đảm bảo import đúng

function NotFound() {
    const navigate = useNavigate(); 

    return (
        <div className='notfound404-container'>
            <div className='notfound404-shape'>
                <div><img src="https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/error-404-concept-illustration.png?alt=media&token=4f8db43c-d5d4-40a5-ab1a-dc192148ca17" alt="" /></div>
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
