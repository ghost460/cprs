import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Adminpanel from "../Adminpanel";
import axios from "axios";

const LabTechnicianForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    contactNo: "",
    specialization: "",
    experience: "",
    profilePicture: "",
    username: "",
    password: "",
  });

  const [hospitalId, setHospitalId] = useState(null);

  useEffect(() => {
    // Extract hospitalId from local storage
    const userData = localStorage.getItem("user");
    const { HospitalId } = JSON.parse(userData);
    setHospitalId(HospitalId);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    formDataToSend.append("hospitalId", hospitalId);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/LabTechReg/Labtechreg",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Lab Technician registered successfully");
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error registering Lab Technician");
    }
  };

  return (
    <Adminpanel>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Enter full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="contactNo">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNo"
                placeholder="Enter contact number"
                value={formData.contactNo}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="specialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                placeholder="Enter specialization"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="experience">
              <Form.Label>Experience (Years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                placeholder="Enter years of experience"
                value={formData.experience}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="profilePicture">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Adminpanel>
  );
};

export default LabTechnicianForm;
