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

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get(
          " http://localhost:5000/api/DoctorReg/AllDoctors",
          {
            params: {
              role: user.role,
              userId: user.id,
              hospitalId: user.HospitalId, // Only used if ADMIN
            },
          }
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <Adminpanel>
      <div style={{ padding: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Registered Doctors
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Profile</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>License No</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Experience (Years)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell>
                    <Avatar src={doctor.profilePicture} alt={doctor.fullName} />
                  </TableCell>
                  <TableCell>{doctor.fullName}</TableCell>
                  <TableCell>{doctor.address}</TableCell>
                  <TableCell>{doctor.contactNo}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.licenseNo}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.experience}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Adminpanel>
  );
}

export default DoctorList;
