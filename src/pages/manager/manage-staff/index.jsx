import React, { useEffect, useState } from "react";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
import { BiSolidUserDetail } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { Button, Form, Input, Modal, Radio, Select, Spin } from "antd";
import FormItem from "antd/es/form/FormItem";
import LoadingPage from "../../../components/loading/index";
import { IoIosPersonAdd } from "react-icons/io";
import Search from "antd/es/input/Search";
function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [form] = Form.useForm();
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("all");
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [formCreate] = Form.useForm();
  const fetchStaffs = async () => {
    setLoading(true);
    try {
      let response;

      if (type == "all") {
        response = await api.get("account/role/staff");
      } else {
        response = await api.get(`account/role/${type}`);
      }

      setStaffs(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChangeType = (e) => {
    setType(e.target.value);
  };
  useEffect(() => {
    fetchStaffs();
  }, [type]);
  const handleCreateAccount = async () => {
    const formData = formCreate.getFieldsValue();

    const valueInfo = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
    };

    try {
      await api.post(`register`, valueInfo);
      setShowModalCreate(false);
      fetchStaffs();
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateInfor = async () => {
    const formData = form.getFieldsValue();

    const valueInfo = {
      name: formData.name,
      email: formData.email,
      avatar: selectedStaff?.avatar,
      address: formData.address,
      phone: formData.phone,
    };
    const roleData = {
      role: formData.role,
    };

    try {
      await api.put(`account/${selectedStaff.id}`, valueInfo);
      await api.put(`account/role/${selectedStaff.id}`, roleData);
      console.log("Update success");
      setShowModal(false);
      fetchStaffs();
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
      await api.delete(`account/delete/${id}`);
      fetchStaffs();
    } catch (error) {
      console.error("Lỗi khi xóa nhân viên:", error);
    }
  };
  const columns = [
    {
      title: "Mã nhân viên",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Vị trí",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Chức năng",
      dataIndex: "staffDetail",
      key: "staffDetail",
      render: (text, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", cursor: "pointer" }}>
            <BiSolidUserDetail
              size={30}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setSelectedStaff(record);
                setShowModal(true);
                form.setFieldsValue({
                  id: record.id,
                  name: record.name,
                  role: record.role,
                  phone: record.phone,
                  email: record.email,
                  address: record.address,
                });
              }}
            />
            <p style={{ fontSize: "10px", fontStyle: "italic" }}>Chi tiết</p>
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
      ),
    },
  ];

  const title = "QUẢN LÍ NHÂN SỰ";

  return (
    <div>
      <Spin spinning={loading} indicator={<LoadingPage />}>
        <TableTemplate
          columns={columns}
          requests={staffs}
          title={title}
          actor="manager"
        >
          <div className="radio-filter">
            <Radio.Group
              block
              buttonStyle="solid"
              defaultValue="all"
              size="large"
              onChange={handleChangeType}
            >
              <Radio.Button value="all">Tất cả</Radio.Button>
              <Radio.Button value="CONSULTANT">Tư vấn viên</Radio.Button>
              <Radio.Button value="DESIGNER">Nhà thiết kế</Radio.Button>
              <Radio.Button value="CONSTRUCTOR">Nhà thi công</Radio.Button>
            </Radio.Group>
          </div>

          <div style={{ textAlign: "right", margin: "0px 5px 5px 5px" }}>
            <Button
              type="primary"
              style={{ marginRight: "3%" }}
              onClick={() => setShowModalCreate(true)}
            >
              <IoIosPersonAdd /> Thêm tài khoản
            </Button>
            <Search
              style={{ width: "30%", height: "40px" }}
              placeholder="Nhập tên nhân viên cần tìm kiếm"
              Search
            />
          </div>
        </TableTemplate>
      </Spin>
      <Modal
        open={showModalCreate}
        onCancel={() => setShowModalCreate(false)}
        footer={null}
      >
        <div>
          <Form form={formCreate} onFinish={handleCreateAccount}>
            <h1 style={{ textAlign: "center" }}>Tạo account mới</h1>
            <FormItem label="Email" name="email" labelCol={{ span: 24 }}>
              <Input placeholder="Nhập email" />
            </FormItem>
            <FormItem label="Mật khẩu" name="password" labelCol={{ span: 24 }}>
              <Input type="password" placeholder="Nhập password" />
            </FormItem>
            <FormItem label="Họ tên" name="name" labelCol={{ span: 24 }}>
              <Input placeholder="Nhập họ tên nhân viên" />
            </FormItem>
            <FormItem label="Role" name="role" labelCol={{ span: 24 }}>
              <Select placeholder="Chọn vai trò">
                <Option value="CONSULTANT">Tư vấn viên</Option>
                <Option value="DESIGNER">Nhà thiết kế</Option>
                <Option value="CONSTRUCTOR">Người thi công</Option>
              </Select>
            </FormItem>
            <FormItem
              label="Số điện thoại"
              name="phone"
              labelCol={{ span: 24 }}
            >
              <Input placeholder="Nhập số điện thoại" />
            </FormItem>
            <Button type="primary" htmlType="submit">
              Tạo tài khoản{" "}
            </Button>
          </Form>
        </div>
      </Modal>
      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <div>
          <Form
            form={form}
            onFinish={handleUpdateInfor}
            initialValues={{
              id: selectedStaff?.id,
              name: selectedStaff?.name,
              role: selectedStaff?.role,
              phone: selectedStaff?.phone,
              email: selectedStaff?.email,
              address: selectedStaff?.address,
            }}
          >
            <h1 style={{ textAlign: "center" }}>Thông tin nhân viên</h1>
            <FormItem label="Họ tên" name="name" labelCol={{ span: 24 }}>
              <Input placeholder="Nhập họ tên nhân viên" />
            </FormItem>
            <FormItem label="Vị trí" name="role" labelCol={{ span: 24 }}>
              <Select placeholder="Chọn vai trò">
                <Option value="CONSULTANT">Tư vấn viên</Option>
                <Option value="DESIGNER">Nhà thiết kế</Option>
                <Option value="CONSTRUCTOR">Người thi công</Option>
              </Select>
            </FormItem>
            <FormItem
              label="Số điện thoại"
              name="phone"
              labelCol={{ span: 24 }}
            >
              <Input placeholder="Nhập số điện thoại" />
            </FormItem>
            <FormItem label="Email" name="email" labelCol={{ span: 24 }}>
              <Input placeholder="Nhập email" />
            </FormItem>
            <FormItem label="Địa chỉ" name="address" labelCol={{ span: 24 }}>
              <Input placeholder="Nhập địa chỉ" />
            </FormItem>
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default ManageStaff;
