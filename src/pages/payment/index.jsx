import React, { useState } from 'react';
import { Button, notification } from 'antd';
import "./index.css"

function PaymentPage() {
    const handlePayment = () => {
        // Giả lập quá trình thanh toán
        const isSuccess = Math.random() > 0.5; // 50% xác suất thành công

        if (isSuccess) {
            notification.success({
                message: 'Thanh toán thành công!',
                description: 'Cảm ơn bạn đã thanh toán.',
            });
        } else {
            notification.error({
                message: 'Thanh toán thất bại!',
                description: 'Vui lòng thử lại sau.',
            });
        }
    };

    return (
        <div>
            <div className='payment'>
                <div className="card cart">
                    <label className="title">THANH TOÁN ĐỢT 1</label>
                    <div className="steps">
                        <div className="step" style={{ maxWidth: '100%' }}>
                            <div className="payments">
                                <p>ƯỚC LƯỢNG</p>
                                <div className="details">
                                    <span style={{ fontWeight: "bold" }}>Đơn giá</span>
                                    <span style={{ textAlign: "right" }}>100.000 VND/m3</span>
                                    <span style={{ fontWeight: "bold" }}>Thể tích</span>
                                    <span style={{ textAlign: "right" }}>100 m3</span>
                                </div>
                                <hr />
                                <p style={{ marginTop: "20px" }}>THANH TOÁN</p>
                                <div className="details">
                                    <span style={{ fontWeight: "bold" }}>Thành tiền</span>
                                    <span style={{ textAlign: "right" }}>
                                        100.000.000 VND
                                    </span>
                                    <span style={{ fontWeight: "bold" }}>Giảm giá</span>
                                    <span style={{ textAlign: "right" }}>5%</span>
                                    <span style={{ fontWeight: "bold" }}></span>
                                    <span style={{ textAlign: "right", gap: "1px" }}>
                                        5.000.000 VND
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card checkout">
                        <div className="footer">
                            <label className="price">95.000.000 VND</label>
                            <div className='payment-button'>
                                <Button type="primary" onClick={handlePayment}>Thanh Toán</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentPage;
