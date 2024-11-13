import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import LoadingPage from "../loading";
import paySuccess from "../../images/payment-success.png";
import payFail from "../../images/payment-fail.png";
const PaymentResponse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    const extractedParams = {
      vnp_Amount: params.get("vnp_Amount"),
      vnp_BankCode: params.get("vnp_BankCode"),
      vnp_BankTranNo: params.get("vnp_BankTranNo"),
      vnp_CardType: params.get("vnp_CardType"),
      vnp_OrderInfo: params.get("vnp_OrderInfo"),
      vnp_PayDate: params.get("vnp_PayDate"),
      vnp_ResponseCode: params.get("vnp_ResponseCode"),
      vnp_TmnCode: params.get("vnp_TmnCode"),
      vnp_TransactionNo: params.get("vnp_TransactionNo"),
      vnp_TransactionStatus: params.get("vnp_TransactionStatus"),
      vnp_TxnRef: params.get("vnp_TxnRef"),
      vnp_SecureHash: params.get("vnp_SecureHash"),
    };
    return extractedParams;
  };
  const [statePayment, setStatePayment] = useState();
  const ref = useRef(false);

  useEffect(() => {
    const params = getQueryParams();
    console.log("Extracted Parameters:", params);
    const sendPaymentResponse = async () => {
      setLoading(true);
      try {
        const response = await api.get("vnpay-payment-return", {
          params: params,
        });
        setStatePayment(response.data);
        console.log("Response from server:", response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    sendPaymentResponse();

    // if (ref.current) {
    //   sendPaymentResponse();
    // } else {
    //   ref.current = true;
    // }
  }, []);
  if (loading) return <LoadingPage />;
  return (
    <div>
      {statePayment?.status ? (
        <div className="notfound404-container">
          <div className="notfound404-shape">
            <div style={{ margin: "40px auto" }}>
              <img src={paySuccess} alt="" />
            </div>
            <h1>Thanh toán thành công</h1>
            <p>
              Cám ơn quý khách đã tin tưởng và sử dụng dịch vụ của chúng tôi.
            </p>
            <p>Trở về trang chủ hoặc xem lịch sử đơn hàng.</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{ backgroundColor: "#23c483", color: "white" }}
                onClick={() => navigate("/homepage")}
              >
                VỀ TRANG CHỦ
              </button>
              <button
                style={{ backgroundColor: "#23c483", color: "white" }}
                onClick={() => navigate("/history")}
              >
                XEM LỊCH SỬ ĐƠN HÀNG
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="notfound404-container">
          <div className="notfound404-shape">
            <div style={{ margin: "0px auto" }}>
              <img src={payFail} alt="" />
            </div>
            <h1>Thanh toán thất bại</h1>
            <p>Oops! Đã có lỗi xảy ra</p>
            <p>Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={() => navigate("/homepage")}>
                VỀ TRANG CHỦ
              </button>
              <button onClick={() => navigate("/history")}>
                XEM LỊCH SỬ ĐƠN HÀNG
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentResponse;
