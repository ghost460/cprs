import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import Adminpanel from "../Adminpanel";
import { useLocation } from "react-router-dom";

const LabTestForm = () => {
  const [formData, setFormData] = useState({
    labTestReport: "",
    labTestReportDoc: null,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [labTechnicianId, setLabTechnicianId] = useState(null);

  const location = useLocation();
  const { Id } = location.state; // medicalHistoryId from the proceed button

  useEffect(() => {
    // Extract labTechnicianId from local storage
    const userData = localStorage.getItem("user");
    const { labTechnicianId } = JSON.parse(userData);
    setLabTechnicianId(labTechnicianId);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, labTestReportDoc: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!labTechnicianId || !Id) {
      setError("Lab Technician ID or Medical History ID is missing.");
      return;
    }

    const data = new FormData();
    data.append("labTestReportDoc", formData.labTestReportDoc);
    data.append("labTestReport", formData.labTestReport);
    data.append("labTechnicianId", labTechnicianId);
    data.append("medicalHistoryId", Id);

    try {
      await axios.post("http://localhost:5000/api/LabReport", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess("Lab test report submitted successfully.");
      setError(null);
      setFormData({
        labTestReport: "",
        labTestReportDoc: null,
      });
    } catch (err) {
      setError("Failed to submit lab test report.");
      setSuccess(null);
      console.error("Error submitting lab test report:", err);
    }
  };

  return (
    <Adminpanel>
      <div className="container">
        <h4>Submit Lab Test Report</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formLabTestReportDoc">
            <Form.Label>Lab Test Report Document</Form.Label>
            <Form.Control
              type="file"
              name="labTestReportDoc"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Form.Group controlId="formLabTestReport">
            <Form.Label>Lab Test Report Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="labTestReport"
              placeholder="Enter notes about the lab test report"
              value={formData.labTestReport}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </div>
    </Adminpanel>
  );
};

export default LabTestForm;
