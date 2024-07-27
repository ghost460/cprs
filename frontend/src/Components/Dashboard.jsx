import React, { useState } from "react";
import Topbar from "./Header";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import "./SidebarFront";
import SidebarFront from "./SidebarFront";

function Dashboard({ children }) {
  return (
    <div>
      <Topbar />
      <div className="cont">
        <div className="others">{children}</div>
        <SidebarFront />
      </div>
    </div>
  );
}

export default Dashboard;
