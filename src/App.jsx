import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MyProfile from "./pages/my-profile";
import Order from "./pages/order-detail";
import OrderManagement from "./pages/manage-order";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <OrderManagement />,
    },
    {
      path: "order-management",
      element: <OrderManagement />,
    },
    {
      path: "my-profile",
      element: <MyProfile />,
    },
    {
      path: "order",
      element: <Order />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
