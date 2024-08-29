import { Router } from "express";
import { searchPatient } from "../controllers/patientSearch.controller.js";
const searchPatientrouter= Router()

    searchPatientrouter.get('/SearchPatient', searchPatient);
    //update doctor record router 

    export default searchPatientrouter;