import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConsultationRequests from "./pages/consulting/consultation-requests";
import MyProfile from "./pages/my-profile";
import CreatedOrders from "./pages/consulting/created-orders";
import OngoingConsultations from "./pages/consulting/ongoing-consultations";
import OrderDetail from "./pages/order-detail";
import Order from "./pages/consulting/order-detail2";
import HistoryPage from "./pages/history";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import ContactPage from "./pages/contact";


function App() {
  const router = createBrowserRouter([
    {
      path: "", //trang mặc định
      element: <HomePage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "contact",
      element: <ContactPage />,
    },
    {
      path: "homepage",
      element: <HomePage />,
    },
    {
      path: "consultation-requests",
      element: <ConsultationRequests />,
    },
    {
      path: "created-orders",
      element: <CreatedOrders />,
    },
    {
      path: "ongoing-consultation",
      element: <OngoingConsultations />,
    },
    {
      path: "my-profile",
      element: <MyProfile />,
    },
    {
      path: "order-detail",
      element: <OrderDetail />,
    },
    {
      path: "order/:id",
      element: <Order />,
    },
    {
      path: "history",
      element: <HistoryPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
