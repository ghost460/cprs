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
} from "@mui/material";
import axios from "axios";
import Adminpanel from "../Adminpanel";

const GetAllPatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/patientreg/PatientList"
        );
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <Adminpanel>
      <div style={{ padding: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Registered Patients
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.fullName}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.contactNo}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>
                    {patient.add_province}, {patient.add_district},{" "}
                    {patient.add_munciplity}-{patient.add_wardno},{" "}
                    {patient.add_area}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Adminpanel>
  );
};

export default GetAllPatientList;
