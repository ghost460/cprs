import express from 'express';
import { getTodaysPatientsByDoctor } from '../controllers/patientListAssignToDoctor.controller.js';

const patientListAssignToDoctorrouter = express.Router();

patientListAssignToDoctorrouter.get('/PatientAssigToDoctor', getTodaysPatientsByDoctor);

export  default patientListAssignToDoctorrouter;
