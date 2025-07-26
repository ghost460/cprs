import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import axios from "axios";
import Adminpanel from "../Adminpanel";

function LabTechnicianList() {
  const [labTechs, setLabTechs] = useState([]);

  useEffect(() => {
    const fetchLabTechnicians = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const hospitalId = user?.HospitalId;

        if (!hospitalId) {
          console.error("Hospital ID not found in localStorage");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/LabTechReg/ByHospital",
          {
            params: { hospitalId },
          }
        );

        setLabTechs(response.data);
      } catch (error) {
        console.error("Error fetching lab technicians:", error);
      }
    };

    fetchLabTechnicians();
  }, []);

  return (
    <Adminpanel>
      <div style={{ padding: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Registered Lab Technicians
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Profile</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Experience (Years)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {labTechs.map((tech) => (
                <TableRow key={tech.id}>
                  <TableCell>
                    <Avatar src={tech.profilePicture} alt={tech.fullName} />
                  </TableCell>
                  <TableCell>{tech.fullName}</TableCell>
                  <TableCell>{tech.address}</TableCell>
                  <TableCell>{tech.contactNo}</TableCell>
                  <TableCell>{tech.specialization}</TableCell>
                  <TableCell>{tech.experience}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Adminpanel>
  );
}

export default LabTechnicianList;
