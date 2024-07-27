import React from "react";
import Button from "@mui/material/Button";
import "./AboutUs.css";
import "../Components/Dashboard";
import Dashboard from "../Components/Dashboard";

const AboutUs = () => {
  return (
    <Dashboard>
      <div className="about-us">
        <img
          src="https://example.com/beautiful-image.jpg"
          alt="Beautiful Nepal"
          className="about-us-image"
        />
        <div className="about-us-content">
          <h1>About Us</h1>
          <p>
            Welcome to the Centralized Patient Record System of Nepal, where we
            are dedicated to transforming healthcare through technology. Our
            mission is to provide a seamless, efficient, and secure platform for
            managing patient records, ensuring that healthcare providers have
            instant access to the information they need to deliver the best care
            possible.
          </p>
          <p>
            Our system is designed to integrate all healthcare facilities across
            Nepal, from large hospitals to small clinics, into one unified
            platform. This not only enhances the coordination of care but also
            helps in making informed decisions and improving patient outcomes.
          </p>
          <p>
            With the Centralized Patient Record System, we aim to empower
            patients and healthcare providers by providing real-time access to
            medical records, fostering a collaborative and transparent
            healthcare environment.
          </p>
          <Button
            variant="contained"
            color="primary"
            className="register-button"
            onClick={() => (window.location.href = "/register")}
          >
            Register Now
          </Button>
        </div>
      </div>
    </Dashboard>
  );
};

export default AboutUs;
