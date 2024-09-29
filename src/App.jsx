import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import HomePage from "./pages/home";
import ContactPage from "./pages/contact";
import Admin from "./pages/admin"
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
      path: "contact",
      element: <ContactPage />,
    },
    {
      path:"admin",
      element: <Admin/>,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
