import React from "react";
import SuperAdminHome from "./SuperAdminHome";
import Adminpanel from "../Adminpanel";
import DoctorHome from "../page/DoctorHome";
import AdminHome from "./AdminHome";
import { useEffect, useState } from "react";
import PatientHome from "./PatientHome";

function Home() {
  const [role, setRole] = useState("");
  useEffect(() => {
    const userData = localStorage.getItem("user");
    const { role } = JSON.parse(userData);
    setRole(role);
    // console.log(userData, role);
  }, []);
  return (
    <Adminpanel>
      {role === "SUPERADMIN" && <SuperAdminHome />}
      {role === "DOCTOR" && <DoctorHome />}
      {role === "ADMIN" && <AdminHome />}
      {role === "PATIENT" && <PatientHome />}
    </Adminpanel>
  );
}

export default Home;
