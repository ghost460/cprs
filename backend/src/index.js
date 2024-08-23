
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import {PrismaClient} from '@prisma/client';
import bodyParser from "body-parser";
dotenv.config();
import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit:"32kb"}))
app.use(express.urlencoded({extended:true, limit:"32kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.json());


const prisma = new PrismaClient();

app.use(express.json());
//importing hospital register router
import router from "./routes/hospital.router.js";
app.use('/api/hospitals', router);
//importing lab technicial register
import Labrouter from "./routes/Labtech.router.js";
app.use('/api/LabTechReg', Labrouter)

// Use OTP routes
import otprouter from "./routes/otp.router.js";
app.use("/api/otp", otprouter);

//Importing and use patient Registration.
import patientregrouter from "./routes/patientreg.router.js";
app.use("/api/patientreg", patientregrouter)


//importing Doctor Registration and implementation
import doctorrouter from "./routes/doctorreg.router.js";
app.use("/api/DoctorReg", doctorrouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

 


export{app}
