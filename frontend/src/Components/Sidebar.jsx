import "./sidebar.css";
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
              <Link to="/component/pages/Addrecord">
                <PlaylistAddCircleIcon />
                <span>add record</span>
              </Link>
            </li>
            <li className="sidebarItem">
              <Link to="/component/Dashboard/TabPanel">
                <VerifiedIcon />
                <span>Verify Record</span>
              </Link>
            </li>
            <li className="sidebarItem">
              <StorageIcon />
              <span>Crime Record</span>
            </li>
            <li className="sidebarItem">
              <ShowChartIcon />
              <span>Crime Analysis</span>
            </li>
            <li className="sidebarItem">
              <SummarizeIcon />
              <span>Crime Reports</span>
            </li>
            <li className="sidebarItem">Download २७ बुदे</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
