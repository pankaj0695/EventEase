import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useUser();

  if (isLoading) return null; // or a loading spinner
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
