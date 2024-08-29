import { Router } from "express";
import {patientmedicalHistory} from "../controllers/medicalHistory.controller.js"

const patientHsitoryrouter= Router()
    patientHsitoryrouter.post('/medicalHistory', patientmedicalHistory);
    //update doctor record router 
    
    export default patientHsitoryrouter;