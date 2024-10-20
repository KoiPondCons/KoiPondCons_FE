import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import "./index.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavDashboard from "../../components/navbar-dashboard";
import api from "../../config/axios";
import CommonPageTemplate from "../../components/common-page-template";
function DesignReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { actor } = location.state;
  const { id } = useParams();
  const banner =
    "https://firebasestorage.googleapis.com/v0/b/koi-pond-cons.appspot.com/o/banner-design-review.avif?alt=media&token=28f3cafe-4c84-4ea7-8fc9-f918d72c9919";
  const title = "Bản vẽ thiết kế";
  const [constructionOrder, setConstructionOrder] = useState(null);
  const [isManagerApproveModalOpen, setIsManagerApproveModalOpen] =
    useState(false);
  const [isManagerRejectModalOpen, setIsManagerRejectModalOpen] =
    useState(false);
  const [isCustomerApproveModalOpen, setIsCustomerApproveModalOpen] =
    useState(false);
  const [isCustomerRejectModalOpen, setIsCustomerRejectModalOpen] =
    useState(false);
  const fetchConstructionOrder = async () => {
    try {
      const response = await api.get(`orders/${id}`);
      setConstructionOrder(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConstructionOrder();
  }, []);
  const renderButtons = () => {
    switch (actor) {
      case "manager":
        return (
          <>
            <Button
              className="btn"
              onClick={() => setIsManagerApproveModalOpen(true)}
            >
              Phê duyệt
            </Button>
            <Button
              className="btn"
              onClick={() => setIsManagerRejectModalOpen(true)}
            >
              Từ chối
            </Button>
          </>
        );
      case "customer":
        return (
          <>
            <Button
              className="btn"
              onClick={() => setIsCustomerApproveModalOpen(true)}
            >
              Chấp thuận
            </Button>
            <Button
              className="btn"
              onClick={() => setIsCustomerRejectModalOpen(true)}
            >
              Từ chối
            </Button>
          </>
        );
    }
  };
  const designDrawingValue = {
    designerAccount:
      constructionOrder?.designDrawingResponse?.designerAccount?.id,
    designFile: constructionOrder?.designDrawingResponse?.designFile,
  };
  const handleManagerApproveDesignDrawing = async () => {
    try {
      await api.put(
        `design-drawings/${constructionOrder.designDrawingResponse?.id}`,
        {
          ...designDrawingValue,
          status: "CUSTOMER_PENDING",
        }
      );
      console.log("Design drawing updated successfully");
      navigate("/manager");
    } catch (error) {
      console.error("Error updating design drawing:", error);
    }
  };

  const handleManagerRejectDesignDrawing = async () => {
    try {
      await api.put(
        `design-drawings/${constructionOrder.designDrawingResponse?.id}`,
        {
          ...designDrawingValue,
          status: "MANAGER_REJECTED",
        }
      );
      console.log("Design drawing updated successfully");
      navigate("/manager");
    } catch (error) {
      console.error("Error updating design drawing:", error);
    }
  };
  const handleCustomerApproveDesignDrawing = async () => {
    try {
      await api.put(
        `design-drawings/${constructionOrder.designDrawingResponse?.id}`,
        {
          ...designDrawingValue,
          status: "CUSTOMER_CONFIRMED",
        }
      );
      console.log("Design drawing updated successfully");
      navigate(`/order/${constructionOrder.id}`, {
        state: { scrollToPayment: true },
      });
    } catch (error) {
      console.error("Error updating design drawing:", error);
    }
  };
  const handleCustomerRejectDesignDrawing = async () => {
    try {
      await api.put(
        `design-drawings/${constructionOrder.designDrawingResponse?.id}`,
        {
          ...designDrawingValue,
          status: "CUSTOMER_REJECTED",
        }
      );
      console.log("Design drawing updated successfully");
      navigate("/history");
    } catch (error) {
      console.error("Error updating design drawing:", error);
    }
  };
  const renderContent = () => {
    return (
      <div className="payment">
        <div className="card cart">
          <label className="title">Bản thiết kế tổng quát</label>
          <div className="steps">
            <div className="step" style={{ maxWidth: "100%" }}>
              <img
                alt="Design"
                src={constructionOrder?.designDrawingResponse?.designFile}
                style={{ width: "100%", height: "auto" }}
              />
              Được thiết kế bởi:{" "}
              {constructionOrder?.designDrawingResponse?.designerAccount?.name}
            </div>
          </div>
          <div className="card checkout">
            <div className="footer">
              <div className="container-button">{renderButtons()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {actor === "customer" ? (
        <CommonPageTemplate title={title} banner={banner}>
          {renderContent()}
        </CommonPageTemplate>
      ) : (
        <NavDashboard actor={actor}>{renderContent()}</NavDashboard>
      )}

      <Modal
        title="Xác nhận phê duyệt"
        open={isManagerApproveModalOpen}
        onOk={handleManagerApproveDesignDrawing}
        onCancel={() => setIsManagerApproveModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn phê duyệt bản vẽ này không?</p>
      </Modal>

      <Modal
        title="Xác nhận từ chối"
        open={isManagerRejectModalOpen}
        onOk={handleManagerRejectDesignDrawing}
        onCancel={() => setIsManagerRejectModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn từ chối bản vẽ này không?</p>
      </Modal>

      <Modal
        title="Xác nhận từ chối"
        open={isCustomerRejectModalOpen}
        onOk={handleCustomerRejectDesignDrawing}
        onCancel={() => setIsCustomerRejectModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn từ chối bản vẽ này không?</p>
      </Modal>

      <Modal
        title="Xác nhận chấp thuận"
        open={isCustomerApproveModalOpen}
        onOk={handleCustomerApproveDesignDrawing}
        onCancel={() => setIsCustomerApproveModalOpen(false)}
      >
        <p>Bạn có chắc chắn chấp thuận bản vẽ này không?</p>
      </Modal>
    </>
  );
}

export default DesignReview;
