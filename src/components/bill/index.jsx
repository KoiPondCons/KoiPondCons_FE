import React, { useState } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import "./index.css";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

function Bill({
  constructionOrderId,
  unitPrice,
  pondVolume,
  promotionList = [],
  actor,
  comboId,
  quotationId,
}) {
  const navigate = useNavigate();
  const [isManagerApproveModalOpen, setIsManagerApproveModalOpen] =
    useState(false);
  const [isManagerRejectModalOpen, setIsManagerRejectModalOpen] =
    useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isCustomerApproveModalOpen, setIsCustomerApproveModalOpen] =
    useState(false);
  const [isCustomerRejectModalOpen, setIsCustomerRejectModalOpen] =
    useState(false);

  let totalDiscountPrice = 0;
  if (Array.isArray(promotionList)) {
    promotionList.forEach((promotion) => {
      const discountPrice = promotion.discountPercent * unitPrice * pondVolume;
      totalDiscountPrice += discountPrice;
    });
  } else {
    console.warn("promotionList is not defined or is not an array");
  }

  const quotationValue = {
    combo: comboId,
    pondVolume: pondVolume,
    quotationFile: null,
  };

  const handleSendQuotation = async () => {
    try {
      await api.put(`quotation/${quotationId}`, {
        ...quotationValue,
        status: "MANAGER_PENDING",
      });
      console.log("Quotation updated successfully");
      navigate("/consulting/ongoing-consultation");
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };

  const handleManagerApproveQuotation = async () => {
    try {
      await api.put(`quotation/${quotationId}`, {
        ...quotationValue,
        status: "CUSTOMER_PENDING",
      });
      console.log("Quotation updated successfully");
      navigate("/manager");
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };

  const handleManagerRejectQuotation = async () => {
    try {
      await api.put(`quotation/${quotationId}`, {
        ...quotationValue,
        status: "MANAGER_REJECTED",
      });
      console.log("Quotation updated successfully");
      navigate("/manager");
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };
  const handleCustomerApproveQuotation = async () => {
    try {
      await api.put(`quotation/${quotationId}`, {
        ...quotationValue,
        status: "CUSTOMER_CONFIRMED",
      });
      console.log("Quotation updated successfully");
      navigate(`/order/${constructionOrderId}`);
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };
  const handleCustomerRejectQuotation = async () => {
    try {
      await api.put(`quotation/${quotationId}`, {
        ...quotationValue,
        status: "CUSTOMER_REJECTED",
      });
      console.log("Quotation updated successfully");
      navigate("/history");
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };

  const renderButtons = () => {
    switch (actor) {
      case "manager":
        return (
          <>
            <button
              className="btn"
              onClick={() => setIsManagerApproveModalOpen(true)}
            >
              Phê duyệt
            </button>
            <button
              className="btn"
              onClick={() => setIsManagerRejectModalOpen(true)}
            >
              Từ chối
            </button>
          </>
        );
      case "consulting":
        return (
          <button className="btn" onClick={() => setIsSendModalOpen(true)}>
            Gửi báo giá
          </button>
        );
      case "customer":
        return (
          <>
            <button
              className="btn"
              onClick={() => setIsCustomerApproveModalOpen(true)}
            >
              Chấp thuận
            </button>
            <button
              className="btn"
              onClick={() => setIsCustomerRejectModalOpen(true)}
            >
              Từ chối
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container" style={{ marginBottom: "30px" }}>
      <div className="card cart">
        <label className="title">BÁO GIÁ</label>
        <div className="steps">
          <div className="step" style={{ maxWidth: "100%" }}>
            <div className="payments">
              <p>ƯỚC LƯỢNG</p>
              <div className="details">
                <span style={{ fontWeight: "bold" }}>Đơn giá</span>
                <span style={{ textAlign: "right" }}>
                  {unitPrice
                    ? `${new Intl.NumberFormat("vi-VN").format(
                        unitPrice
                      )} VND/m3`
                    : "Loading VND/m3"}
                </span>
                <span style={{ fontWeight: "bold" }}>Thể tích</span>
                <span style={{ textAlign: "right" }}>{pondVolume} m3</span>
              </div>
              {promotionList.length > 0 && (
                <>
                  <hr />
                  <p style={{ marginTop: "20px" }}>THANH TOÁN</p>
                  <div className="details">
                    <span style={{ fontWeight: "bold" }}>Thành tiền</span>
                    <span style={{ textAlign: "right" }}>
                      {unitPrice
                        ? `${new Intl.NumberFormat("vi-VN").format(
                            unitPrice * pondVolume
                          )} VND`
                        : "Loading VND"}
                    </span>
                    <p style={{ marginTop: "20px" }}>GIẢM GIÁ</p>
                    {promotionList.map((promotion, index) => (
                      <div key={index}>
                        <div className="details">
                          <span style={{ fontWeight: "bold" }}>
                            {promotion.content || "Giảm giá"}
                          </span>
                          <span style={{ textAlign: "right" }}>
                            {unitPrice && pondVolume
                              ? `-${new Intl.NumberFormat("vi-VN").format(
                                  promotion.discountPercent *
                                    unitPrice *
                                    pondVolume
                                )} VND`
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <hr />
              <p style={{ marginTop: "20px" }}>THANH TOÁN</p>
              <div className="details">
                <span style={{ fontWeight: "bold" }}>Tổng cộng</span>
                <span style={{ textAlign: "right" }}>
                  {unitPrice
                    ? `${new Intl.NumberFormat("vi-VN").format(
                        unitPrice * pondVolume - totalDiscountPrice
                      )} VND`
                    : "Loading VND"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card checkout">
        <div className="footer">
          <div className="container-button">{renderButtons()}</div>
        </div>
      </div>

      <Modal
        title="Xác nhận phê duyệt"
        open={isManagerApproveModalOpen}
        onOk={() => {
          handleManagerApproveQuotation();
        }}
        onCancel={() => setIsManagerApproveModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn phê duyệt báo giá này không?</p>
      </Modal>

      <Modal
        title="Xác nhận từ chối"
        open={isManagerRejectModalOpen}
        onOk={() => {
          handleManagerRejectQuotation();
        }}
        onCancel={() => setIsManagerRejectModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn từ chối báo giá này không?</p>
      </Modal>

      <Modal
        title="Xác nhận từ chối báo giá"
        open={isCustomerRejectModalOpen}
        onOk={() => {
          handleCustomerRejectQuotation();
        }}
        onCancel={() => setIsCustomerRejectModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn từ chối báo giá này không?</p>
      </Modal>
      <Modal
        title="Xác nhận chấp thuận báo giá"
        open={isCustomerApproveModalOpen}
        onOk={() => {
          handleCustomerRejectQuotation();
        }}
        onCancel={() => setIsCustomerRejectModalOpen(false)}
      >
        <p>Bạn có chắc chắn chấp thuận báo giá này chứ??</p>
      </Modal>

      <Modal
        title="Xác nhận gửi báo giá"
        open={isSendModalOpen}
        onOk={() => {
          handleSendQuotation();
        }}
        onCancel={() => setIsSendModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn gửi báo giá?</p>
      </Modal>
    </div>
  );
}

Bill.propTypes = {
  constructionOrderId: PropTypes.number.isRequired,
  unitPrice: PropTypes.number.isRequired,
  pondVolume: PropTypes.number.isRequired,
  promotionList: PropTypes.array.isRequired,
  actor: PropTypes.string.isRequired,
  comboId: PropTypes.number.isRequired,
  quotationId: PropTypes.number.isRequired,
};

export default Bill;
