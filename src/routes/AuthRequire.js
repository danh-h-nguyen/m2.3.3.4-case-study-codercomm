import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// ======
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
// ======

function AuthRequire({ children }) {
  const { isInitialized, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AuthRequire;
