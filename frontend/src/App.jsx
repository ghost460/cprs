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
import LabTestList from "./adminpanel/page/LabTestList.jsx";
import LabTestForm from "./adminpanel/page/LabtestForm.jsx";
import PatientView from "./adminpanel/page/PatientView.jsx";
import HomeAdmin from "./adminpanel/page/Home.jsx";
import Doctor_appointment from "./adminpanel/page/Doctor_appointment.jsx";
import HospitalList from "./adminpanel/page/HospitalList.jsx";
import AppointmentRequest from "./adminpanel/page/RequestedAppointmentDisplayOnAdminDoctor.jsx";
import MyAppointments from "./Components/MyAppointments.jsx";
import ChatRoom from "./Components/ChatBox.jsx";
import ConferenceRoom from "./Components/VideoCallLink.jsx";
import ChatPage from "./Components/ChatPage.jsx";
import TelemedicineRoom from "./Components/TelemedicineRoom.jsx";
import DoctorList from "./adminpanel/page/DoctorList.jsx";
import GetAllPatientList from "./adminpanel/page/GetALLPatientList.jsx";

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
                allowedRoles={[
                  "SUPERADMIN",
                  "ADMIN",
                  "DOCTOR",
                  "LAB_TECHNICIAN",
                  "PATIENT",
                ]}
              >
                <HomeAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/HospitalRegistration"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                {" "}
                <Hospitalregister />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/HospitalList"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                {" "}
                <HospitalList />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/DoctorList"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN"]}>
                {" "}
                <DoctorList />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/AllPatientList"
            element={
              <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
                {" "}
                <GetAllPatientList />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/LabTecnicianReg"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <LabTechnicianForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DoctorRegistration"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <DoctorReg />
              </ProtectedRoute>
            }
          />
          <Route
            path="/SearchDoctor"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <SearchDoctor />
              </ProtectedRoute>
            }
          />
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

          <Route
            path="/LabTestList"
            element={
              <ProtectedRoute allowedRoles={["LAB_TECHNICIAN"]}>
                <LabTestList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/LabTestReport/:Id"
            element={
              <ProtectedRoute allowedRoles={["LAB_TECHNICIAN"]}>
                <LabTestForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ViewPatientDetails"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <PatientView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Doctor_appointment"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <Doctor_appointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AppointmentRequest"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR", "ADMIN"]}>
                <AppointmentRequest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/MyAppointments"
            element={
              <ProtectedRoute allowedRoles={["PATIENT"]}>
                <MyAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ChatRoom"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR", "PATIENT"]}>
                <ChatRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ConferenceRoom"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR", "PATIENT"]}>
                <TelemedicineRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ChatPage"
            element={
              <ProtectedRoute allowedRoles={["DOCTOR", "PATIENT"]}>
                <ChatPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
