import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/general/not-found"; // Thêm import cho NotFound

// Staff page
import ConsultationRequests from "./pages/consulting/consultation-requests";
import MyProfile from "./pages/my-profile";
import CreatedOrders from "./pages/consulting/created-orders";
import OngoingConsultations from "./pages/consulting/ongoing-consultations";
import OrderDetail from "./pages/order-detail";
import Order from "./pages/order-detail";
import HistoryPage from "./pages/customer/history";
import PriceListStaff from "./pages/price-list-staff";

// Customer page
import LoginPage from "./pages/general/login";
import RegisterPage from "./pages/general/register";
import HomePage from "./pages/general/homepage";
import ContactPage from "./pages/general/contact";
import Service from "./pages/general/service";
import Pricing from "./pages/general/pricing";
import About from "./pages/general/about";
import Blog from "./pages/general/blog";
import ListProject from "./pages/general/list-project";

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
      path: "about",
      element: <About />,
    },
    {
      path: "contact",
      element: <ContactPage />,
    },
    {
      path: "projects",
      element: <ListProject />,
    },
    {
      path: "services",
      element: <Service />,
    },
    {
      path: "pricing",
      element: <Pricing />,
    },
    {
      path: "blog",
      element: <Blog />,
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
    {
      path: "price-list",
      element: <PriceListStaff />,
    },
    {
      path: "*", // Route cho các đường dẫn không tồn tại
      element: <NotFound />, // Chuyển hướng đến trang NotFound
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
