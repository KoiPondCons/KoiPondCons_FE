import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
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
import VerifyEmail from "./pages/general/verify";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((store) => store.user);

  const ProtectedRouteAuth = ({ children }) => {
    if (user) {
      return children;
    }
    return <Navigate to="/homepage" />;
  };

  const ProtectedRouteManager = ({ children }) => {
    if (user && user.role === "MANAGER") {
      return children;
    }
    return <Navigate to="/homepage" />;
  };

  const ProtectedRouteConsultant = ({ children }) => {
    if (user && user.role === "CONSULTANT") {
      return children;
    }
    return <Navigate to="/homepage" />;
  };

  const ProtectedRouteDesigner = ({ children }) => {
    if (user && user.role === "DESIGNER") {
      return children;
    }
    return <Navigate to="/homepage" />;
  };

  const ProtectedRouteConstructor = ({ children }) => {
    if (user && user.role === "CONSTRUCTOR") {
      return children;
    }
    return <Navigate to="/homepage" />;
  };

  const ProtectedRouteCustomer = ({ children }) => {
    if (user && user.role === "CUSTOMER") {
      return children;
    }
    return <Navigate to="/homepage" />;
  };

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
      path: "verify",
      element: <VerifyEmail />,
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
      path: "article/:id",
      element: <BlogPage />,
    },
    {
      path: "homepage",
      element: <HomePage />,
    },
    {
      path: "my-profile",
      element: (
        <ProtectedRouteAuth>
          <MyProfile />
        </ProtectedRouteAuth>
      ),
    },
    {
      path: "order/:id",
      element: (
        <ProtectedRouteCustomer>
          <OrderCustomer />
        </ProtectedRouteCustomer>
      ),
    },
    {
      path: "history",
      element: (
        <ProtectedRouteCustomer>
          <HistoryPage />
        </ProtectedRouteCustomer>
      ),
    },
    {
      path: "price-list/:id",
      element: (
        <ProtectedRouteCustomer>
          <PriceListCustomer />
        </ProtectedRouteCustomer>
      ),
    },
    {
      path: "history/progress-construction-customer/:id",
      element: (
        <ProtectedRouteCustomer>
          <ProgressConstructionCustomer />
        </ProtectedRouteCustomer>
      ),
    },
    {
      path: "maintenance-detail/:id",
      element: (
        <ProtectedRouteAuth>
          <MaintenanceDetail />
        </ProtectedRouteAuth>
      ),
    },
    //Staff
    {
      path: "order-detail/:id",
      element: (
        <ProtectedRouteAuth>
          <Order />
        </ProtectedRouteAuth>
      ),
    },
    //Consulting-staff
    {
      path: "consulting",
      element: (
        <ProtectedRouteConsultant>
          <ConsultationRequests />
        </ProtectedRouteConsultant>
      ),
    },
    {
      path: "/consulting/approve-order",
      element: (
        <ProtectedRouteConsultant>
          <ApproveOrder />
        </ProtectedRouteConsultant>
      ),
    },
    {
      path: "consulting/ongoing-consultation",
      element: (
        <ProtectedRouteConsultant>
          <OngoingConsultations />
        </ProtectedRouteConsultant>
      ),
    },
    {
      path: "consulting/created-orders",
      element: <CreatedOrders />,
    },
    {
      path: "consulting/price-list-staff/:id",
      element: (
        <ProtectedRouteAuth>
          <PriceListStaff />
        </ProtectedRouteAuth>
      ),
    },
    //Construction-staff
    {
      path: "construction",
      element: (
        <ProtectedRouteConstructor>
          <ActiveProject />
        </ProtectedRouteConstructor>
      ),
    },
    {
      path: "construction/history-construction",
      element: (
        <ProtectedRouteConstructor>
          <HistoryConstruction />
        </ProtectedRouteConstructor>
      ),
    },
    {
      path: "construction/history-construction/construction-order-detail/:id",
      element: (
        <ProtectedRouteAuth>
          <ConstructionOrderDetail />
        </ProtectedRouteAuth>
      ),
    },
    //Designer
    {
      path: "designer",
      element: (
        <ProtectedRouteDesigner>
          <Designer />
        </ProtectedRouteDesigner>
      ),
    },
    //Manager
    {
      path: "manager/promotions",
      element: (
        <ProtectedRouteManager>
          <Promotion />
        </ProtectedRouteManager>
      ),
    },
    {
      path: "manager/staff-management",
      element: (
        <ProtectedRouteManager>
          <StaffMangager />
        </ProtectedRouteManager>
      ),
    },
    {
      path: "manager/construction-orders",
      element: (
        <ProtectedRouteManager>
          <ConstructionOrdersPage />
        </ProtectedRouteManager>
      ),
    },

    {
      path: "manager",
      element: (
        <ProtectedRouteManager>
          <Report />
        </ProtectedRouteManager>
      ),
    },
    {
      path: "manager/combo",
      element: (
        <ProtectedRouteManager>
          <Combo />
        </ProtectedRouteManager>
      ),
    },
    {
      path: "combo/:comboId",
      element: <ComboDetail />,
    },
    {
      path: "manager/customer-profile-management",
      element: (
        <ProtectedRouteManager>
          <CustomerProfileManagement />
        </ProtectedRouteManager>
      ),
    },
    {
      path: "manager/customer-profile-management/customer-information/:id",
      element: (
        <ProtectedRouteManager>
          <CustomerInformationPageManager />
        </ProtectedRouteManager>
      ),
    },
    {
      path: "manager/maintenance-orders",
      element: (
        <ProtectedRouteManager>
          <MaintenanceOrders />
        </ProtectedRouteManager>
      ),
    },
    {
      path: "manager/config-price",
      element: (
        <ProtectedRouteManager>
          <ConfigPrice />
        </ProtectedRouteManager>
      ),
    },
    //PAYMENT
    {
      path: "payment-response",
      element: (
        <ProtectedRouteAuth>
          <PaymentResponse />
        </ProtectedRouteAuth>
      ),
    },
    {
      path: "payment-failed",
      element: (
        <ProtectedRouteAuth>
          <PayFailed />
        </ProtectedRouteAuth>
      ),
    },
    {
      path: "payment-success",
      element: (
        <ProtectedRouteAuth>
          <PaySuccess />
        </ProtectedRouteAuth>
      ),
    },
    {
      path: "*", // Route cho các đường dẫn không tồn tại
      element: <NotFound />, // Chuyển hướng đến trang NotFound
    },
    {
      path: "design-review/:id",
      element: (
        <ProtectedRouteAuth>
          <DesignReview />
        </ProtectedRouteAuth>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
