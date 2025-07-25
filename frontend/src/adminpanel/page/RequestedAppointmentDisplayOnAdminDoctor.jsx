import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import Adminpanel from "../Adminpanel";

const statusLabels = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];

function RequestedAppointmentDisplayOnAdminDoctor() {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [refreshFlag, setRefreshFlag] = useState(false);

  const localData = JSON.parse(localStorage.getItem("user"));
  const userType = localData?.role;
  const userId =
    userType === "DOCTOR" ? localData.doctorId : localData?.HospitalId;

  useEffect(() => {
    if (!userId || !userType) return;

    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getAppointmentRequest",
          {
            params: {
              userType,
              userId,
              status: statusFilter,
            },
          }
        );
        setAppointments(response.data);
        console.log("Fetched appointments:", response.data);
      } catch (err) {
        console.error("Failed to load appointments", err);
      }
    };

    fetchAppointments();
  }, [statusFilter, userId, userType, refreshFlag]);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const targetAppointment = appointments.find(
        (a) => a.id === appointmentId
      );
      if (!targetAppointment) return;

      await axios.patch(
        `http://localhost:5000/api/appointments/${appointmentId}`,
        { status: newStatus }
      );

      // 👇 When status is CONFIRMED, create medical history entry
      if (newStatus === "CONFIRMED") {
        await axios.post("http://localhost:5000/api/medicalHistory", {
          patientId: targetAppointment.patientId,
          hospitalId: targetAppointment.hospitalId,
          doctorId: targetAppointment.doctorId,
          visitDate: targetAppointment.appointmentAt, // using appointment date/time
        });
      }

      setRefreshFlag((prev) => !prev); // trigger refetch
    } catch (err) {
      console.error("Failed to update appointment status", err);
    }
  };

  return (
    <Adminpanel>
      <div style={{ padding: "2rem" }}>
        <Tabs value={statusFilter} onChange={(e, val) => setStatusFilter(val)}>
          {statusLabels.map((status) => (
            <Tab key={status} label={status} value={status} />
          ))}
        </Tabs>

        <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Hospital</TableCell>
                <TableCell>Problem</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                {userType === "DOCTOR" && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell>{appt.patient.fullName}</TableCell>
                  <TableCell>{appt.doctor.fullName}</TableCell>
                  <TableCell>{appt.hospital.hospitalName}</TableCell>
                  <TableCell>{appt.problem}</TableCell>
                  <TableCell>
                    {new Date(appt.appointmentAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{appt.status}</TableCell>
                  {userType === "DOCTOR" && (
                    <TableCell>
                      {appt.status === "PENDING" && (
                        <>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              handleStatusUpdate(appt.id, "CONFIRMED")
                            }
                            style={{ margin: "0 4px" }}
                          >
                            CONFIRMED
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() =>
                              handleStatusUpdate(appt.id, "CANCELLED")
                            }
                            style={{ margin: "0 4px" }}
                          >
                            CANCELLED
                          </Button>
                        </>
                      )}
                      {appt.status === "CONFIRMED" && (
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() =>
                            handleStatusUpdate(appt.id, "COMPLETED")
                          }
                          style={{ margin: "0 4px" }}
                        >
                          COMPLETED
                        </Button>
                      )}
                      {/* No buttons for COMPLETED or CANCELLED */}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Adminpanel>
  );
}

export default RequestedAppointmentDisplayOnAdminDoctor;
