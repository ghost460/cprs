import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Container, Row, Col, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewMedicalHistory = ({ patientId }) => {
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/getMedicalHistory?patient=${patientId}`
        );
        setMedicalHistory(response.data.data);
      } catch (err) {
        console.error("Error fetching medical history:", err);
        setError("Failed to fetch medical history.");
      }
    };

    fetchMedicalHistory();
  }, [patientId]);

  return (
    <Container>
      <Row>
        <Col>
          {error && <Alert variant="danger">{error}</Alert>}
          {medicalHistory && medicalHistory.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hospital Name</th>
                  <th>Doctor Name</th>
                  <th>Blood Pressure</th>
                  <th>Weight</th>
                  <th>Current Problem</th>
                  <th>Refers to Test</th>
                  <th>Lab Test Type</th>
                  <th>Lab Test Items</th>
                  <th>Doctor's Prescription</th>
                </tr>
              </thead>
              <tbody>
                {medicalHistory.map((history) => (
                  <tr key={history.id}>
                    <td>{history.id}</td>
                    <td>{history.hospital.hospitalName}</td>
                    <td>{history.precripted_doctor.fullName}</td>
                    <td>{history.bloodPressure}</td>
                    <td>{history.weight}</td>
                    <td>{history.currentProblem}</td>
                    <td>{history.refersToTest ? "Yes" : "No"}</td>
                    <td>{history.labtesttype}</td>
                    <td>{history.LabtestItems}</td>
                    <td>{history.doctorPrescription}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No medical history available.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewMedicalHistory;
