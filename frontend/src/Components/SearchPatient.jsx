import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Table, Alert, Row, Col } from "react-bootstrap";

function SearchPatient() {
  const [searchCriteria, setSearchCriteria] = useState({ id: "", email: "" });
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [error, setError] = useState("");
  const [hospitalId, setHospitalId] = useState(null); // Assume this is obtained from localStorage or context

  useEffect(() => {
    // Retrieve the 'user' object from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setHospitalId(user.HospitalId);
    }

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
          setError("Failed to fetch doctors.");
        }
      }
    };

    fetchDoctors();
  }, [hospitalId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPatients([]);

    try {
      const response = await axios.get(
        "http://localhost:5000/api/SearchPatient",
        {
          params: searchCriteria,
        }
      );
      setPatients(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No patient found with the provided criteria.");
      } else {
        setError("Error searching for patient.");
      }
    }
  };

  const handleAssignDoctor = async (patientId) => {
    if (!selectedDoctor) {
      alert("Please select a doctor.");
      return;
    }

    try {
      const visitDate = new Date(); // Example data

      await axios.post("http://localhost:5000/api/medicalHistory", {
        patientId,
        hospitalId,
        doctorId: selectedDoctor,
        visitDate,
        // Add other necessary fields here
      });

      alert("Doctor assigned and medical history created successfully.");
    } catch (err) {
      console.error("Error assigning doctor:", err);
      alert("Error assigning doctor.");
    }
  };

  return (
    <div>
      <h2>Search Patient</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group controlId="formPatientId">
              <Form.Label>Patient ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                placeholder="Enter Patient ID"
                value={searchCriteria.id}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                placeholder="Enter Email"
                value={searchCriteria.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Button variant="primary" type="submit" className="mt-4">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {patients.length > 0 && (
        <div className="mt-4">
          <h3>Search Results</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Contact No</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.id}</td>
                  <td>{patient.fullName}</td>
                  <td>{patient.contactNo}</td>
                  <td>
                    {`${patient.add_province}, ${patient.add_district}, ${patient.add_munciplity}, ${patient.add_wardno}, ${patient.add_area}`}
                  </td>
                  <td>{patient.gender}</td>
                  <td>{patient.email}</td>
                  <td>
                    <Form.Group controlId={`doctorSelect-${patient.id}`}>
                      <Form.Label>Select Doctor</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                      >
                        <option value="">Select a Doctor</option>
                        {doctors.map((doctor) => (
                          <option key={doctor.id} value={doctor.id}>
                            {doctor.fullName}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Button
                      variant="success"
                      onClick={() => handleAssignDoctor(patient.id)}
                    >
                      Assign Doctor
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default SearchPatient;
