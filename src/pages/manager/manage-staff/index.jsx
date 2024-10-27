import React, { useEffect, useState } from "react";
import TableTemplate from "../../../components/table";
import api from "../../../config/axios";
import { BiSolidUserDetail } from "react-icons/bi";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import FormItem from "antd/es/form/FormItem";

function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [form] = Form.useForm();
  const { Option } = Select;

  const fetchStaffs = async () => {
    try {
      const response = await api.get("role/staff");
      setStaffs(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching staff data:", error);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

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
      await api.put(`${selectedStaff.id}`, valueInfo);
      await api.put(`role/${selectedStaff.id}`, roleData);
      console.log("Update success");
      setShowModal(false);
      fetchStaffs();
    } catch (error) {
      console.error(error);
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
      title: "Chi tiết",
      dataIndex: "staffDetail",
      key: "staffDetail",
      render: (text, record) => (
        <>
          <BiSolidUserDetail
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
            style={{ cursor: "pointer" }}
          />
        </>
      ),
    },
  ];

  const title = "Quản lí nhân sự";

  return (
    <div>
      <TableTemplate
        columns={columns}
        requests={staffs}
        title={title}
        actor="manager"
      />
      <Modal
        title="Thông tin nhân viên"
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
            <Row gutter={[16, 8]}>
              <Col span={14}>
                <p>Mã nhân viên: {selectedStaff?.id}</p>
                <FormItem label="Họ tên" name="name">
                  <Input placeholder="Nhập họ tên nhân viên" />
                </FormItem>
                <FormItem label="Role" name="role">
                  <Select placeholder="Chọn vai trò">
                    <Option value="CONSULTANT">Tư vấn viên</Option>
                    <Option value="DESIGNER">Nhà thiết kế</Option>
                    <Option value="CONSTRUCTOR">Người thi công</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem
                  label="Số điện thoại"
                  name="phone"
                  labelCol={{ span: 24 }}
                >
                  <Input placeholder="Nhập số điện thoại" />
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="Email" name="email" labelCol={{ span: 24 }}>
                  <Input placeholder="Nhập email" />
                </FormItem>
              </Col>
              <Col span={24}>
                <FormItem label="Địa chỉ" name="address">
                  <Input placeholder="Nhập địa chỉ" />
                </FormItem>
              </Col>
            </Row>
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
