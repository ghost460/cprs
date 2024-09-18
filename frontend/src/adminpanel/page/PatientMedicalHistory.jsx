import React, { useEffect, useState } from "react";
import UpdateMedicalHistory from "./UpdateMedicalHistory";
import ViewMedicalHistory from "./ViewMedicalHistory";
import { Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Adminpanel from "../Adminpanel";
import { useLocation } from "react-router-dom";

const PatientMedicalHistory = () => {
  const [activeView, setActiveView] = useState("update"); // Default to 'view'
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const location = useLocation();
  const { fullName, patientId, Id: medicalHistoryId } = location.state;

  const handleViewClick = () => {
    setActiveView("view");
  };

  const handleUpdateClick = () => {
    setActiveView("update");
  };

  useEffect(() => {
    setSelectedPatientId(patientId);
  }, [patientId]);

  return (
    <Adminpanel>
      <Container>
        <Row className="mb-3">
          <Col>
            <Button
              variant="primary"
              onClick={handleUpdateClick}
              disabled={!selectedPatientId}
            >
              Update Medical History
            </Button>
            <Button
              variant="secondary"
              onClick={handleViewClick}
              className="ml-2"
              disabled={!selectedPatientId}
            >
              View Medical History
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            {activeView === "update" && medicalHistoryId && (
              <UpdateMedicalHistory
                medicalHistoryId={medicalHistoryId}
                onClose={() => setActiveView("view")}
              />
            )}
            {activeView === "view" && patientId && (
              <ViewMedicalHistory patientId={patientId} />
            )}
          </Col>
        </Row>
      </Container>
    </Adminpanel>
  );
};

export default PatientMedicalHistory;
