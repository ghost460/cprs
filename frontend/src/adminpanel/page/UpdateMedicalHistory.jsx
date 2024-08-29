import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateMedicalHistory = ({ medicalHistoryId, onClose }) => {
  const [formData, setFormData] = useState({
    bloodPressure: "",
    weight: "",
    currentProblem: "",
    refersToTest: false,
    labtesttype: "",
    LabtestItems: "",
    doctorPrescription: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch existing medical history data if updating
    const fetchMedicalHistory = async () => {
      if (medicalHistoryId) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/medicalHistory/${medicalHistoryId}`
          );
          setFormData(response.data);
        } catch (err) {
          console.error("Error fetching medical history:", err);
          setError("Failed to fetch medical history.");
        }
      }
    };

    fetchMedicalHistory();
  }, [medicalHistoryId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/medicalHistory/${medicalHistoryId}`,
        formData
      );
      setSuccess("Medical history updated successfully.");
      if (onClose) onClose(); // Close the form or redirect
    } catch (err) {
      console.error("Error updating medical history:", err);
      setError("Failed to update medical history.");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2>Update Medical History</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBloodPressure">
              <Form.Label>Blood Pressure</Form.Label>
              <Form.Control
                type="text"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                placeholder="Enter blood pressure"
              />
            </Form.Group>

            <Form.Group controlId="formWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight"
              />
            </Form.Group>

            <Form.Group controlId="formCurrentProblem">
              <Form.Label>Current Problem</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="currentProblem"
                value={formData.currentProblem}
                onChange={handleChange}
                placeholder="Describe the current problem"
              />
            </Form.Group>

            <Form.Group controlId="formRefersToTest">
              <Form.Check
                type="checkbox"
                label="Refers to Test"
                name="refersToTest"
                checked={formData.refersToTest}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formLabtesttype">
              <Form.Label>Lab Test Type</Form.Label>
              <Form.Control
                type="text"
                name="labtesttype"
                value={formData.labtesttype}
                onChange={handleChange}
                placeholder="Enter lab test type"
              />
            </Form.Group>

            <Form.Group controlId="formLabtestItems">
              <Form.Label>Lab Test Items</Form.Label>
              <Form.Control
                type="text"
                name="LabtestItems"
                value={formData.LabtestItems}
                onChange={handleChange}
                placeholder="Enter lab test items"
              />
            </Form.Group>

            <Form.Group controlId="formDoctorPrescription">
              <Form.Label>Doctor's Prescription</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="doctorPrescription"
                value={formData.doctorPrescription}
                onChange={handleChange}
                placeholder="Enter doctor's prescription"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
            <Button variant="secondary" onClick={onClose} className="ml-2">
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateMedicalHistory;
