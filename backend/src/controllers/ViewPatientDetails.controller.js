import { PrismaClient } from '@prisma/client';
import { ascynHandlar } from '../utils/asyncHandler.js';

const prisma = new PrismaClient();

const getPatientDetails = ascynHandlar(async (req, res) => {
  const { patientId } = req.query;
  console.log("patientId",patientId);

  try {
    const patient = await prisma.Patient.findUnique({
      where: { id: parseInt(patientId) },
      include: {
        medicalHistories: {
          include: {
            labTest: true, // Fetch the related lab tests
             
          },
        },
      },
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json({ patient });
  } catch (error) {
    console.error('Error fetching patient details:', error);
    res.status(500).json({ error: 'An error occurred while fetching patient details' });
  }
});

export { getPatientDetails };
