// components/PatientAppointments.jsx
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import Adminpanel from "../adminpanel/Adminpanel";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const localData = JSON.parse(localStorage.getItem("user"));
  const patientId = localData?.id;

  useEffect(() => {
    if (!patientId) return;

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getAppointmentRequest",
          {
            params: {
              userType: "PATIENT",
              userId: patientId,
              // ❌ removed status filter to fetch ALL appointments
            },
          }
        );
        setAppointments(response.data);
      } catch (err) {
        console.error("Failed to fetch patient appointments", err);
      }
    };

    fetchAppointments();
  }, [patientId]);

  return (
    <Adminpanel>
      <div style={{ padding: "2rem" }}>
        <h2>My Appointment History</h2>
        <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Hospital</TableCell>
                <TableCell>Problem</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>{appt.doctor.fullName}</TableCell>
                  <TableCell>{appt.hospital.hospitalName}</TableCell>
                  <TableCell>{appt.problem}</TableCell>
                  <TableCell>
                    {new Date(appt.appointmentAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{appt.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Adminpanel>
  );
}

export default MyAppointments;
