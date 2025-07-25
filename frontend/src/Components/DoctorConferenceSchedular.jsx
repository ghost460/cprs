import React, { useState, useEffect } from "react";
import axios from "axios";

const DoctorConferenceScheduler = ({ appointment }) => {
  const [scheduledTime, setScheduledTime] = useState("");
  const [conference, setConference] = useState(null);

  useEffect(() => {
    const fetchConference = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/conference/by-user",
        {
          params: { userId: appointment.doctorId },
        }
      );

      const match = res.data.find(
        (c) =>
          c.patientId === appointment.patientId &&
          c.doctorId === appointment.doctorId
      );

      if (match) setConference(match);
    };

    fetchConference();
  }, [appointment]);

  const handleSchedule = async () => {
    try {
      const payload = {
        doctorId: appointment.doctorId,
        patientId: appointment.patientId,
        scheduledTime,
      };

      const res = await axios.post(
        "http://localhost:5000/api/conference/create",
        payload
      );
      setConference(res.data);
      alert("Conference scheduled successfully");
    } catch (err) {
      console.error("Scheduling failed", err);
    }
  };

  const handleStart = async () => {
    await axios.patch(
      `http://localhost:5000/api/conference/start/${conference._id}`
    );
    window.open(conference.roomLink, "_blank");
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <p>
        With Patient: <strong>{appointment.patient.fullName}</strong>
      </p>

      {!conference ? (
        <>
          <label className="block mb-1 font-semibold">Scheduled Time:</label>
          <input
            type="datetime-local"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />

          <button
            onClick={handleSchedule}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Schedule Conference
          </button>
        </>
      ) : (
        <>
          <p>
            Scheduled at:{" "}
            <strong>
              {new Date(conference.scheduledTime).toLocaleString()}
            </strong>
          </p>
          <button
            onClick={handleStart}
            className="btn"
            style={{
              backgroundColor: "#b2fab4",
              color: "#000",
              fontWeight: "bold",
            }}
          >
            Join Conference
          </button>
        </>
      )}
    </div>
  );
};

export default DoctorConferenceScheduler;
