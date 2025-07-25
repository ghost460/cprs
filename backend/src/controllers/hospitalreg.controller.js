
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const registerHospital = async (req, res) => {
  const {
    hospitalName,
    province,
    district,
    municipality,
    wardNo,
    street,
    latitude,
    longitude,
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
    
const wardNoInt = parseInt(wardNo, 10);
const Lat = parseFloat(latitude);
const Lon = parseFloat(longitude);


    // Create hospital entry
    const hospital = await prisma.hospital.create({
      data: {
        hospitalName,
        province,
    district,
    municipality,
    wardNo:wardNoInt,
    street,
    latitude:Lat,
    longitude:Lon,
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
export const countHospitals = async (req, res) => {
  try {
    const totalHospitals = await prisma.hospital.count();
    res.status(200).json({
      message: 'Total number of registered Hospitals',
      totalHospitals,
    });
  } catch (error) {
    console.error('Error fetching doctor count:', error);
    res.status(500).json({ error: 'An error occurred while fetching the doctor count.' });
  }
};

//hospital list featch 
export const Hospitallist = async(req, res)=>{
  try {
    const hospitals = await prisma.hospital.findMany({
      select: {
        id: true,
        hospitalName: true,
        province: true,
        district: true,
        municipality: true,
        wardNo: true,
        street: true,
        latitude: true,
        longitude: true,
        numberOfBeds: true,
        email: true,
        specialization: true,
        organizationalType: true,
        levelOfCare: true,
        servicesOffered: true,
        availableEquipments: true,
        contactNumbers: true,
        // EXCLUDE user.username and user.password
        // You can include user but without sensitive info if needed
      }
    });

    res.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
