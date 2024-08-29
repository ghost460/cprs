import React, { useState, useEffect } from "react";
import { Container, Form, Button, Col, Row, Table } from "react-bootstrap";
import axios from "axios";
import UpdateDoctor from "./UpdateDoctor";

function SearchDoctor() {
  const [searchData, setSearchData] = useState({
    id: "",
    licenseNo: "",
    email: "",
    contactNo: "",
  });

  const [result, setResult] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [hospitalId, setHospitalId] = useState(null);

  useEffect(() => {
    // Retrieve the user data from local storage
    const userData = localStorage.getItem("user");
    if (userData) {
      // Parse the JSON string to an object
      const parsedData = JSON.parse(userData);
      // Extract the HospitalId
      const storedHospitalId = parsedData.HospitalId;
      if (storedHospitalId) {
        setHospitalId(parseInt(storedHospitalId, 10));
      } else {
        console.error("Hospital ID not found in user data.");
      }
    } else {
      console.error("User data not found in local storage.");
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:5000/api/DoctorReg/Searchdoctor", {
        params: searchData,
      })
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.error("Error searching doctor:", error);
        setResult(null);
      });
  };

  const handleUpdate = (doctorId) => {
    setSelectedDoctorId(doctorId);
    setShowUpdateForm(true);
  };

  const handleDelete = (doctorId) => {
    axios
      .delete(`http://localhost:5000/api/doctor/${doctorId}`)
      .then(() => {
        alert("Doctor deleted successfully");
        setResult(null); // Clear the result after deletion
      })
      .catch((error) => {
        console.error("Error deleting doctor:", error);
      });
  };

  const handleAddDoctor = (doctorId) => {
    if (!hospitalId) {
      alert("Hospital ID not found in local storage.");
      return;
    }

    axios
      .post("http://localhost:5000/api/addDoctorToHospital", {
        doctorId,
        hospitalId,
      })
      .then(() => {
        alert("Doctor added to hospital successfully.");
      })
      .catch((error) => {
        alert("Something went wrong adding doctor to the hospital");
        console.error("Error adding doctor to hospital:", error);
      });
  };

  const closeUpdateForm = () => {
    setShowUpdateForm(false);
    setSelectedDoctorId(null);
  };

  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <Row>
          <Col md={3}>
            <Form.Group controlId="S_id">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={searchData.id}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="S_licenseNo">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                name="licenseNo"
                value={searchData.licenseNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="S_email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={searchData.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="S_contactNo">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNo"
                value={searchData.contactNo}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Search
        </Button>
      </Form>

      {result && (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>License Number</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{result.id}</td>
              <td>{result.fullName}</td>
              <td>{result.email}</td>
              <td>{result.contactNo}</td>
              <td>{result.licenseNo}</td>
              <td>{result.specialization}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleUpdate(result.id)}
                  className="me-2"
                >
                  Update
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(result.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleAddDoctor(result.id)} // Fixed here
                  className="ms-2"
                >
                  Add Doctor
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      )}

      {showUpdateForm && selectedDoctorId && (
        <UpdateDoctor
          doctorId={selectedDoctorId}
          onClose={closeUpdateForm}
          onDoctorUpdated={() => setResult(null)}
        />
      )}
    </Container>
  );
}

export default SearchDoctor;
