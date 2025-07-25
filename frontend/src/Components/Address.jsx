import React, { useEffect, useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import addressData from "../data/Address.json";

const Address = ({ formData, setFormData }) => {
  const [districts, setDistricts] = useState([]);
  const [municipalities, setMunicipalities] = useState([]);

  // ✅ Guard clause: return nothing if formData is undefined
  if (!formData) return null;

  useEffect(() => {
    const selectedProvince = addressData.provinceList.find(
      (prov) => prov.name === formData.province
    );
    setDistricts(selectedProvince?.districtList || []);
    setMunicipalities([]);
    setFormData({ ...formData, district: "", municipality: "" });
  }, [formData.province]);

  useEffect(() => {
    const selectedDistrict = districts.find(
      (dist) => dist.name === formData.district
    );
    setMunicipalities(selectedDistrict?.municipalityList || []);
    setFormData({ ...formData, municipality: "" });
  }, [formData.district]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth required>
          <InputLabel>Province</InputLabel>
          <Select
            name="province"
            value={formData.province || ""}
            onChange={handleChange}
          >
            {addressData.provinceList.map((prov) => (
              <MenuItem key={prov.id} value={prov.name}>
                {prov.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl fullWidth required>
          <InputLabel>District</InputLabel>
          <Select
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
          >
            {districts.map((dist) => (
              <MenuItem key={dist.id} value={dist.name}>
                {dist.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={4}>
        <FormControl fullWidth required>
          <InputLabel>Municipality</InputLabel>
          <Select
            name="municipality"
            value={formData.municipality || ""}
            onChange={handleChange}
          >
            {municipalities.map((mun) => (
              <MenuItem key={mun.id} value={mun.name}>
                {mun.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          label="Ward No"
          name="wardNo"
          value={formData.wardNo || ""}
          onChange={handleChange}
          type="number"
          required
          fullWidth
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          label="Street"
          name="street"
          value={formData.street || ""}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          label="Latitude"
          name="latitude"
          type="number"
          value={formData.latitude || ""}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          label="Longitude"
          name="longitude"
          type="number"
          value={formData.longitude || ""}
          onChange={handleChange}
          fullWidth
          required
        />
      </Grid>
    </div>
  );
};

export default Address;
