import React, { useEffect, useState } from "react";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Button, Form, Input, Modal, Spin } from "antd";
import LoadingPage from "../../../components/loading";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import FormItem from "antd/es/form/FormItem";
import { IoCreate } from "react-icons/io5";
function Combo() {
  const [combos, setCombos] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showModalCreateCombo, setShowModalCreateCombo] = useState(false);
  const [showModalUpdateCombo, setShowModalUpdateCombo] = useState(false);
  const [selectedCombo, setSelectedCombo] = useState();
  const [formCreate] = Form.useForm();
  const [formUpdate] = Form.useForm();
  const { TextArea } = Input;
  const fetchCombos = async () => {
    setLoading(true);
    try {
      const response = await api.get("combos");
      console.log(response.data);
      setCombos(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateCombo = async () => {
    const formData = formCreate.getFieldsValue();

    const valueInfo = {
      name: formData.name,
      description: formData.description,
    };
    try {
      await api.post(`combos`, valueInfo);
      setShowModalCreateCombo(false);
      fetchCombos();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateCombo = async () => {
    const formData = formUpdate.getFieldsValue();

    const valueInfo = {
      name: formData.name,
      description: formData.description,
    };
    try {
      await api.put(`combos/${selectedCombo.id}`, valueInfo);
      setShowModalUpdateCombo(false);
      fetchCombos();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteConfirmation = (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => handleDelete(id),
    });
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`combos/${id}`);
      fetchCombos();
    } catch (error) {
      console.error("Lỗi khi xóa combo:", error);
    }
  };
  useEffect(() => {
    fetchCombos();
  }, []);
  const columns = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      align: "center",
      width: 100,
    },
    {
      title: "Gói",
      key: "name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Mô  tả",
      key: "description",
      dataIndex: "description",
      width: 700,
    },
    {
      title: "Chức năng",
      key: "function",
      render: (record) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <AiOutlineUnorderedList
                size={30}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/combo/${record.id}`, {
                    state: {
                      actor: "manager",
                      comboName: record.name,
                    },
                  });
                }}
              ></AiOutlineUnorderedList>
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Chi tiết gói
              </p>
            </div>
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <GrUpdate
                size={30}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setSelectedCombo(record);
                  setShowModalUpdateCombo(true);
                  formUpdate.setFieldsValue({
                    name: record.name,
                    description: record.description,
                  });
                }}
              />
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>Cập nhật</p>
            </div>
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <MdDeleteOutline
                size={30}
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteConfirmation(record.id)}
              />
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>Xóa</p>
            </div>
          </div>
        );
      },
    },
  ];
  const title = "Quản lý gói";
  return (
    <>
      <Spin spinning={loading} indicator={<LoadingPage />}>
        <TableTemplate
          actor="manager"
          title={title}
          requests={combos}
          columns={columns}
        >
          <div style={{ textAlign: "right", margin: "0px 5px 5px 5px" }}>
            <Button
              type="primary"
              style={{ marginRight: "3%" }}
              onClick={() => setShowModalCreateCombo(true)}
            >
              <IoCreate /> Thêm gói
            </Button>
          </div>
        </TableTemplate>
      </Spin>
      <Modal
        open={showModalUpdateCombo}
        onCancel={() => setShowModalUpdateCombo(false)}
        footer={null}
      >
        <div>
          <Form
            form={formUpdate}
            onFinish={handleUpdateCombo}
            initialValues={{
              name: selectedCombo?.name,
              description: selectedCombo?.description,
            }}
          >
            <h1 style={{ textAlign: "center" }}>Cập nhật gói</h1>
            <FormItem label="Tên gói" name="name" labelCol={{ span: 24 }}>
              <Input placeholder="Nhập tên gói" />
            </FormItem>
            <FormItem label="Mô tả" name="description" labelCol={{ span: 24 }}>
              <TextArea rows={4} placeholder="Nhập mô tả gói combo" />
            </FormItem>

            <Button type="primary" htmlType="submit">
              Lưu thay đổi{" "}
            </Button>
          </Form>
        </div>
      </Modal>
      <Modal
        open={showModalCreateCombo}
        onCancel={() => setShowModalCreateCombo(false)}
        footer={null}
      >
        <div>
          <Form form={formCreate} onFinish={handleCreateCombo}>
            <h1 style={{ textAlign: "center" }}>Tạo combo mới</h1>
            <FormItem label="Tên gói" name="name" labelCol={{ span: 24 }}>
              <Input placeholder="Nhập tên gói" />
            </FormItem>
            <FormItem label="Mô tả" name="description" labelCol={{ span: 24 }}>
              <TextArea rows={4} placeholder="Nhập mô tả gói" />
            </FormItem>
            <Button type="primary" htmlType="submit">
              Tạo combo{" "}
            </Button>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default Combo;
