import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  auth: boolean;
};

const ProtectedRoute = ({ auth, children }: ProtectedRouteProps) => {
  if (auth) {
    return <>{children}</>;
  }
  return <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
