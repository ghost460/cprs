import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";

function PatientRegistration() {
  const [formData, setFormData] = useState({
    medicalId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    fatherName: "",
    address: "",
    sex: "",
    doctype: "",
    docno: "",
    contactNo: "",
    email: "",
    password: "",
    repassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((value) => value === "")) {
      setError("Please fill in all required fields");
      return;
    }
    if (formData.password !== formData.repassword) {
      setError("Passwords do not match. Please enter the same password.");
      return;
    }
    setError("");
    // Perform form submission logic here
    console.log("Form submitted successfully", formData);
  };

  return (
    <Dashboard>
      <Container>
        <h2 className="text-center mt-4">Patient Registration</h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col sm={4}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Father's Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Document Type</Form.Label>
                <Form.Select
                  name="doctype"
                  value={formData.doctype}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select...</option>
                  <option value="Birth certificate">Birth certificate</option>
                  <option value="citizenship">citizenship</option>
                  <option value="dl">Driving Licence</option>
                  <option value="Passport">Passport</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Document Number</Form.Label>
                <Form.Control
                  type="text"
                  name="docno"
                  value={formData.docno}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={3}>
              <Form.Group>
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group>
                <Form.Label>Re-Password</Form.Label>
                <Form.Control
                  type="password"
                  name="repassword"
                  value={formData.repassword}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {error && (
            <Row>
              <Col className="text-center text-danger">{error}</Col>
            </Row>
          )}

          <div className="text-center">
            <Button type="submit" variant="primary" className="mt-3">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </Dashboard>
  );
}

export default PatientRegistration;
