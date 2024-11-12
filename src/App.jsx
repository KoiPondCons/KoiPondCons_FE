import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/general/not-found"; // Thêm import cho NotFound
<<<<<<< HEAD
=======

>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
// Staff page
//Consulting
import ConsultationRequests from "./pages/consulting/consultation-requests";
import CreatedOrders from "./pages/consulting/created-orders";
import OngoingConsultations from "./pages/consulting/ongoing-consultations";
<<<<<<< HEAD
=======
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
>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
//Construction

//Designer
import Designer from "./pages/designer";
//Manager
<<<<<<< HEAD
import StaffMangager from "./pages/manager/manage-staff";
import CustomerProfileManagement from "./pages/manager/customer-profile-management";
import MaintenanceOrders from "./pages/manager/maintenance-orders";
import ConstructionOrdersPage from "./pages/manager/construction-orders";
import CustomerInformationPageManager from "./pages/customer-information";
import ConfigPrice from "./pages/manager/config-price";
//Customer
import HistoryPage from "./pages/customer/history";
import OrderCustomer from "./pages/order-detail-customer";
import PriceListCustomer from "./pages/price-list-customer";
//Homepage
=======

//Customer
import HistoryPage from "./pages/customer/history";
// Home page
>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
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
<<<<<<< HEAD
import Order from "./pages/order-detail-staff";
import MyProfile from "./pages/my-profile";
import ActiveProject from "./pages/construction-staff/active-project";
import HistoryConstruction from "./pages/construction-staff/history-construction";
import PriceListStaff from "./pages/consulting/create-price-list";
import PayFailed from "./pages/general/pay-failed";
import PaySuccess from "./pages/general/pay-success";
import PaymentResponse from "./components/payment-response";
import DesignReview from "./pages/design-review";
import ConstructionOrderDetail from "./pages/construction-staff/construction-order-detail";
import ProgressConstructionCustomer from "./pages/customer/progress-construction-customer";
import ApproveOrder from "./pages/consulting/approve-order";
import Report from "./pages/manager/report";
import BlogPage from "./pages/general/blog-page";
import MaintenanceDetail from "./pages/maintenance-detail";
import Promotion from "./pages/manager/promotion";
import Combo from "./pages/manager/combo";
import ComboDetail from "./pages/combo-detail";

=======
import Order from "./pages/order-detail";
import PriceListStaff from "./pages/price-list-staff";
import MyProfile from "./pages/my-profile";
import ActiveProject from "./pages/construction-staff/active-project";
import HistoryConstruction from "./pages/construction-staff/history-construction";
import OrderManagement from "./pages/manager/manage-order";

>>>>>>> 07d310f800b9ec56df62cb8dfe8f7063c7b8313f
>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
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
=======
<<<<<<< HEAD
      element: <ListProject/>,
=======
>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
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
<<<<<<< HEAD
    },
    {
      path: "article/:id",
      element: <BlogPage />,
=======
>>>>>>> 07d310f800b9ec56df62cb8dfe8f7063c7b8313f
>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
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
<<<<<<< HEAD
      path: "price-list/:id",
      element: <PriceListCustomer />,
    },
    {
      path: "history/progress-construction-customer/:id",
      element: <ProgressConstructionCustomer />,
    },
    {
      path: "maintenance-detail/:id",
      element: <MaintenanceDetail />,
    },
    //Staff
    {
      path: "order-detail/:id",
      element: <Order />,
=======
      path: "price-list-staff",
      element: <PriceListStaff />,
>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
    },
    //Consulting-staff
    {
      path: "consulting",
      element: <ConsultationRequests />,
    },
    {
<<<<<<< HEAD
      path: "/consulting/approve-order",
      element: <ApproveOrder />,
    },
    {
=======
>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
      path: "consulting/ongoing-consultation",
      element: <OngoingConsultations />,
    },
    {
      path: "consulting/created-orders",
      element: <CreatedOrders />,
    },
<<<<<<< HEAD
    {
      path: "consulting/price-list-staff/:id",
      element: <PriceListStaff />,
    },
=======
>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
    //Construction-staff
    {
      path: "construction",
      element: <ActiveProject />,
    },
    {
      path: "construction/history-construction",
      element: <HistoryConstruction />,
    },
<<<<<<< HEAD
    {
      path: "construction/history-construction/construction-order-detail/:id",
      element: <ConstructionOrderDetail />,
    },
=======
>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
    //Designer
    {
      path: "designer",
      element: <Designer />,
    },
    //Manager
    {
<<<<<<< HEAD
      path: "manager/promotions",
      element: <Promotion />,
    },
    {
      path: "manager/staff-management",
      element: <StaffMangager />,
    },
    {
      path: "manager/construction-orders",
      element: <ConstructionOrdersPage />,
    },

    {
      path: "manager",
      element: <Report />,
    },
    {
      path: "manager/combo",
      element: <Combo />,
    },
    {
      path: "combo/:comboId",
      element: <ComboDetail />,
    },
    {
      path: "manager/customer-profile-management",
      element: <CustomerProfileManagement />,
    },
    {
      path: "manager/customer-profile-management/customer-information/:id",
      element: <CustomerInformationPageManager />,
    },
    {
      path: "manager/maintenance-orders",
      element: <MaintenanceOrders />,
    },
    {
      path: "manager/config-price",
      element: <ConfigPrice />,
    },
    //PAYMENT
    {
      path: "payment-response",
      element: <PaymentResponse />,
    },
    {
      path: "payment-failed",
      element: <PayFailed />,
    },
    {
      path: "payment-success",
      element: <PaySuccess />,
=======
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
>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
    },
    {
      path: "*", // Route cho các đường dẫn không tồn tại
      element: <NotFound />, // Chuyển hướng đến trang NotFound
    },
<<<<<<< HEAD
    {
      path: "design-review/:id",
      element: <DesignReview />,
    },
=======
>>>>>>> 2fed02ac601756c781904e219409bb9fbb9381a6
  ]);

  return <RouterProvider router={router} />;
}

export default App;
