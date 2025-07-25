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
import Adminpanel from "../adminpanel/Adminpanel";

export default function HospitalsForAppointment({ onSelect }) {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hospitals/HospitalList")
      .then((res) => {
        setHospitals(res.data);
      })
      .catch((err) => {
        console.error("Error fetching hospitals:", err);
      });
  }, []);

  return (
    <Adminpanel>
      <div style={{ padding: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Select a Hospital
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hospital Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>Contact</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hospitals.map((hospital) => (
                <TableRow
                  key={hospital.id}
                  hover
                  style={{ cursor: "pointer" }}
                  onClick={() => onSelect(hospital.id)}
                >
                  <TableCell>{hospital.hospitalName}</TableCell>
                  <TableCell>
                    {hospital.province}, {hospital.district},{" "}
                    {hospital.municipality}-{hospital.wardNo}, {hospital.street}
                  </TableCell>
                  <TableCell>
                    {hospital.servicesOffered?.emergency && "Emergency "}
                    {hospital.servicesOffered?.surgical && "Surgical "}
                    {hospital.servicesOffered?.diagnostic && "Diagnostic "}
                  </TableCell>
                  <TableCell>
                    Reception: {hospital.contactNumbers?.reception || "N/A"}
                    <br />
                    Info: {hospital.contactNumbers?.infoOfficer || "N/A"}
                    <br />
                    Emergency: {hospital.contactNumbers?.emergency || "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Adminpanel>
  );
}
