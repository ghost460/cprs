import { Router } from "express";
import {DoctorReg} from "../controllers/doctorreg.controller.js";
import { upload } from "../middlewares/multer.js";
const doctorrouter= Router()
doctorrouter.post('/DoctorReg',
    upload.fields([
        {
            name: "profilePicture",
            maxCount: 1
        }
    ]),
    DoctorReg);
    export default doctorrouter;