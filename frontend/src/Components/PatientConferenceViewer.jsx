import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientConferenceViewer = ({ appointment }) => {
  const [conf, setConf] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get("http://localhost:5000/api/conference/by-user", {
        params: { userId: user.id },
      })
      .then((res) => {
        const match = res.data.find(
          (c) =>
            c.patientId === appointment.patientId &&
            c.doctorId === appointment.doctorId
        );
        if (match) setConf(match);
      })
      .catch((err) => console.error("Failed to fetch conference", err));
  }, [appointment]);

  if (!conf)
    return (
      <div className="p-4 mb-4 bg-light rounded border">
        No scheduled conference yet.
      </div>
    );

  return (
    <div className="bg-white p-4 rounded shadow mb-4 border">
      <p>
        Scheduled on:{" "}
        <strong>{new Date(conf.scheduledTime).toLocaleString()}</strong>
      </p>
      <a
        href={conf.roomLink}
        target="_blank"
        rel="noopener noreferrer"
        className="btn"
        style={{
          backgroundColor: "#b2fab4",
          color: "#000",
          fontWeight: "bold",
        }}
      >
        Join Conference
      </a>
    </div>
  );
};

export default PatientConferenceViewer;
