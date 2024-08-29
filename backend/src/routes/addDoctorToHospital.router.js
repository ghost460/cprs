import { Router } from "express";
import {addDoctorToHospital} from "../controllers/addDoctorToHospital.controller.js";
const addDoctorToHos= Router()
addDoctorToHos.post('/addDoctorToHospital',   addDoctorToHospital);
    export default addDoctorToHos;