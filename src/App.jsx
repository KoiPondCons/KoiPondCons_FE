import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConsultationRequests from "./pages/consultation-requests";
import MyProfile from "./pages/my-profile";
import CreatedOrders from "./pages/created-orders";
import OngoingConsultations from "./pages/ongoing-consultations";
import OrderDetail from "./pages/order-detail";
import Order from "./pages/order-detail2";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <ConsultationRequests />,
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
      path: "order",
      element: <Order />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
