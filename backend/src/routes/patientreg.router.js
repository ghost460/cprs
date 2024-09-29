import { Router } from "express";
import {countPatients, patientReg} from "../controllers/patientreg.controller.js"
import { upload } from "../middlewares/multer.js";
const patientregrouter= Router()
patientregrouter.post('/patientReg',
    upload.fields([
        {
            name: "profilePicture",
            maxCount: 1
        }
    ]),
    patientReg);
    patientregrouter.get('/countPatient',countPatients);
    export default patientregrouter;