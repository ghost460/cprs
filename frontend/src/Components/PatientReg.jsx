import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import axios from "axios";

function PatientRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    add_province: "",
    add_district: "",
    add_munciplity: "",
    add_wardno: "",
    add_area: "",
    doc_type: "", // Default value
    doc_number: "",
    contactNo: "",
    email: "",
    fathername: "",
    emergencyContactName: "",
    bloodType: "",
    allergies: "",
    password: "",
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios
      .post("http://localhost:5000/api/patientreg/patientReg", data)
      .then((response) => {
        console.log("Patient data submitted successfully:", response.data);
        alert("Patient Registration successfully");
        // Handle success (e.g., redirect, show a message)
      })
      .catch((error) => {
        console.error("Error submitting patient data:", error);
        alert("patient Registration fail");
        // Handle error
      });
  };

  return (
    <Dashboard>
      <Form onSubmit={handleSubmit}>
        <h5>Patient Registration </h5>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Full Name * </Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="dateOfBirth">
              <Form.Label>Date of Birth *</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="gender">
              <Form.Label>Gender *</Form.Label>
              <Form.Control
                as="select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">select gender</option>
                <option value="MALE">male</option>
                <option value="FEMALE">female</option>
                <option value="OTHER">other</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="add_province">
              <Form.Label> Address: Province *</Form.Label>
              <Form.Control
                type="text"
                name="add_province"
                value={formData.add_province}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="add_district">
              <Form.Label>District *</Form.Label>
              <Form.Control
                type="text"
                name="add_district"
                value={formData.add_district}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="add_munciplity">
              <Form.Label>Municipality *</Form.Label>
              <Form.Control
                type="text"
                name="add_munciplity"
                value={formData.add_munciplity}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="add_wardno">
              <Form.Label>Ward No *</Form.Label>
              <Form.Control
                type="number"
                name="add_wardno"
                value={formData.add_wardno}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="add_area">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="text"
                name="add_area"
                value={formData.add_area}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="fathername">
              <Form.Label>Father/mother name *</Form.Label>
              <Form.Control
                type="text"
                name="fathername"
                value={formData.fathername}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="doc_type">
              <Form.Label>Document Type</Form.Label>
              <Form.Control
                as="select"
                name="doc_type"
                value={formData.doc_type}
                onChange={handleChange}
              >
                <option value="">select document type</option>
                <option value="CITIZENSHIP">Citizenship</option>
                <option value="DRIVING_LICENSE">Driving License</option>
                <option value="PASSPORT">Passport</option>
                <option value="BIRTH_CERTIFICATE">Birth Certificate</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="doc_number">
              <Form.Label>Document number</Form.Label>
              <Form.Control
                type="text"
                name="doc_number"
                value={formData.doc_number}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="contactNo">
              <Form.Label>Contact Number *</Form.Label>
              <Form.Control
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="emergencyContactName">
              <Form.Label>Emergency Contact Name</Form.Label>
              <Form.Control
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="bloodType">
              <Form.Label>Blood Type</Form.Label>
              <Form.Control
                as="select"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
              >
                <option value="">Select Blood Group</option>
                <option value="A_POSITIVE">A+</option>
                <option value="A_NEGATIVE">A-</option>
                <option value="B_POSITIVE">B+</option>
                <option value="B_NEGATIVE">B-</option>
                <option value="AB_POSITIVE">AB+</option>
                <option value="AB_NEGATIVE">AB-</option>
                <option value="O_POSITIVE">O+</option>
                <option value="O_NEGATIVE">O-</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="allergies">
              <Form.Label>Allergies</Form.Label>
              <Form.Control
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password *</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3" controlId="profilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Dashboard>
  );
}

export default PatientRegistration;
