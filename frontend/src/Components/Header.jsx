import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="Header">
      <div className="title">
        <h3 className="text-center  ">Centralized Patient Record System</h3>
      </div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/AboutUs">
              About Us
            </Nav.Link>
            <Nav.Link href="#pricing">Contact Us</Nav.Link>
           
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
