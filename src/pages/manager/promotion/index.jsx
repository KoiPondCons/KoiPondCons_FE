import React, { useEffect, useState } from "react";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Modal, Spin } from "antd";
import FormItem from "antd/es/form/FormItem";
import { MdDeleteOutline } from "react-icons/md";
import LoadingPage from "../../../components/loading";
function Promotion() {
  const [promotions, setPromotions] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState();
  const [isShowModalUpdateOpen, setIsShowModalUpdateOpen] = useState(false);
  const [isShowModalCreateOpen, setIsShowModalCreateOpen] = useState(false);
  const [isShowModalDeleteOpen, setIsShowModalDeleteOpen] = useState(false);
  const [form] = Form.useForm();
  const fetchPromotions = async () => {
    setLoading(true);
    try {
      const response = await api.get("promotions");
      setPromotions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPromotions();
  }, []);
  const handleUpdatePromotion = async () => {
    const formData = form.getFieldsValue();
    const valueInfo = {
      content: formData.content,
      discountPercent: formData.discountPercent,
      pointsAvailable: formData.pointsAvailable,
    };
    try {
      await api.put(`promotions/${selectedPromotion.id}`, valueInfo);
      console.log("Update success");
      setIsShowModalUpdateOpen(false);
      fetchPromotions();
    } catch (error) {
      console.error(error);
    }
  };
  const handleCreatePromotion = async () => {
    const formData = form.getFieldsValue();
    const valueInfo = {
      content: formData.content,
      discountPercent: formData.discountPercent,
      pointsAvailable: formData.pointsAvailable,
    };
    try {
      await api.post(`promotions`, valueInfo);
      console.log("Create success");
      setIsShowModalCreateOpen(false);
      fetchPromotions();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeletePromotion = async () => {
    try {
      await api.delete(`promotions/${selectedPromotion?.id}`);
      setIsShowModalDeleteOpen(false);
      fetchPromotions();
    } catch (error) {
      console.error(error);
    }
  };
  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Nội dung khuyến mãi",
      key: "content",
      dataIndex: "content",
    },
    {
      title: "Giảm giá",
      key: "discountPercent",
      render: (record) => {
        return <p>{record.discountPercent * 100}%</p>;
      },
    },
    {
      title: "Điểm nhận ưu đãi",
      key: "pointsAvailable",
      render: (record) => {
        return <p>{record.pointsAvailable} điểm</p>;
      },
    },
    {
      title: "Chi tiết",
      key: "action",
      render: (record) => {
        return (
          <>
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <AiOutlineUnorderedList
                style={{ cursor: "pointer" }}
                size={30}
                onClick={() => {
                  setSelectedPromotion(record);
                  setIsShowModalUpdateOpen(true);
                  form.setFieldsValue({
                    content: record.content,
                    discountPercent: record.discountPercent,
                    pointsAvailable: record.pointsAvailable,
                  });
                }}
              />
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>Chi tiết</p>
            </div>
          </>
        );
      },
    },
    {
      title: "Xóa",
      key: "delete",
      render: (record) => {
        return (
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <MdDeleteOutline
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedPromotion(record);
                setIsShowModalDeleteOpen(true);
              }}
            ></MdDeleteOutline>
            <p style={{ fontSize: "10px", fontStyle: "italic" }}>Xóa</p>
          </div>
        );
      },
    },
  ];
  const title = "QUẢN LÍ KHUYẾN MÃI";
  return (
    <>
      <Spin spinning={loading} indicator={<LoadingPage />}>
        <TableTemplate
          title={title}
          columns={columns}
          actor="manager"
          requests={promotions}
        >
          <Button onClick={() => setIsShowModalCreateOpen(true)}>
            Tạo thêm khuyến mãi
          </Button>
        </TableTemplate>
      </Spin>
      <Modal
        title="Xác nhận xóa khuyến mãi"
        open={isShowModalDeleteOpen}
        onCancel={() => setIsShowModalDeleteOpen(false)}
        onOk={handleDeletePromotion}
      >
        <p>Bạn có chắc chắn muốn xóa mã khuyến mãi này?</p>
      </Modal>
      <Modal
        open={isShowModalCreateOpen}
        footer={null}
        onCancel={() => setIsShowModalCreateOpen(false)}
      >
        <Form onFinish={handleCreatePromotion} form={form}>
          <h3>Tạo khuyến mãi mới </h3>
          <FormItem
            label="Nội dung khuyến mãi"
            name="content"
            labelCol={{ span: 24 }}
          >
            <Input placeholder="Nhập nội dung khuyến mãi"></Input>
          </FormItem>
          <FormItem
            label="Giảm giá (0.00 - 1)"
            name="discountPercent"
            labelCol={{ span: 24 }}
          >
            <Input
              type="Number"
              min={0}
              max={1}
              step={0.01}
              placeholder="Mời nhập giảm giá"
            ></Input>
          </FormItem>
          <FormItem
            label="Số điểm cần để nhận ưu đãi"
            name="pointsAvailable"
            labelCol={{ span: 24 }}
          >
            <Input
              type="Number"
              min={0}
              max={100000}
              placeholder="Mời nhập số điểm cần để nhận ưu đãi"
            ></Input>
          </FormItem>
          <Button type="primary" htmlType="submit">
            Tạo khuyến mãi
          </Button>
        </Form>
      </Modal>
      <Modal
        open={isShowModalUpdateOpen}
        onCancel={() => setIsShowModalUpdateOpen(false)}
        footer={null}
      >
        <Form
          onFinish={handleUpdatePromotion}
          form={form}
          initialValues={{
            content: selectedPromotion?.content,
            discountPercent: selectedPromotion?.discountPercent,
            pointsAvailable: selectedPromotion?.pointsAvailable,
          }}
        >
          <h3>Chi tiết khuyến mãi - {selectedPromotion?.id} </h3>
          <FormItem
            label="Nội dung khuyến mãi"
            name="content"
            labelCol={{ span: 24 }}
          >
            <Input placeholder="Nhập nội dung khuyến mãi"></Input>
          </FormItem>
          <FormItem
            label="Giảm giá (0.00 - 1)"
            name="discountPercent"
            labelCol={{ span: 24 }}
          >
            <Input
              type="Number"
              min={0}
              max={1}
              step={0.01}
              placeholder="Mời nhập giảm giá"
            ></Input>
          </FormItem>
          <FormItem
            label="Số điểm cần để nhận ưu đãi"
            name="pointsAvailable"
            labelCol={{ span: 24 }}
          >
            <Input
              type="Number"
              min={0}
              max={100000}
              placeholder="Mời nhập số điểm cần để nhận ưu đãi"
            ></Input>
          </FormItem>
          <Button type="primary" htmlType="submit">
            Lưu thay đổi
          </Button>
        </Form>
      </Modal>
    </>
  );
}

export default Promotion;
