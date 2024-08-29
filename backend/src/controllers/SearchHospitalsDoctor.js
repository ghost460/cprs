import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const getDoctorsByHospitalId = async (req, res) => {
    const { hospitalId } = req.query;
  
    if (!hospitalId) {
      return res.status(400).json({ error: 'Hospital ID is required' });
    }
  
    try {
      const doctorHospitals = await prisma.doctorHospital.findMany({
        where: { hospitalId: parseInt(hospitalId) },
        include: { doctor: true }
      });
  
      const doctors = doctorHospitals.map(dh => dh.doctor);
  
      res.json(doctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  export {getDoctorsByHospitalId};