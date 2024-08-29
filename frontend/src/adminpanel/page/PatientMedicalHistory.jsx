import React, { useState } from "react";
import UpdateMedicalHistory from "./UpdateMedicalHistory";
import ViewMedicalHistory from "./ViewMedicalHistory";
import { Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Adminpanel from "../Adminpanel";

const PatientMedicalHistory = () => {
  const [activeView, setActiveView] = useState("view"); // Default to 'view'
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const handleViewClick = () => {
    setActiveView("view");
  };

  const handleUpdateClick = () => {
    setActiveView("update");
  };

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
            {activeView === "update" && selectedPatientId && (
              <UpdateMedicalHistory
                medicalHistoryId={selectedPatientId}
                onClose={() => setActiveView("view")}
              />
            )}
            {activeView === "view" && selectedPatientId && (
              <ViewMedicalHistory patientId={selectedPatientId} />
            )}
          </Col>
        </Row>
      </Container>
    </Adminpanel>
  );
};

export default PatientMedicalHistory;
