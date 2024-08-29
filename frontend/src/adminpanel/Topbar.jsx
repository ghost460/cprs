import React, { useEffect, useState } from "react";
import "../css/topbar.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { json } from "react-router-dom";

function Topbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  if (!user) {
    return null;
  }

  const handleLogout = async () => {
    try {
      // Send a logout request to the server
      await axios.post(
        "http://localhost:5000/api/logoutUser",
        {},
        {
          withCredentials: true, // Include cookies with the request
        }
      );

      // Clear user data from localStorage
      localStorage.removeItem("user");

      // Clear any user-related information from the client-side
      // Redirect the user to the login page or home page
      window.location.href = "/"; // Update this to redirect as needed
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="topbar">
      <div className="topbarwrapper">
        <div className="left">
          <span className="logo">Centralized Patient Record System</span>
        </div>
        <div className="right">
          <div className="userInfo">
            <span className="userRole">{user.role} : </span>
            <span className="userName">{user.fullName}</span>

            {user.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="Profile"
                className="profilePicture"
              />
            ) : (
              <AccountCircleIcon className="defaultProfileIcon" />
            )}
          </div>
          <div className="logOutIcon" onClick={handleLogout}>
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
