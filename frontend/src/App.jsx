import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Router,
  Navigate,
} from "react-router-dom";

import api from "./services/Authencation.apiServices.js";
import ProtectedRoute from "./services/Protectedroutes.jsx";
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
import AssignDoctorToPatient from "./adminpanel/page/AssignDoctorToPatient.jsx";
import PatientList from "./adminpanel/page/PatientList.jsx";
import PatientMedicalHistory from "./adminpanel/page/PatientMedicalHistory.jsx";
import UpdateMedicalHistory from "./adminpanel/page/UpdateMedicalHistory.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AboutUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/PatientLogin" element={<PatientLogin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/Emailverify" element={<SendOTPForm />} />
          <Route path="/PatientReg" element={<PatientReg />} />
          <Route
            path="/Home"
            element={
              <ProtectedRoute
                allowedRoles={["ADMIN", "DOCTOR", "LAB_TECHNICIAN"]}
              >
                <Adminpanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/HospitalRegistration"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                {" "}
                <Hospitalregister />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/LabTecnicianReg" element={<LabTechnicianForm />} />
          <Route path="/DoctorRegistration" element={<DoctorReg />} />
          <Route path="/SearchDoctor" element={<SearchDoctor />} />
          <Route
            path="/AssignDoctorToPatient"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AssignDoctorToPatient />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PatientList"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR"]}>
                <PatientList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/PatientMedicalHistory/:Id"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR"]}>
                <PatientMedicalHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/UpdateMedicalHistory"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR"]}>
                <UpdateMedicalHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
