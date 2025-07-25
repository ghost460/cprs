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
function HospitalList() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/hospitals/HospitalList"
        );
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    console.log("Hospital List is", hospitals);

    fetchHospitals();
  }, []);
  return (
    <Adminpanel>
      <div style={{ padding: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Registered Hospitals
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hospital Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>No. of bed</TableCell>
                <TableCell>Service Offered</TableCell>
                <TableCell>Available Equipment</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Contact</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hospitals.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell>{hospital.hospitalName}</TableCell>
                  <TableCell>
                    {hospital.province} {hospital.district}{" "}
                    {hospital.municipality}-{hospital.wardNo}, {hospital.street}
                  </TableCell>
                  <TableCell>{hospital.numberOfBeds}</TableCell>
                  <TableCell>
                    {(hospital.servicesOffered.emergency && "emergency") ||
                      "N/A"}{" "}
                    {hospital.servicesOffered.surgical && "Surgical"}{" "}
                    {hospital.servicesOffered.diagnostic && "Diagnostic"}
                  </TableCell>
                  <TableCell>
                    {hospital.availableEquipments.xray && "X-ray"}
                    {", "}
                    {hospital.availableEquipments.mri && "MRI"},{" "}
                    {hospital.availableEquipments.ecg && "ecg"},{" "}
                    {hospital.availableEquipments.cpap && "cpap"},{" "}
                    {hospital.availableEquipments.ctScanner && "CtScan"}
                  </TableCell>
                  <TableCell>{hospital.email}</TableCell>

                  <TableCell>
                    Reception: {hospital.contactNumbers?.reception || "N/A"}
                    <br></br>
                    Info Officer:{hospital.contactNumbers?.infoOfficer || "N/A"}
                    <br></br>
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

export default HospitalList;
