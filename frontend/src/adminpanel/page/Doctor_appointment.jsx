import { React, useState } from "react";
import Adminpanel from "../Adminpanel";
import HospitalsForAppointment from "../../Components/HospitalsForAppointment.jsx";
import DoctorSelection from "../../Components/DoctorSelectionAppointment.jsx";

function Doctor_appointment() {
  const [hospitalId, setHospitalId] = useState(null);
  const patient = JSON.parse(localStorage.getItem("user")); // get patientId
  return (
    <div>
      {!hospitalId ? (
        <HospitalsForAppointment onSelect={setHospitalId} />
      ) : (
        <DoctorSelection hospitalId={hospitalId} patientId={patient.id} />
      )}
    </div>
  );
}

export default Doctor_appointment;
