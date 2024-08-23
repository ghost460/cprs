import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Adminpanel from "../Adminpanel";
import SearchDoctor from "./SearchDoctor";

function DoctorReg() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    contactNo: "",
    email: "",
    username: "",
    password: "",
    licenseNo: "",
    specialization: "",
    experience: "",
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
      .post("http://localhost:5000/api/DoctorReg/DoctorReg", data)
      .then((response) => {
        console.log("Doctor data submitted successfully:", response.data);
        // Handle success
        alert("Doctor registration successfully");
        setFormData({
          fullName: "",
          address: "",
          contactNo: "",
          email: "",
          licenseNo: "",
          specialization: "",
          experience: "",
          profilePicture: null,
          username: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error submitting doctor data:", error);
        // Handle error
      });
  };

  const [showSearch, setShowSearch] = useState(false);

  return (
    <Adminpanel>
      <Container>
        <Row>
          <h4>Doctor Search</h4>

          <Col className="text-end">
            <Button
              variant="secondary"
              onClick={() => setShowSearch(!showSearch)}
            >
              {showSearch ? "Hide Search" : "Search"}
            </Button>
          </Col>
        </Row>

        {showSearch && (
          <div className="mt-4">
            <SearchDoctor />
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <h4>Doctor Registration</h4>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="fullName">
                <Form.Label>Full Name</Form.Label>
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
              <Form.Group className="mb-3" controlId="address">
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

            <Col md={4}>
              <Form.Group className="mb-3" controlId="contactNo">
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

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="licenseNo">
                <Form.Label>License Number</Form.Label>
                <Form.Control
                  type="text"
                  name="licenseNo"
                  value={formData.licenseNo}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3" controlId="specialization">
                <Form.Label>Specialization</Form.Label>
                <Form.Control
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="experience">
                <Form.Label>Experience (years)</Form.Label>
                <Form.Control
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
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
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3" controlId="password">
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
          </Row>

          <Row>
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
      </Container>
    </Adminpanel>
  );
}

export default DoctorReg;
