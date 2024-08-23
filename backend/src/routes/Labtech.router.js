import { Router } from "express";
import {LabTechReg} from "../controllers/labtechreg.controller.js"
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
    export default Labrouter;