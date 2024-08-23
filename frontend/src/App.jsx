import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";

import Home from "./pages/AboutUs";
import Dashboard from "./Components/Dashboard";
import PatientReg from "./Components/PatientReg";
import AboutUs from "./pages/AboutUs";
import PatientLogin from "./Components/PatientLogin";
import AdminLogin from "./Components/AdminLogin";
import Adminpanel from "./adminpanel/Adminpanel";
import Hospitalregister from "./adminpanel/page/Hospitalregister";
import LabTechnicianForm from "./adminpanel/page/LabTechnicianForm";
import SendOTPForm from "./Components/SendOTPForm";
import DoctorReg from "./adminpanel/page/DoctorReg";
import SearchDoctor from "./adminpanel/page/SearchDoctor";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/PatientLogin" element={<PatientLogin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/Emailverify" element={<SendOTPForm />} />
          <Route path="/PatientReg" element={<PatientReg />} />
          <Route path="/Home" element={<Adminpanel />} />
          <Route path="/HospitalRegistration" element={<Hospitalregister />} />
          <Route path="/LabTecnicianReg" element={<LabTechnicianForm />} />
          <Route path="/DoctorRegistration" element={<DoctorReg />} />
          <Route path="/SearchDoctor" element={<SearchDoctor />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
