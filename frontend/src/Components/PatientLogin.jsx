import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";

function PatientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    // Perform login logic here
    console.log("Login successful", { email, password });
  };
  return (
    <Dashboard>
      <Container className="d-flex justify-content-center  vh-100">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title text-center">
                  Welcome to Patient Login
                </h6>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                    <div className="register mt-3">
                      If you do not have an account?{" "}
                      <Link to="/PatientReg">Register Here</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Dashboard>
  );
}

export default PatientLogin;
