import React, { useEffect, useRef, useState } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../config/axios";
function verifyEmail1() {
  const location = useLocation();

  const ref = useRef(false);

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve 'accountId' parameter from the query string
    const queryParams = new URLSearchParams(location.search);
    const accountId = queryParams.get("accountId");

    const verifyAccountResponse = async () => {
      try {
        const response = await api.put(`verify-account/${accountId}`);
        // message.success('Payment response sent successfully!'); // Show success message
        console.log("Response from server:", response.data);
        switch (response.data.status) {
          case 1:
            setMessage("Đã xác thực tài khoản thành công!");
            break;
          case 2:
            setMessage("Tài khoản này đã được xác thực trước đó!");
            break;
          case 3:
            setMessage("Xảy ra lỗi khi xác thực!");
            break;
        }
      } catch (error) {
        // message.error('Failed to send payment response. Please try again.');
        console.error("Error:", error);
      }
      console.log(accountId);
      setStatus(accountId);
    };

    verifyAccountResponse();
    // if (ref.current) {
    //   verifyAccountResponse();
    // } else {
    //   ref.current = true;
    // }
  }, []);

  return (
    <div>
      {/* <Header /> */}
      <div
        style={{
          backgroundColor: "white",
        }}
      >
        <h1>{message}</h1>
        <button
          style={{ backgroundColor: "#23c483", color: "white" }}
          onClick={() => navigate("/homepage")}
        >
          VỀ TRANG CHỦ
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default verifyEmail1;
