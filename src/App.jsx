import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/general/not-found"; // Thêm import cho NotFound

// Staff page
//Consulting
import ConsultationRequests from "./pages/consulting/consultation-requests";
import CreatedOrders from "./pages/consulting/created-orders";
import OngoingConsultations from "./pages/consulting/ongoing-consultations";
<<<<<<< HEAD
import OrderDetail from "./pages/order-detail";
import Order from "./pages/consulting/order-detail2";
import HistoryPage from "./pages/history";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import ContactPage from "./pages/contact";
import ListProject from "./pages/dung"
=======
//Construction

//Designer
import Designer from "./pages/designer";
//Manager

//Customer
import HistoryPage from "./pages/customer/history";
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
import Order from "./pages/order-detail";
import PriceListStaff from "./pages/price-list-staff";
import MyProfile from "./pages/my-profile";
import ActiveProject from "./pages/construction-staff/active-project";
import HistoryConstruction from "./pages/construction-staff/history-construction";
import OrderManagement from "./pages/manager/manage-order";

>>>>>>> 07d310f800b9ec56df62cb8dfe8f7063c7b8313f
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
<<<<<<< HEAD
      element: <ListProject/>,
=======
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
>>>>>>> 07d310f800b9ec56df62cb8dfe8f7063c7b8313f
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
      element: <Order />,
    },
    {
      path: "history",
      element: <HistoryPage />,
    },
    {
      path: "price-list-staff",
      element: <PriceListStaff />,
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
    {
      path: "*", // Route cho các đường dẫn không tồn tại
      element: <NotFound />, // Chuyển hướng đến trang NotFound
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
