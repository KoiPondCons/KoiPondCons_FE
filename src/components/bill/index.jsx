import React, { useState } from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import "./index.css";
import api from "../../config/axios";
function Bill({
  unitPrice,
  pondVolume,
  promotionList = [],
  actor,
  comboId,
  quotationId,
}) {
  const [modalType, setModalType] = useState(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [isRejectCustomerOpen, setIsRejectCustomerOpen] = useState(false);
  let totalDiscountPrice = 0;
  if (Array.isArray(promotionList)) {
    promotionList.forEach((promotion) => {
      const discountPrice = promotion.discountPercent * unitPrice * pondVolume;
      totalDiscountPrice += discountPrice;
    });
  } else {
    console.warn("promotionList is not defined or is not an array");
  }
  const handleQuotation = async () => {
    const value = {
      combo: comboId,
      pondVolume: pondVolume,
      quotationFile: null,
      status: "MANAGER_PENDING",
    };
    try {
      await api.put(`quotation/${quotationId}`, value);
      console.log("Quotation updated successfully");
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };
  const handleApproveQuotation = async () => {
    const value = {
      combo: comboId,
      pondVolume: pondVolume,
      quotationFile: null,
      status: "CUSTOMER_PENDING",
    };
    try {
      await api.put(`quotation/${quotationId}`, value);
      console.log("Quotation updated successfully");
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };
  const handleRejectQuotation = async () => {
    const value = {
      combo: comboId,
      pondVolume: pondVolume,
      quotationFile: null,
      status: "MANAGER_REJECTED",
    };
    try {
      await api.put(`quotation/${quotationId}`, value);
      console.log("Quotation updated successfully");
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };
  const handleRejectCustomerQuotation = async () => {
    const value = {
      combo: comboId,
      pondVolume: pondVolume,
      quotationFile: null,
      status: "CUSTOMER_REJECTED",
    };
    try {
      await api.put(`quotation/${quotationId}`, value);
      console.log("Quotation updated successfully");
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };
  const renderButtons = () => {
    switch (actor) {
      case "manager":
        return (
          <>
            <button className="btn" onClick={() => setIsApproveModalOpen(true)}>
              Phê duyệt
            </button>
            <button className="btn" onClick={() => setIsRejectModalOpen(true)}>
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
            <button className="btn">Thanh toán</button>
            <button
              className="btn"
              onClick={() => setIsRejectCustomerOpen(true)}
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
                {promotionList.map((promotion, index) => (
                  <React.Fragment key={index}>
                    <span style={{ fontWeight: "bold" }}>Giảm giá</span>
                    <span style={{ textAlign: "right" }}>
                      {promotion.content || "N/A"}{" "}
                    </span>
                    <span style={{ fontWeight: "bold" }}></span>
                    <span style={{ textAlign: "right", gap: "1px" }}>
                      {unitPrice && pondVolume
                        ? new Intl.NumberFormat("vi-VN").format(
                            promotion.discountPercent * unitPrice * pondVolume
                          ) + " VND"
                        : "N/A"}{" "}
                    </span>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card checkout">
        <div className="footer">
          <label className="price">
            {unitPrice
              ? `${new Intl.NumberFormat("vi-VN").format(
                  unitPrice * pondVolume - totalDiscountPrice
                )} VND`
              : "Loading VND"}
          </label>
          {renderButtons()}
        </div>
      </div>

      <Modal
        title="Xác nhận phê duyệt"
        open={isApproveModalOpen}
        onOk={() => {
          handleApproveQuotation();
        }}
        onCancel={() => setIsApproveModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn phê duyệt báo giá này không?</p>
      </Modal>

      <Modal
        title="Xác nhận từ chối"
        open={isRejectModalOpen}
        onOk={() => {
          handleRejectQuotation();
        }}
        onCancel={() => setIsRejectModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn từ chối báo giá này không?</p>
      </Modal>
      <Modal
        title="Xác nhận từ chối"
        open={isRejectCustomerOpen}
        onOk={() => {
          handleRejectCustomerQuotation();
        }}
        onCancel={() => setIsRejectModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn từ chối báo giá này không?</p>
      </Modal>

      <Modal
        title="Xác nhận gửi báo giá"
        open={isSendModalOpen}
        onOk={() => {
          handleQuotation();
        }}
        onCancel={() => setIsSendModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn gửi báo giá</p>
      </Modal>
    </div>
  );
}
Bill.propTypes = {
  unitPrice: PropTypes.number.isRequired,
  pondVolume: PropTypes.number.isRequired,
  promotionList: PropTypes.array.isRequired,
  actor: PropTypes.string.isRequired,
  comboId: PropTypes.number.isRequired,
  quotationId: PropTypes.number.isRequired,
};

export default Bill;
