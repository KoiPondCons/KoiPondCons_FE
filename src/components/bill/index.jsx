import React, { useRef, useState } from "react";
import { Modal, Table } from "antd";
import PropTypes from "prop-types";
import "./index.css";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

function Bill({ unitPrice, actor, onPromotionDeleted, constructionOrder }) {
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
  const [isDeletePromotionOpen, setIsDeletePromotionOpen] = useState(false);
  const [promotionIdToDelete, setPromotionIdToDelete] = useState(null);
  let totalDiscountPrice = 0;
  if (Array.isArray(constructionOrder?.quotationResponse?.promotions)) {
    constructionOrder.quotationResponse.promotions.forEach((promotion) => {
      const discountPrice =
        promotion.discountPercent *
        unitPrice *
        constructionOrder.quotationResponse.pondVolume;
      totalDiscountPrice += discountPrice;
    });
  } else {
    console.warn("promotionList is not defined or is not an array");
  }

  const quotationValue = {
    combo: constructionOrder.quotationResponse?.combo?.id,
    pondVolume: constructionOrder.quotationResponse?.pondVolume,
    quotationFile: null,
  };

  const handleSendQuotation = async () => {
    try {
      await api.put(`quotation/${constructionOrder.quotationResponse?.id}`, {
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
      await api.put(`quotation/${constructionOrder.quotationResponse?.id}`, {
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
      await api.put(`quotation/${constructionOrder.quotationResponse?.id}`, {
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
      await api.put(`quotation/${constructionOrder.quotationResponse?.id}`, {
        ...quotationValue,
        status: "CUSTOMER_CONFIRMED",
      });
      console.log("Quotation updated successfully");
      navigate(`/order/${constructionOrder.id}`, {
        state: { scrollToPayment: true },
      });
    } catch (error) {
      console.error("Error updating quotation:", error);
    }
  };
  const handleCustomerRejectQuotation = async () => {
    try {
      await api.put(`quotation/${constructionOrder.quotationResponse?.id}`, {
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
  const handleDeletePromotion = async (promotionId) => {
    try {
      await api.delete(
        `quotations/promo/${constructionOrder.quotationResponse.id}/${promotionId}`
      );
      console.log("Delete promotion success");
      onPromotionDeleted();
      setIsDeletePromotionOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    {
      title: "Các đợt thanh toán",
      dataIndex: "period",
      key: "period",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Số tiền cần thanh toán",
      dataIndex: "amount",
      key: "amount",
    },
  ];
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
                <span style={{ textAlign: "right" }}>
                  {constructionOrder.quotationResponse?.pondVolume} m3
                </span>
              </div>
              {constructionOrder.quotationResponse?.promotions.length > 0 && (
                <>
                  <hr />
                  <p style={{ marginTop: "20px" }}>HÓA ĐƠN TẠM TÍNH</p>
                  <div className="details">
                    <span style={{ fontWeight: "bold" }}>Thành tiền</span>
                    <span style={{ textAlign: "right" }}>
                      {unitPrice
                        ? `${new Intl.NumberFormat("vi-VN").format(
                            unitPrice *
                              constructionOrder.quotationResponse?.pondVolume
                          )} VND`
                        : "Loading VND"}
                    </span>

                    <p style={{ marginTop: "20px" }}>GIẢM GIÁ</p>
                    <span></span>
                  </div>
                  {constructionOrder.quotationResponse?.promotions.map(
                    (promotion, index) => (
                      <div key={index}>
                        <div className="details" style={{ padding: "0 30px" }}>
                          <span style={{ fontWeight: "bold" }}>
                            {promotion.content || "Giảm giá"}
                          </span>
                          <span
                            style={{ textAlign: "right", marginBottom: "40px" }}
                          >
                            {unitPrice &&
                            constructionOrder.quotationResponse?.pondVolume
                              ? `-${new Intl.NumberFormat("vi-VN").format(
                                  promotion.discountPercent *
                                    unitPrice *
                                    constructionOrder.quotationResponse
                                      ?.pondVolume
                                )} VND`
                              : "N/A"}
                            {actor === "consulting" ? (
                              <TiDelete
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setPromotionIdToDelete(promotion.id);
                                  setIsDeletePromotionOpen(true);
                                }}
                              />
                            ) : null}
                          </span>
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
              <hr />
              <p style={{ marginTop: "20px" }}>THANH TOÁN</p>
              <div className="details">
                <span style={{ fontWeight: "bold" }}>Tổng cộng</span>
                <span style={{ textAlign: "right" }}>
                  {unitPrice
                    ? `${new Intl.NumberFormat("vi-VN").format(
                        unitPrice *
                          constructionOrder.quotationResponse?.pondVolume -
                          totalDiscountPrice
                      )} VND`
                    : "Loading VND"}
                </span>
              </div>
              <p style={{ fontSize: "1.2rem" }}>
                Chúng tôi sẽ chia việc thanh toán thành các đợt nhỏ để thuận
                tiện cho quý khách. Nếu có thắc mắc, xin vui lòng liên hệ qua
                số: {constructionOrder.consultantAccount?.phone}.
              </p>
              <Table
                columns={columns}
                dataSource={constructionOrder.consOrderPaymentList}
                pagination={false}
              ></Table>
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
        title="Xác nhận xóa mã khuyến mãi"
        open={isDeletePromotionOpen}
        onOk={() => {
          handleDeletePromotion(promotionIdToDelete);
        }}
        onCancel={() => setIsDeletePromotionOpen(false)}
      >
        <p>Bạn có chắc chắn muốn xóa mã khuyến mãi này không</p>
      </Modal>
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
          handleCustomerApproveQuotation();
        }}
        onCancel={() => setIsCustomerApproveModalOpen(false)}
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
  actor: PropTypes.string.isRequired,
  onPromotionDeleted: PropTypes.func.isRequired,
  unitPrice: PropTypes.number.isRequired,
  constructionOrder: PropTypes.shape({
    customerDescription: PropTypes.string,
    customerEmail: PropTypes.string,
    customerName: PropTypes.string,
    customerPhone: PropTypes.string,
    designed: PropTypes.bool,
    id: PropTypes.number,
    pondAddress: PropTypes.string,
    consultantAccount: PropTypes.shape({
      phone: PropTypes.string,
    }).isRequired,
    quotationResponse: PropTypes.shape({
      combo: PropTypes.shape({
        id: PropTypes.number,
      }),
      id: PropTypes.number,
      pondVolume: PropTypes.number,
      promotions: PropTypes.arrayOf(PropTypes.object),
      status: PropTypes.string,
      statusDescription: PropTypes.string,
    }).isRequired,
    requestDate: PropTypes.string,
    status: PropTypes.string,
    statusDescription: PropTypes.string,
    consOrderPaymentList: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number,
        content: PropTypes.string,
        id: PropTypes.number,
        paid: PropTypes.bool,
        paidAt: PropTypes.string,
        paymentMethod: PropTypes.string,
        period: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
};

export default Bill;
