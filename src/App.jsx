import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HistoryConstruction from "./pages/construction-staff/history-construction";
import ActiveProject from "./pages/construction-staff/active-project";
import Order from "./pages/order-detail";
import PriceListStaff from "./pages/construction-staff/price-list-staff";
function App() {
  const router = createBrowserRouter([
    {
      path: "history-construction",
      element: <HistoryConstruction />,
    },
    {
      path: "active-projects",
      element: <ActiveProject />,
    },
    {
      path: "order-detail/:id",
      element: <Order />,
    },
    {
      path: "price-list-staff",
      element: <PriceListStaff />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
