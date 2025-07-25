import "../css/sidebar.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GroupIcon from "@mui/icons-material/Group";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DescriptionIcon from "@mui/icons-material/Description";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import EventNoteIcon from "@mui/icons-material/EventNote";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [role, setRole] = useState("");

  function isAllowed(role, allowedRoles = []) {
    return allowedRoles.includes(role);
  }

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const { role } = JSON.parse(userData);
    setRole(role);
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarwrapper">
        <div className="sidebarmenu">
          <h5 className="sidebartitle">Dashboard</h5>
          <ul className="sidebarlist">
            <li className="sidebarItem">
              <Link to="/Home">
                <HomeIcon />
                <span>Home</span>
              </Link>
            </li>

            {isAllowed(role, ["ADMIN"]) && (
              <li className="sidebarItem">
                <Link to="/AssignDoctorToPatient">
                  <AssignmentIcon />
                  <span>Assign Doctor</span>
                </Link>
              </li>
            )}

            {isAllowed(role, ["SUPERADMIN"]) && (
              <>
                <li className="sidebarItem">
                  <Link to="/HospitalRegistration">
                    <LocalHospitalIcon />
                    <span>Add Hospital</span>
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link to="/HospitalList">
                    <ListAltIcon />
                    <span>Hospitals List</span>
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link to="/DoctorList">
                    <GroupIcon />
                    <span>Doctors List</span>
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link to="/AllPatientList">
                    <GroupIcon />
                    <span>Patients List</span>
                  </Link>
                </li>
              </>
            )}

            {isAllowed(role, ["ADMIN"]) && (
              <>
                <li className="sidebarItem">
                  <Link to="/DoctorRegistration">
                    <MedicalServicesIcon />
                    <span>Add Doctor</span>
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link to="/LabTecnicianReg">
                    <AddBoxIcon />
                    <span>Register Lab Technician</span>
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link to="/DoctorList">
                    <GroupIcon />
                    <span>Doctors List</span>
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link to="/LabTecnicians">
                    <ListAltIcon />
                    <span>Lab Technician List</span>
                  </Link>
                </li>
              </>
            )}

            {isAllowed(role, ["ADMIN", "DOCTOR"]) && (
              <li className="sidebarItem">
                <Link to="/AppointmentRequest">
                  <RequestPageIcon />
                  <span>Appointment Request</span>
                </Link>
              </li>
            )}

            {isAllowed(role, ["DOCTOR"]) && (
              <li className="sidebarItem">
                <Link to="/PatientList">
                  <GroupIcon />
                  <span>Patient List</span>
                </Link>
              </li>
            )}

            {isAllowed(role, ["LAB_TECHNICIAN"]) && (
              <li className="sidebarItem">
                <Link to="/LabTestList">
                  <DescriptionIcon />
                  <span>Lab Test List</span>
                </Link>
              </li>
            )}

            {isAllowed(role, ["PATIENT"]) && (
              <>
                <li className="sidebarItem">
                  <Link to="/ViewPatientDetails">
                    <DescriptionIcon />
                    <span>View Reports</span>
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link to="/Doctor_appointment">
                    <MedicalServicesIcon />
                    <span>Request Appointment</span>
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link to="/MyAppointments">
                    <EventNoteIcon />
                    <span>My Appointments</span>
                  </Link>
                </li>
              </>
            )}

            {isAllowed(role, ["PATIENT", "DOCTOR"]) && (
              <>
                <li className="sidebarItem">
                  <Link to="/ChatPage">
                    <ChatIcon />
                    <span>Chat Room</span>
                  </Link>
                </li>
                <li className="sidebarItem">
                  <Link to="/ConferenceRoom">
                    <VideoCallIcon />
                    <span>Conference Room</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
