import React from "react";
import { Route, Routes } from "react-router-dom";
import ChangePassword from "../Page/Auth/ChangePassword";
import Login from "../Page/Auth/Login";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<ChangePassword />} />
    </Routes>
  );
};

export default AuthRoutes;
