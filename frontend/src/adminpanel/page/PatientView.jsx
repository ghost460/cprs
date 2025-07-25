import axios from "axios";
import React, { useEffect, useState } from "react";
import Adminpanel from "../Adminpanel";

function PatientView() {
  const [patientData, setPatientData] = useState(null);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    // Extract patientId from local storage
    const PatientData = localStorage.getItem("user");
    const { id } = JSON.parse(PatientData);
    setPatientId(id);
  }, []);

  useEffect(() => {
    // Only fetch patient data if patientId is available
    if (patientId !== null) {
      async function fetchPatientData() {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/viewPatientDetails",
            {
              params: { patientId },
            }
          );

          setPatientData(response.data.patient);
        } catch (error) {
          console.error("Error fetching patient data:", error);
        }
      }

      fetchPatientData();
    }
  }, [patientId]);

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <Adminpanel>
      <div className="patient-details">
        <h2>Medical History</h2>
        {patientData.medicalHistories.map((history) => (
          <div key={history.id} className="medical-history">
            <h3>Visit Date: {history.visitDate}</h3>
            <p>
              <strong>Blood Pressure:</strong> {history.bloodPressure}
            </p>
            <p>
              <strong>Weight:</strong> {history.weight}
            </p>
            <p>
              <strong>Current Problem:</strong> {history.currentProblem}
            </p>
            <p>
              <strong>Doctor Prescription:</strong> {history.doctorPrescription}
            </p>

            {history.labTest && (
              <div className="lab-test">
                <h4>Lab Test Report</h4>
                <p>
                  <strong>Report:</strong> {history.labTest.labTestReport}
                </p>
                {history.labTest.labTestReportDoc && (
                  <p>
                    <strong>Report Document:</strong>{" "}
                    <a
                      href={history.labTest.labTestReportDoc}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Document
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </Adminpanel>
  );
}

export default PatientView;
