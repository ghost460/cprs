import { Router } from "express";
import { getLabTestList } from "../controllers/LabTestList.controller.js";
import { LabTestReport } from "../controllers/LabTestReport.Controller.js";
import { upload } from "../middlewares/multer.js";
const labtestlistrouter= Router()
//getting the list of patient who refers to lab test 
labtestlistrouter.get('/LabTestList', getLabTestList);

labtestlistrouter.post('/LabReport',
    upload.fields([
        {
            name: "labTestReportDoc",
            maxCount: 1
        }
    ]),
    LabTestReport);
    export default labtestlistrouter;