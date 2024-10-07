import React from "react";
import AuthenTemplate from "../../../components/authen-template";
import { Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function RegisterPage() {
  const navigate = useNavigate();
  const handleRegister = async (values) => {
    try {
      values.role = "CUSTOMER";
      const response = await api.post("register", values);
      toast.success("Đăng ký tài khoản thành công!");
      console.log(values);
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.log(error.response.data);
      toast.error("Email đã được đăng ký, vui lòng sử dụng email khác!");
    }
  };

  return (
    <AuthenTemplate>
      <h2>Đăng ký</h2>
      <Form onFinish={handleRegister}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item 
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: "^(84|0)+[3|5|7|8|9]\\d{8}$", message: "Số điện thoại không hợp lệ!" },
          ]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Vui lòng nhập lại mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>
        <button>Đăng ký</button>
        <p className="prompt">
          Bạn đã có tài khoản? <a href="login">Đăng nhập</a>
        </p>
        <div className="divider">
          <hr className="left" />
          <span>hoặc</span>
          <hr className="right" />
        </div>
      </Form>

    </AuthenTemplate>
  );
}

export default RegisterPage;
