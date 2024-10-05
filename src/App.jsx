import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./components/not-found"; // Thêm import cho NotFound

// Staff page
import ConsultationRequests from "./pages/consulting/consultation-requests";
import MyProfile from "./pages/my-profile";
import CreatedOrders from "./pages/consulting/created-orders";
import OngoingConsultations from "./pages/consulting/ongoing-consultations";
import OrderDetail from "./pages/order-detail";
import Order from "./pages/order-detail";
import HistoryPage from "./pages/history";
import PriceListStaff from "./pages/price-list-staff";

// Customer page
import LoginPage from "./pages/homepage-login";
import RegisterPage from "./pages/homepage-register";
import HomePage from "./pages/homepage";
import ContactPage from "./pages/homepage-contact";
import Service from "./pages/homepage-service"
import Pricing from "./pages/homepage-pricing"
import About from "./pages/homepage-about"; 
import Blog from "./pages/homepage-blog"; 
import ListProject from "./pages/homepage-list-project"


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
      element: <About/>,
    },
    {
      path: "contact",
      element: <ContactPage />,
    },
    {
      path: "projects",
      element: <ListProject/>,
    },
    {
      path: "services",
      element: <Service/>,
    },
    {
      path: "pricing",
      element: <Pricing/>,
    },
    {
      path: "blog",
      element: <Blog/>,
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
