import { Router } from "express";
import {patientReg} from "../controllers/patientreg.controller.js"
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
    export default patientregrouter;