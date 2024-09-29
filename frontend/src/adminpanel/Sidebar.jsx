import "../css/sidebar.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import StorageIcon from "@mui/icons-material/Storage";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SummarizeIcon from "@mui/icons-material/Summarize";
import HomeIcon from "@mui/icons-material/Home";
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
    // console.log(userData, role);
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
            </li>{" "}
            {isAllowed(role, ["ADMIN"]) && (
              <li className="sidebarItem">
                <Link Link to="/AssignDoctorToPatient">
                  <PersonAddIcon />
                  <span>AssignDoctorToPatient</span>
                </Link>
              </li>
            )}
            {isAllowed(role, ["SUPERADMIN"]) && (
              <li className="sidebarItem">
                <Link Link to="/HospitalRegistration">
                  <PersonAddIcon />
                  <span>Add Hospital</span>
                </Link>
              </li>
            )}
            {isAllowed(role, ["ADMIN"]) && (
              <li className="sidebarItem">
                <Link to="/DoctorRegistration">
                  <PersonAddIcon />
                  <span>Add Doctor</span>
                </Link>
              </li>
            )}
            {isAllowed(role, ["ADMIN"]) && (
              <li className="sidebarItem">
                <Link to="/LabTecnicianReg">
                  <PersonAddIcon />
                  <span>Labtechnician</span>
                </Link>
              </li>
            )}
            {isAllowed(role, ["DOCTOR"]) && (
              <li className="sidebarItem">
                <Link to="/PatientList">
                  <StorageIcon />
                  <span>PatientList</span>
                </Link>
              </li>
            )}
            {isAllowed(role, ["LAB_TECHNICIAN"]) && (
              <li className="sidebarItem">
                <Link to="/LabTestList">
                  <StorageIcon />
                  <span>LabTest List</span>
                </Link>
              </li>
            )}
            {isAllowed(role, ["PATIENT"]) && (
              <li className="sidebarItem">
                <Link to="/ViewPatientDetails">
                  <ShowChartIcon />
                  <span>View Reports</span>
                </Link>
              </li>
            )}
            {isAllowed(role, ["PATIENT"]) && (
              <li className="sidebarItem">
                <Link to="/Dignosis">
                  <ShowChartIcon />
                  <span>Request for dignosis</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
