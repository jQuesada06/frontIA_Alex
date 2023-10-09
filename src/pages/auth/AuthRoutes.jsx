import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Login from "./Login";
import Register from "./Register";

export const AuthRoutes = (props) => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login logged={props.logged} setLogged={props.setLogged} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/register",
      element: <Register />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/*",
      element: <Navigate to={"/"} />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
};
