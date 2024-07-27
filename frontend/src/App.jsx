import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Router } from "react-router-dom";

import Home from "./pages/AboutUs";
import Dashboard from "./Components/Dashboard";
import PatientReg from "./Components/PatientReg";
import AboutUs from "./pages/AboutUs";
import PatientLogin from "./Components/PatientLogin";
import AdminLogin from "./Components/AdminLogin";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/PatientLogin" element={<PatientLogin />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/PatientReg" element={<PatientReg />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
