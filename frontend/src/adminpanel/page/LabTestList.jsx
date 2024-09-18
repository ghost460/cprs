import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminpanel from "../Adminpanel";
import { Table, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const LabTestList = () => {
  const [patientList, setPatientList] = useState([]);
  const [hospitalId, setHospitalId] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the 'user' object from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setHospitalId(user.HospitalId);
    }

    const fetchPatients = async () => {
      if (hospitalId) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/LabTestList",
            {
              params: { hospitalId },
            }
          );
          setPatientList(response.data.labtestlist || []);
        } catch (err) {
          console.error("Error fetching patients:", err);
          setError("Failed to fetch patients.");
        }
      }
    };

    fetchPatients();
  }, [hospitalId]);

  const handleProceed = (Id) => {
    navigate(`/LabTestReport/${Id}`, {
      state: { Id },
    });
  };

  return (
    <Adminpanel>
      <div>
        <h1>Lab Test List</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {patientList.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Test Type</th>
                <th>Test Items</th>
                <th>Visit Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {patientList.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.patient.fullName}</td>
                  <td>{entry.latesttype}</td>
                  <td>{entry.LabtestItems}</td>
                  <td>{new Date(entry.visitDate).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() =>
                        handleProceed(entry.id, "kiran kc", entry.patient.id)
                      }
                    >
                      Proceed
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No patients assigned for today.</p>
        )}
      </div>
    </Adminpanel>
  );
};

export default LabTestList;
