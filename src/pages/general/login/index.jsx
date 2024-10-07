import "./index.css";
import React from "react";
import AuthenTemplate from "../../../components/authen-template";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import FormItem from "antd/es/form/FormItem";
import api from "../../../config/axios";

function LoginPage() {
  const navigate = useNavigate();
  const [form] = useForm();


  const handleLogin = async (value) => {
    try {
      const response = await api.post("login", value);
      const {role, token} = response.data;
      localStorage.setItem("token", token);
      if (role === "CUSTOMER") {
        navigate("/");
      }
      else if (role === "CONSULTANT") {
        navigate("/consultant/dashboard");
      }
      else if (role === "DESIGNER") {
        navigate("/designer/dashboard");
      }
      else if (role === "CONSTRUCTOR") {
        navigate("/constructor/dashboard");
      }
      else if (role === "MANAGER") {
        navigate("/manager/dashboard");
      }
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data);
    }
  };

  return (
    <AuthenTemplate>
      <h2>Đăng nhập</h2>
      <Form form={form} onFinish={handleLogin}>
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
          Bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
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
