import React, { useState } from "react";
import { Container, Form, Button, Col, Row, Table } from "react-bootstrap";
import axios from "axios";
import Adminpanel from "../Adminpanel";

function SearchDoctor() {
  const [searchData, setSearchData] = useState({
    id: "",
    licenseNo: "",
    email: "",
    contactNo: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:5000/api/doctor/search", {
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

  const handleAdd = () => {
    // Logic for adding a new doctor or handling the add functionality
  };

  const handleUpdate = (doctorId) => {
    // Logic for updating the doctor's information
    console.log("Update doctor with ID:", doctorId);
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

  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <Row>
          <Col md={3}>
            <Form.Group controlId="id">
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
            <Form.Group controlId="licenseNo">
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
            <Form.Group controlId="email">
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
            <Form.Group controlId="contactNo">
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
                <Button variant="success" onClick={handleAdd} className="me-2">
                  Add
                </Button>
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
              </td>
            </tr>
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default SearchDoctor;
