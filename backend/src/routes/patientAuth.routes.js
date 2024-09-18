import { Router } from "express";
import { loginPatient, logoutPatient } from "../controllers/patient.controller.js";
const patientAuthRouter= Router()
patientAuthRouter.post('/loginPatient',    loginPatient);
patientAuthRouter.post('/logoutpatient', logoutPatient)
    export default patientAuthRouter;