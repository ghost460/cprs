import { ascynHandlar } from "../utils/asyncHandler.js";
import { PrismaClient } from '@prisma/client';
import { Apierror } from "../utils/Apierror.js";


const prisma = new PrismaClient();

 export  const patientmedicalHistory = ascynHandlar(async (req, res) => {
    const { patientId, hospitalId, doctorId, visitDate } = req.body;
    if (!patientId || !hospitalId || !doctorId || !visitDate) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const parsedDoctorId = parseInt(doctorId);

  try {
    
        // Create a new medical history record
        const medicalHistory = await prisma.medicalHistory.create({
          data: {
            patientId,
            hospitalId,
            doctorId:parsedDoctorId,
            visitDate: new Date(visitDate),
        
            bloodPressure: null,
            weight: null,
            currentProblem: '', 
            refersToTest: false, 
            labtesttype: '', 
            LabtestItems: '', 
            doctorPrescription: '', 
          },
        });
    
        // Respond with success message
        res.status(201).json({ message: 'Medical history created successfully', data: medicalHistory });
      } catch (err) {
        console.error('Error creating medical history:', err);
        res.status(500).json({ error: 'Error creating medical history' });
      }
    });
