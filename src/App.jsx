import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/general/not-found"; // Thêm import cho NotFound

// Staff page
//Consulting
import ConsultationRequests from "./pages/consulting/consultation-requests";
import CreatedOrders from "./pages/consulting/created-orders";
import OngoingConsultations from "./pages/consulting/ongoing-consultations";
//Construction

//Designer
import Designer from "./pages/designer";
//Manager

//Customer
import HistoryPage from "./pages/customer/history";
import OrderCustomer from "./pages/order-detail-customer";
import PriceListCustomer from "./pages/price-list-customer";
// Home page
import LoginPage from "./pages/general/login";
import RegisterPage from "./pages/general/register";
import HomePage from "./pages/general/homepage";
import ContactPage from "./pages/general/contact";
import Service from "./pages/general/service";
import Pricing from "./pages/general/pricing";
import About from "./pages/general/about";
import Blog from "./pages/general/blog";
import ListProject from "./pages/general/list-project";
//General
import Order from "./pages/order-detail-staff";
import MyProfile from "./pages/my-profile";
import ActiveProject from "./pages/construction-staff/active-project";
import HistoryConstruction from "./pages/construction-staff/history-construction";
import OrderManagement from "./pages/manager/manage-order";
import PriceListStaff from "./pages/consulting/price-list-staff";

import PaymentConfirm from "./pages/payment";
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
      path: "my-profile",
      element: <MyProfile />,
    },
    {
      path: "order/:id",
      element: <OrderCustomer />,
    },
    {
      path: "history",
      element: <HistoryPage />,
    },
    {
      path: "price-list-staff",
      element: <PriceListCustomer />,
    },
    //Staff
    {
      path: "order-detail/:id",
      element: <Order />,
    },
    //Consulting-staff
    {
      path: "consulting",
      element: <ConsultationRequests />,
    },
    {
      path: "consulting/ongoing-consultation",
      element: <OngoingConsultations />,
    },
    {
      path: "consulting/created-orders",
      element: <CreatedOrders />,
    },
    {
      path: "consulting/price-list-staff/:id",
      element: <PriceListStaff />,
    },
    //Construction-staff
    {
      path: "construction",
      element: <ActiveProject />,
    },
    {
      path: "construction/history-construction",
      element: <HistoryConstruction />,
    },
    //Designer
    {
      path: "designer",
      element: <Designer />,
    },
    //Manager
    {
      path: "manager/design-management",
    },
    {
      path: "manager/staff-management",
    },
    {
      path: "manager/quote-management",
    },
    {
      path: "manager",
      element: <OrderManagement />,
    },
    {
      path: "manager/maintenance-orders",
    },
    {
      path: "manager/customer-profile-management",
    },
    //PAYMENT
    {
      path: "payment",
      element: <PaymentConfirm />,
    },
    {
      path: "*", // Route cho các đường dẫn không tồn tại
      element: <NotFound />, // Chuyển hướng đến trang NotFound
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
