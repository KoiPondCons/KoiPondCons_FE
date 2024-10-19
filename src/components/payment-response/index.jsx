import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../../config/axios";
import { message, Spin } from "antd";
import LoadingPage from "../loading";

const PaymentResponse = () => {
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

    if (ref.current) {
      sendPaymentResponse();
    } else {
      ref.current = true;
    }
  }, []);
  if (loading) return <LoadingPage />;
  return (
    <div>
      {statePayment?.success ? (
        <h1>Thanh toán thành công</h1>
      ) : (
        <h1>Thanh toán thất bại</h1>
      )}
    </div>
  );
};

export default PaymentResponse;
