import { Router } from "express";
import {LabTechReg, getLabTechnician} from "../controllers/labtechreg.controller.js"
import { upload } from "../middlewares/multer.js";
const Labrouter= Router()
Labrouter.post('/Labtechreg',
    upload.fields([
        {
            name: "profilePicture",
            maxCount: 1
        }
    ]),
    LabTechReg);
    Labrouter.get('/ByHospital', getLabTechnician);

    export default Labrouter;