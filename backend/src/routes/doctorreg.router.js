import express from "express";
import {
  updateDoctor,
  DoctorReg,
  searchDoctor,
  countDoctors,
  getAllDoctors,
} from "../controllers/doctorreg.controller.js";
import { upload } from "../middlewares/multer.js";

const doctorrouter = express.Router();

// Create new doctor
doctorrouter.post(
  "/DoctorReg",
  upload.fields([{ name: "profilePicture", maxCount: 1 }]),
  DoctorReg
);

// Search doctor by ID
doctorrouter.get("/Searchdoctor", searchDoctor);

// ✅ Update doctor by ID
doctorrouter.put(
  "/:id",
  upload.fields([{ name: "profilePicture", maxCount: 1 }]),
  updateDoctor
);

// Count doctors
doctorrouter.get("/CountDoctor", countDoctors);

// Get all doctors
doctorrouter.get("/AllDoctors", getAllDoctors);

export default doctorrouter;
