import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Dashboard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    // Perform login logic here
    try {
      const response = await axios.post(
        "http://localhost:5000/api/loginUser",
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { userData } = response.data;
        console.log("Login successful", userData);

        // Navigate to the Home route with userData
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/Home");
      }

      // Handle successful login (e.g., redirect to the dashboard)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Dashboard>
      <Container className="d-flex justify-content-center vh-100">
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <div className="card">
              <div className="card-body">
                <h6 className="card-title text-center">
                  Welcom to Admin Login
                </h6>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                      Username:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                    <div className="register mt-3"></div>
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

export default AdminLogin;
