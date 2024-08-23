import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

const SendOTPForm = ({ onOTPVerified }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = () => {
    axios
      .post("http://localhost:5000/api/otp/send-otp", { email })
      .then(() => {
        setOtpSent(true);
        setError("");
      })
      .catch((err) => {
        setError("Failed to send OTP. Please try again.", err);
      });
  };

  // const handleVerifyOTP = () => {
  //   axios
  //     .post("http://localhost:5000/api/otp/verify-otp", { email, otp })
  //     .then(() => {
  //       setVerified(true);
  //       onOTPVerified(email); // Proceed to registration step
  //       setError("");
  //     })
  //     .catch(() => {
  //       setError("Invalid OTP. Please try again.");
  //     });
  // };

  //handel Verify Opt
  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/otp/verify-otp",
        { email, otp }
      );
      if (response.status === 200) {
        setVerified(true);

        // onOTPVerified(email); // Proceed to registration step
        setError("");
        navigate("/PatientReg");
        console.log("Show message ot Tost if status is true or 200");
        console.log(response.data.message);
      } else {
        //make a lgoic
        console.log("Show message ot Tost if status is false ");
        console.log(response.data.message);
        setError(`${response.data.message}`);
      }
    } catch (error) {
      console.log(error);
      console.log("Otp varifiesd Failed");
      setError(`Otp varifiesd Failed`);
    }
  };
  return (
    <Dashboard>
      <Form>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={otpSent}
          />
          <Button variant="primary" onClick={handleSendOTP} disabled={otpSent}>
            Send OTP
          </Button>
        </Form.Group>

        {otpSent && (
          <>
            <Form.Group controlId="formOTP" className="mb-3">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="success"
              onClick={handleVerifyOTP}
              disabled={verified}
            >
              Verify OTP
            </Button>
          </>
        )}

        {error && (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        )}
      </Form>
    </Dashboard>
  );
};

export default SendOTPForm;
