import React from "react";
import "../css/topbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Topbar() {
  const handleLogout = async () => {
    try {
      // Send a logout request to the server
      await axios.get("http://localhost:5000/logout", {
        withCredentials: true,
      });
      window.location.href = window.location.origin;
      // Clear any user-related information from the client-side
      // Redirect the user to the login page
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="topbar">
      <div className="topbarwrapper">
        <div className="left">
          <span className="logo">Centralized patient Record System</span>
        </div>
        <div className="right">
          <div className="logOutIcon" onClick={handleLogout}>
            <LogoutIcon />
          </div>

          <div className="topNotifiIcon">
            <NotificationsNoneIcon />
            <span className="topIconBag">2</span>
          </div>

          <div className="UserIcon">
            <AccountCircleIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
