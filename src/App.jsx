import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConsultationRequests from "./pages/consultation-requests";
import MyProfile from "./pages/my-profile";
import CreatedOrders from "./pages/created-orders";
import OngoingConsultations from "./pages/ongoing-consultations";
import OrderDetail from "./pages/order-detail";
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
