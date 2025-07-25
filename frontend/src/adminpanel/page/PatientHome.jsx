import React, { useEffect, useState } from "react";
import axios from "axios";

function PatientHome() {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.id) {
      axios
        .get("http://localhost:5000/api/viewPatientDetails", {
          params: { patientId: user.id },
        })
        .then((res) => setPatient(res.data.patient))
        .catch((err) => console.error("Error fetching patient details:", err));
    }
  }, []);

  if (!patient) return <div>Loading patient info...</div>;
  console.log("patient:", patient);

  return (
    <>
      <h3>Patient Information</h3>
      <p>
        <strong>ID:</strong> {patient.id}
      </p>
      <p>
        <strong>Name:</strong> {patient.fullName}
      </p>
      <p>
        <strong>DOB:</strong> {patient.dateOfBirth}
      </p>
      <p>
        <strong>Gender:</strong> {patient.gender}
      </p>
      <p>
        <strong>Contact No:</strong> {patient.contactNo}
      </p>
      <p>
        <strong>Address:</strong> {patient.add_province} {"province"},{" "}
        {patient.add_district} {patient.add_munciplity}-{patient.add_wardno},{" "}
        {patient.add_area}
      </p>
      <p>
        <strong>Blood Group: </strong>
        {patient.bloodType}
      </p>
      <p>
        <strong>Father Name: </strong>
        {patient.fathername}
      </p>
      <p>
        <strong>Email: </strong> {patient.email}
      </p>
    </>
  );
}

export default PatientHome;
