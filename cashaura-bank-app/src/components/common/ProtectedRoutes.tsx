import React from "react";
import { Navigate } from "react-router-dom";
import { useBank } from "../../context/BankContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "user" | "admin";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { currentUser } = useBank();

  if (!currentUser) {
    return <Navigate to='/login' replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to='/unauthorized' replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
