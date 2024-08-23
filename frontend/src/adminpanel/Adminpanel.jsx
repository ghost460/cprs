import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function Adminpanel({ children }) {
  return (
    <div>
      <Topbar />
      <div className="cont">
        <Sidebar />
        <div className="others">{children}</div>
      </div>
    </div>
  );
}

export default Adminpanel;
