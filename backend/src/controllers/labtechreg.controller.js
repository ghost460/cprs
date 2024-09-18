import { ascynHandlar } from "../utils/asyncHandler.js";
import { uploadoncloud } from "../utils/fileuploder.js";
import { PrismaClient } from '@prisma/client';
import { Apierror } from "../utils/Apierror.js";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const LabTechReg = ascynHandlar(async (req, res) => {
  const {
    fullName,
    address,
    contactNo,
    specialization,
    experience,
    username,
    password,
    hospitalId
  } = req.body;

  try {
    // Validate required fields
    if ([fullName, address, contactNo, username, password].some((field) => field?.trim() === "")) {
      throw new Apierror(400, "All fields are required");
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      throw new Apierror(409, "User already exists");
    }

    // Upload profile picture to the cloud
    const profilePictureLocalPath = req.files?.profilePicture[0]?.path;
    let profilePicture = null;

    if (profilePictureLocalPath) {
      profilePicture = await uploadoncloud(profilePictureLocalPath);
    }
    
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user and associated Lab Technician entry
    const labTechnician = await prisma.labTechnician.create({
      data: {
        fullName,
        address,
        contactNo,
        specialization,
        experience: parseInt(experience, 10),
        profilePicture:profilePicture.url,
        hospitalId:parseInt(hospitalId),
        user: {
          create: {
            username,
            password: hashedPassword,
            role: 'LAB_TECHNICIAN', // Specify the role explicitly
          },
        },
      },
    });

    res.status(201).json({ message: 'Lab Technician registered successfully', labTechnician });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error instanceof Apierror) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error registering Lab Technician' });
    }
  }
});

export  {LabTechReg}
