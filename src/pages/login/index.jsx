import "./index.css";
import React from "react";
import AuthenTemplate from "../../components/authen-template";
import { Form, Input } from "antd";
import FormItem from "antd/es/form/FormItem";


function LoginPage() {
  

  const handleLogin = () => {};

  return (
    
    <AuthenTemplate>
      <h2>Đăng nhập</h2>
      <Form>
        <FormItem
          name="email"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập email!",
            },
          ]}
        >
          <Input placeholder="Email" />
        </FormItem>
        <FormItem
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu!",
            },
          ]}
        >
          <Input.Password placeholder="Mật khẩu" />
        </FormItem>
        <p className="forgot-password">
          <a>Quên mật khẩu?</a>
        </p>
        <button>Đăng nhập</button>
        <p className="prompt">
          Bạn chưa có tài khoản? <a href="register">Đăng ký</a>
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

export default LoginPage;
