import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Adminpanel from "../adminpanel/Adminpanel";
import DoctorConferenceScheduler from "./DoctorConferenceSchedular";
import PatientConferenceViewer from "./PatientConferenceViewer";
import { socket } from "./socket";

const TelemedicineRoom = () => {
  const [appointments, setAppointments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const registered = useRef(false);

  // ✅ Fetch confirmed appointments
  useEffect(() => {
    let isMounted = true;

    const loadAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/getAppointmentRequest",
          {
            params: {
              userType: user.role,
              userId: user.role === "DOCTOR" ? user.doctorId : user.id,
              status: "CONFIRMED",
            },
          }
        );

        if (isMounted) {
          setAppointments(res.data);
        }
      } catch (error) {
        console.error("Error loading appointments:", error);
      }
    };

    loadAppointments();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // ✅ Register patient socket and receive notifications
  useEffect(() => {
    if (user.role !== "PATIENT") return;

    const handleConnect = () => {
      if (!registered.current) {
        socket.emit("registerUser", user.id);
        console.log(`🔗 User ${user.id} registered with socket ${socket.id}`);
        registered.current = true;
      }
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on("connect", handleConnect);
    }

    socket.on(`conferenceNotification-${user.id}`, (data) => {
      alert(
        `📞 New conference scheduled.\nJoin at: ${new Date(
          data.scheduledTime
        ).toLocaleString()}`
      );
    });

    return () => {
      socket.off(`conferenceNotification-${user.id}`);
      socket.off("connect", handleConnect);
    };
  }, [user]);

  // ✅ Deduplicate by patientId for DOCTOR view
  const getUniqueAppointmentsByPatient = () => {
    const uniqueMap = new Map();
    for (const appt of appointments) {
      if (!uniqueMap.has(appt.patientId)) {
        uniqueMap.set(appt.patientId, appt);
      }
    }
    return Array.from(uniqueMap.values());
  };

  return (
    <Adminpanel>
      <h2 className="text-xl font-bold mb-4">Video Conference Scheduler</h2>

      {getUniqueAppointmentsByPatient().map((appt) => {
        if (user.role === "DOCTOR") {
          return (
            <DoctorConferenceScheduler
              key={appt.patientId}
              appointment={appt}
              socket={socket}
            />
          );
        }

        if (user.role === "PATIENT" && appt.patientId === user.id) {
          return <PatientConferenceViewer key={appt.id} appointment={appt} />;
        }

        return null;
      })}
    </Adminpanel>
  );
};

export default TelemedicineRoom;
