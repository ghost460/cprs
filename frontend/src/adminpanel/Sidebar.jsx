import "../css/sidebar.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import StorageIcon from "@mui/icons-material/Storage";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SummarizeIcon from "@mui/icons-material/Summarize";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarwrapper">
        <div className="sidebarmenu">
          <h5 className="sidebartitle">Dashboard</h5>
          <ul className="sidebarlist">
            <li className="sidebarItem">
              <Link to="/component/pages/Home">
                <HomeIcon />
                <span>Home</span>
              </Link>
            </li>{" "}
            <li className="sidebarItem">
              <Link Link to="/AssignDoctorToPatient">
                <PersonAddIcon />
                <span>AssignDoctorToPatient</span>
              </Link>
            </li>
            <li className="sidebarItem">
              <Link Link to="/HospitalRegistration">
                <PersonAddIcon />
                <span>Add Hospital</span>
              </Link>
            </li>
            <li className="sidebarItem">
              <Link to="/DoctorRegistration">
                <PersonAddIcon />
                <span>Add Doctor</span>
              </Link>
            </li>
            <li className="sidebarItem">
              <Link to="/LabTecnicianReg">
                <PersonAddIcon />
                <span>Labtechnician</span>
              </Link>
            </li>
            <li className="sidebarItem">
              <Link to="/PatientList">
                <StorageIcon />
                <span>PatientList</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
