import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "../Components/SidebarFront.css";

function SidebarFront() {
  return (
    <div className="sidebar">
      <div className="adminLogin text-center mt-4">
        <Link to="/AdminLogin">
          <span>Admin Login</span>
        </Link>
      </div>
      <div className="patientLogin text-center mt-4">
        <Link to="/PatientLogin">
          <span>Patient Login</span>
        </Link>
      </div>
    </div>
  );
}

export default SidebarFront;
