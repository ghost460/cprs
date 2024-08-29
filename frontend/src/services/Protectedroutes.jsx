import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
//import * as jwt_decode from "jwt-decode"; // ES module import

const ProtectedRoute = ({ children, allowedRoles }) => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const accessToken = getCookie("accessToken");

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  try {
    const decodedToken = jwtDecode(accessToken);

    // Check if the user's role is allowed to access the route
    if (allowedRoles && !allowedRoles.includes(decodedToken.role)) {
      return <Navigate to="/not-authorized" replace />;
    }

    return children; // Render the protected component if the role is allowed
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
