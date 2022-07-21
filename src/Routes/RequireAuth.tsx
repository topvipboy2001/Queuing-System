import React from "react";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = localStorage.getItem("userId");
  if (!auth) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default RequireAuth;
