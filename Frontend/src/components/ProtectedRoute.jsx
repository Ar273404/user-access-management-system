import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { token, role, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    // If user doesn't have required role, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
