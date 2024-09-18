import { Router } from "express";
import { getPatientDetails } from "../controllers/ViewPatientDetails.controller.js";
const getPatientDetailsRouter= Router()
getPatientDetailsRouter.get('/viewPatientDetails', getPatientDetails);

    export default getPatientDetailsRouter;