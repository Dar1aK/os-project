import React, { FC } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactNode;
  auth: boolean;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ auth, children }) => {
  if (auth) {
    return <>{children}</>;
  }
  return <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
