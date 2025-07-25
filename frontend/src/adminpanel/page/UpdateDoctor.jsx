import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

function UpdateDoctor({ doctorId, onClose, onDoctorUpdated }) {
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/DoctorReg/Searchdoctor`, {
        params: { id: doctorId },
      })
      .then((response) => {
        const doctor = response.data;
        setFormData({
          fullName: doctor.fullName || "",
          address: doctor.address || "",
          contactNo: doctor.contactNo || "",
          email: doctor.email || "",
          licenseNo: doctor.licenseNo || "",
          specialization: doctor.specialization || "",
          experience: doctor.experience || "",
          username: doctor.username || "",
          password: "", // Do not preload password
          profilePicture: null, // New upload only
        });
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
      });
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profilePicture: file,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "profilePicture" && value instanceof File) {
        data.append("profilePicture", value);
      } else if (value !== undefined && value !== null && value !== "") {
        data.append(key, value);
      }
    });

    axios
      .put(`http://localhost:5000/api/DoctorReg/${doctorId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Doctor updated successfully");
        onDoctorUpdated();
        onClose();
      })
      .catch((error) => {
        const err = error.response?.data?.error;
        console.error("Error updating doctor data:", error);
        if (err === "Username already taken.") {
          alert(
            "The username is already taken. Please choose a different one."
          );
        } else {
          alert("An error occurred while updating doctor information.");
        }
      });
  };

  return (
    <Container>
      <h4 className="mb-3">Update Doctor Details</h4>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={4}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="contactNo">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="licenseNo">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                name="licenseNo"
                value={formData.licenseNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="specialization">
              <Form.Label>Specialization</Form.Label>
              <Form.Control
                type="text"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group controlId="experience">
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
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

        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateDoctor;
