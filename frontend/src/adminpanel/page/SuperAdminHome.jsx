import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import "../../css/SuperAdminHome.css";
import DiseaseCategoryChart from "./DiseaseCategoryChart"; // Import the chart component

function SuperAdminHome() {
  const [totals, setTotals] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalHospitals: 0,
  });

  const [diseaseData, setDiseaseData] = useState({}); // State for disease category data

  // Fetch totals and disease data
  useEffect(() => {
    const fetchTotals = async () => {
      const doctorsRes = await axios.get(
        "http://localhost:5000/api/DoctorReg/CountDoctor"
      );
      const patientsRes = await axios.get(
        "http://localhost:5000/api/patientreg/countPatient"
      );
      const hospitalsRes = await axios.get(
        "http://localhost:5000/api/hospitals/countHospital"
      );

      setTotals({
        totalDoctors: doctorsRes.data.totalDoctors,
        totalPatients: patientsRes.data.totalPatients,
        totalHospitals: hospitalsRes.data.totalHospitals,
      });
    };

    const fetchDiseaseData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/diseasecategory"
        );
        setDiseaseData(response.data);
      } catch (error) {
        console.error("Error fetching disease statistics:", error);
      }
    };

    fetchTotals();
    fetchDiseaseData(); // Fetch disease data along with totals
  }, []);

  return (
    <div className="fancy-dashboard">
      <div className=" text-center ">
        {" "}
        <h4>Welcome in Centralized Patient Record System </h4>
      </div>
      <Row>
        <Col>
          <Fade>
            <Card className="fancy-card text-center">
              <Card.Body>
                <Card.Title className="fancy-title">Total Doctors</Card.Title>
                <Card.Text className="fancy-text">
                  {totals.totalDoctors}
                </Card.Text>
              </Card.Body>
            </Card>
          </Fade>
        </Col>
        <Col>
          <Fade>
            <Card className="fancy-card text-center">
              <Card.Body>
                <Card.Title className="fancy-title">Total Patients</Card.Title>
                <Card.Text className="fancy-text">
                  {totals.totalPatients}
                </Card.Text>
              </Card.Body>
            </Card>
          </Fade>
        </Col>
        <Col>
          <Fade>
            <Card className="fancy-card text-center">
              <Card.Body>
                <Card.Title className="fancy-title">Total Hospitals</Card.Title>
                <Card.Text className="fancy-text">
                  {totals.totalHospitals}
                </Card.Text>
              </Card.Body>
            </Card>
          </Fade>
        </Col>
      </Row>

      {/* Render the Disease Category Bar Chart */}
      <Row className="mt-5">
        <Col>
          <DiseaseCategoryChart diseaseData={diseaseData} />
        </Col>
      </Row>
    </div>
  );
}

export default SuperAdminHome;
