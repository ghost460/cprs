import React, { useState } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import Adminpanel from "../Adminpanel";
import AddressSelector from "../../Components/Address";

function Hospitalregister() {
  const [formData, setFormData] = useState({
    hospitalName: "",
    province: "",
    district: "",
    municipality: "",
    wardNo: "",
    street: "",
    latitude: "",
    longitude: "",
    numberOfBeds: "",
    email: "",
    specialization: "",
    organizationalType: "",
    levelOfCare: "",
    servicesOffered: {
      emergency: false,
      surgical: false,
      diagnostic: false,
    },
    availableEquipments: {
      xray: false,
      mri: false,
      ctScanner: false,
      ecg: false,
      endoscopy: false,
      ventilator: false,
      cpap: false,
      bipap: false,
    },
    contactNumbers: {
      reception: "",
      infoOfficer: "",
      emergency: "",
    },
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, field] = name.split(".");

    if (section && field) {
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [field]: type === "checkbox" ? checked : value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/hospitals/register",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Adminpanel>
      <Container maxWidth="md">
        <Typography variant="h6" gutterBottom>
          Hospital Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Hospital Name"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <AddressSelector formData={formData} setFormData={setFormData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Number of Beds"
                name="numberOfBeds"
                value={formData.numberOfBeds}
                onChange={handleChange}
                fullWidth
                required
                type="number"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Organizational Type</InputLabel>
                <Select
                  name="organizationalType"
                  value={formData.organizationalType}
                  onChange={handleChange}
                >
                  <MenuItem value="government">Government</MenuItem>
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Level of Care</InputLabel>
                <Select
                  name="levelOfCare"
                  value={formData.levelOfCare}
                  onChange={handleChange}
                >
                  <MenuItem value="primary">Primary</MenuItem>
                  <MenuItem value="secondary">Secondary</MenuItem>
                  <MenuItem value="tertiary">Tertiary</MenuItem>
                  <MenuItem value="quaternary">Quaternary</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Services Offered</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="servicesOffered.emergency"
                      checked={formData.servicesOffered.emergency}
                      onChange={handleChange}
                    />
                  }
                  label="Emergency"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="servicesOffered.surgical"
                      checked={formData.servicesOffered.surgical}
                      onChange={handleChange}
                    />
                  }
                  label="Surgical"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="servicesOffered.diagnostic"
                      checked={formData.servicesOffered.diagnostic}
                      onChange={handleChange}
                    />
                  }
                  label="Diagnostic"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend">Available Equipments</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="availableEquipments.xray"
                      checked={formData.availableEquipments.xray}
                      onChange={handleChange}
                    />
                  }
                  label="X-ray"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="availableEquipments.mri"
                      checked={formData.availableEquipments.mri}
                      onChange={handleChange}
                    />
                  }
                  label="MRI"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="availableEquipments.ctScanner"
                      checked={formData.availableEquipments.ctScanner}
                      onChange={handleChange}
                    />
                  }
                  label="CT Scanner"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="availableEquipments.ecg"
                      checked={formData.availableEquipments.ecg}
                      onChange={handleChange}
                    />
                  }
                  label="ECG"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="availableEquipments.endoscopy"
                      checked={formData.availableEquipments.endoscopy}
                      onChange={handleChange}
                    />
                  }
                  label="Endoscopy"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="availableEquipments.ventilator"
                      checked={formData.availableEquipments.ventilator}
                      onChange={handleChange}
                    />
                  }
                  label="Ventilator"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="availableEquipments.cpap"
                      checked={formData.availableEquipments.cpap}
                      onChange={handleChange}
                    />
                  }
                  label="CPAP"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="availableEquipments.bipap"
                      checked={formData.availableEquipments.bipap}
                      onChange={handleChange}
                    />
                  }
                  label="BiPAP"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Reception Contact Number"
                name="contactNumbers.reception"
                value={formData.contactNumbers.reception}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Info Officer Contact Number"
                name="contactNumbers.infoOfficer"
                value={formData.contactNumbers.infoOfficer}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Emergency Contact Number"
                name="contactNumbers.emergency"
                value={formData.contactNumbers.emergency}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Adminpanel>
  );
}

export default Hospitalregister;
