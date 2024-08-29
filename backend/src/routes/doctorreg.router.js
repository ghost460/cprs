import { Router } from "express";
import {DoctorReg, searchDoctor, updateDoctor} from "../controllers/doctorreg.controller.js";
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
    doctorrouter.get('/Searchdoctor', searchDoctor);
    //update doctor record router 
    doctorrouter.put('/DoctorReg/:id',
        upload.fields([
            {
                name: "profilePicture",
                maxCount: 1
            }
        ]),
        updateDoctor);
    export default doctorrouter;