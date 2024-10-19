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
import StaffMangager from "./pages/manager/manage-staff";
import ConstructionOrders from "./pages/manager/construction-orders";
import ManageDesign from "./pages/manager/manage-design";
import ManageQuote from "./pages/manager/manage-quote";
import CustomerProfileManagement from "./pages/manager/customer-profile-management";
import MaintenanceOrders from "./pages/manager/maintenance-orders";

//Customer
import HistoryPage from "./pages/customer/history";
import OrderCustomer from "./pages/order-detail-customer";
import PriceListCustomer from "./pages/price-list-customer";
//Homepage
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
import PriceListStaff from "./pages/consulting/create-price-list";
import PaymentResponse from "./components/payment-response";
import DesignReview from "./pages/design-review";
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
      path: "price-list/:id",
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
      element: <ManageDesign />,
    },
    {
      path: "manager/staff-management",
      element: <StaffMangager />,
    },
    {
      path: "manager/construction-orders",
      element: <ConstructionOrders />,
    },
    {
      path: "manager/quote-management",
      element: <ManageQuote />,
    },
    {
      path: "manager",
      element: <OrderManagement />,
    },
    {
      path: "manager/customer-profile-management",
      element: <CustomerProfileManagement />,
    },
    {
      path: "manager/maintenance-orders",
      element: <MaintenanceOrders />,
    },
    //PAYMENT
    {
      path: "payment-response",
      element: <PaymentResponse />,
    },
    {
      path: "*", // Route cho các đường dẫn không tồn tại
      element: <NotFound />, // Chuyển hướng đến trang NotFound
    },
    {
      path: "design-review/:id",
      element: <DesignReview />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
