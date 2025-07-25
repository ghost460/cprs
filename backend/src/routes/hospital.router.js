import express from 'express';
import { countHospitals, Hospitallist, registerHospital } from '../controllers/hospitalreg.controller.js';

const router = express.Router();

router.post('/register', registerHospital);
router.get('/countHospital', countHospitals);
router.get('/HospitalList', Hospitallist)

export default router;

