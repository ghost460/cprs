import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminpanel from "../Adminpanel";
import { Table, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const [patientList, setPatientList] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the 'user' object from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setDoctorId(user.doctorId);
    }

    const fetchPatients = async () => {
      if (doctorId) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/PatientAssigToDoctor",
            {
              params: { doctorId },
            }
          );
          setPatientList(response.data.medicalHistories || []);
        } catch (err) {
          console.error("Error fetching patients:", err);
          setError("Failed to fetch patients.");
        }
      }
    };

    fetchPatients();
  }, [doctorId]);

  const handleProceed = (Id, fullName, patientId) => {
    navigate(`/PatientMedicalHistory/${Id}`, {
      state: { fullName, patientId },
    });
  };

  return (
    <Adminpanel>
      <div>
        <h1>Today's Patients</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {patientList.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Contact Number</th>
                <th>Email</th>
                <th>Visit Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientList.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.patient.fullName}</td>
                  <td>{`${entry.patient.add_area}, ${entry.patient.add_wardno}, ${entry.patient.add_munciplity}, ${entry.patient.add_district}, ${entry.patient.add_province}`}</td>
                  <td>{entry.patient.contactNo}</td>
                  <td>{entry.patient.email}</td>
                  <td>{new Date(entry.visitDate).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => handleProceed(entry.patient.id)}
                    >
                      Proceed
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No patients assigned for today.</p>
        )}
      </div>
    </Adminpanel>
  );
};

export default PatientList;
