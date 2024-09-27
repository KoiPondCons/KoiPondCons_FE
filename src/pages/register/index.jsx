import React from "react";
import AuthenTemplate from "../../components/authen-template";
import { Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";

function RegisterPage() {
  return (
    <AuthenTemplate>
      <h2>Đăng ký</h2>
      <Form>
        <Form.Item
          name="fullname"
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
