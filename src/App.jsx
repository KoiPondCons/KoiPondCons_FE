import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ConsultationRequests from "./pages/consultation-requests";
function App() {
  const router = createBrowserRouter([
    {
      path: "consultation-requests",
      element: <ConsultationRequests />,
    },
    {
      path: "admin",
      element: <Admin />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
