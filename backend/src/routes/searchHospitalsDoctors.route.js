import express from 'express';
import { getDoctorsByHospitalId } from '../controllers/SearchHospitalsDoctor.js';
const hospitaldoctorsrouter = express.Router();

hospitaldoctorsrouter.get('/HospitalDoctors', getDoctorsByHospitalId);

export default hospitaldoctorsrouter;

