import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import axios from "axios";
import Adminpanel from "../adminpanel/Adminpanel";

function DoctorSelectionAppointment({ hospitalId, patientId }) {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [problem, setProblem] = useState("");
  const [appointmentAt, setAppointmentAt] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (hospitalId) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/HospitalDoctors",
            {
              params: { hospitalId },
            }
          );
          setDoctors(response.data);
        } catch (err) {
          console.error("Error fetching doctors:", err);
        }
      }
    };

    fetchDoctors();
  }, [hospitalId]);

  const handleOpenDialog = (doctorId) => {
    setSelectedDoctor(doctorId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProblem("");
    setAppointmentAt("");
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5000/api/appointments", {
        doctorId: selectedDoctor,
        patientId,
        hospitalId,
        problem,
        appointmentAt,
      });
      alert("Appointment requested successfully");
      handleCloseDialog();
    } catch (err) {
      console.error("Failed to request appointment:", err);
    }
  };

  return (
    <Adminpanel>
      <div style={{ padding: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Doctors at Selected Hospital
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Specialization</TableCell>
                <TableCell>Experience (Years)</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.fullName}</TableCell>
                  <TableCell>{doc.contactNo}</TableCell>
                  <TableCell>{doc.email}</TableCell>
                  <TableCell>{doc.specialization}</TableCell>
                  <TableCell>{doc.experience}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(doc.id)}
                    >
                      Request Appointment
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Appointment Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Request Appointment</DialogTitle>
          <DialogContent>
            <TextField
              label="Appointment Date & Time"
              type="datetime-local"
              fullWidth
              value={appointmentAt}
              onChange={(e) => setAppointmentAt(e.target.value)}
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              label="Describe Your Problem"
              multiline
              rows={4}
              fullWidth
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Adminpanel>
  );
}

export default DoctorSelectionAppointment;
