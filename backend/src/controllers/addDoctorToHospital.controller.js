

import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
const addDoctorToHospital = async (req, res) => {
    try {
      const { doctorId, hospitalId } = req.body;
  
      await prisma.doctorHospital.create({
        data: {
          doctorId: parseInt(doctorId),
          hospitalId: parseInt(hospitalId),
        },
      });
  
      res.status(201).json({ message: 'Doctor added to hospital successfully' });
    } catch (error) {
      console.error('Error adding doctor to hospital:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  export {addDoctorToHospital}