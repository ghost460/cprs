import { Router } from "express";
import {patientmedicalHistory, getMedicalHistory, updateMedicalHistory, diseasechart} from "../controllers/medicalHistory.controller.js"

const patientHsitoryrouter= Router()
    patientHsitoryrouter.post('/medicalHistory', patientmedicalHistory);
    //update doctor record router 
    patientHsitoryrouter.get("/getMedicalHistory", getMedicalHistory);
    patientHsitoryrouter.put("/updateMedicalHistory/:id", updateMedicalHistory);
    patientHsitoryrouter.get('/diseasecategory',diseasechart);
    export default patientHsitoryrouter;