import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatBox from "./ChatBox";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Adminpanel from "../adminpanel/Adminpanel";

const ChatPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userType = user.role === "DOCTOR" ? "DOCTOR" : "PATIENT";
        const userId = user.role === "DOCTOR" ? user.doctorId : user.id;

        const res = await axios.get(
          `http://localhost:5000/api/getAppointmentRequest`,
          {
            params: { userType, userId, status: "CONFIRMED" },
          }
        );

        const allAppointments = res.data;
        const seen = new Set();
        const unique = [];

        for (const appt of allAppointments) {
          const targetId =
            user.role === "DOCTOR" ? appt.patientId : appt.doctorId;
          if (!seen.has(targetId)) {
            seen.add(targetId);
            unique.push(appt);
          }
        }

        setAppointments(allAppointments);
        setUniqueUsers(unique);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };

    fetchAppointments();
  }, []);

  const handleUserClick = (targetUserId) => {
    const match = appointments.find((appt) =>
      user.role === "DOCTOR"
        ? appt.patientId === targetUserId
        : appt.doctorId === targetUserId
    );

    if (match) {
      setSelectedUser({
        appointmentId: match.id,
        senderId: user.id,
        receiverId: user.role === "DOCTOR" ? match.patientId : match.doctorId,
      });
    }
  };

  return (
    <Adminpanel>
      <Container
        fluid
        className="p-3"
        style={{ height: "100vh", maxHeight: "100vh" }}
      >
        <Row style={{ height: "100%" }}>
          <Col
            xs={3} // narrower left col (25%)
            style={{ height: "100%", overflowY: "auto" }}
          >
            {/* Left Panel */}
            <div className="bg-white rounded-lg shadow p-4 h-100">
              <h4 className="text-xl font-bold mb-4">Confirmed Users</h4>
              {uniqueUsers.map((appt) => {
                const displayUser =
                  user.role === "DOCTOR" ? appt.patient : appt.doctor;
                return (
                  <div
                    key={displayUser.id}
                    className="p-2 mb-2 bg-gray-100 hover:bg-blue-100 cursor-pointer rounded"
                    onClick={() => handleUserClick(displayUser.id)}
                  >
                    <p className="font-medium text-gray-800">
                      {displayUser.fullName}
                    </p>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col
            xs={9} // wider right col (75%)
            style={{ height: "100%", overflowY: "auto" }}
          >
            {/* Right Panel */}
            <div className="bg-white rounded-lg shadow p-4 h-100">
              {selectedUser ? (
                <ChatBox
                  appointmentId={selectedUser.appointmentId}
                  senderId={selectedUser.senderId}
                  receiverId={selectedUser.receiverId}
                />
              ) : (
                <div className="text-center text-gray-400 mt-20">
                  Select a user to start chatting.
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Adminpanel>
  );
};

export default ChatPage;
