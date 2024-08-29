
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const registerHospital = async (req, res) => {
  const {
    hospitalName,
    address,
    numberOfBeds,
    email,
    specialization,
    organizationalType,
    levelOfCare,
    servicesOffered,
    availableEquipments,
    contactNumbers,
    username,
    password,
  } = req.body;

  

  try {
      //check existing user 
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });
  
    if (existingUser) {
      throw new Apierror(409, "User already exists");
    }
    // Create servicesOffered entry
    const servicesOfferedEntry = await prisma.servicesOffered.create({
      data: servicesOffered,
    });

    // Create availableEquipments entry
    const availableEquipmentsEntry = await prisma.availableEquipments.create({
      data: availableEquipments,
    });

    // Create contactNumbers entry
    const contactNumbersEntry = await prisma.contactNumbers.create({
      data: contactNumbers,
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create hospital entry
    const hospital = await prisma.hospital.create({
      data: {
        hospitalName,
        address,
        numberOfBeds: parseInt(numberOfBeds, 10),
        email,
        specialization,
        organizationalType,
        levelOfCare,
        servicesOfferedId: servicesOfferedEntry.id,
        availableEquipmentsId: availableEquipmentsEntry.id,
        contactNumbersId: contactNumbersEntry.id,
        user: {
          create: {
            username,
            password:hashedPassword,
            role: 'ADMIN', // assuming the role for hospital registration is ADMIN
          },
        },
      },
    });

    res.status(201).json({ message: 'Hospital registered successfully', hospital });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Error registering hospital' });
  }
};
