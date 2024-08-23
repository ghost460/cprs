import { ascynHandlar } from "../utils/asyncHandler.js";
import { uploadoncloud } from "../utils/fileuploder.js";
import { PrismaClient } from '@prisma/client';
import { Apierror } from "../utils/Apierror.js";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const patientReg = ascynHandlar(async (req, res) => {
  const {
        fullName,
        dateOfBirth,
        gender,
        add_province,
        add_district,
        add_munciplity,
        add_wardno,
        add_area,
        doc_type,
        doc_number,
        fathername,
        contactNo,
        email,
        emergencyContactName,
        bloodType,
        allergies,
        password,
  } = req.body;

  try {
    // Validate required fields
    if ([fullName,
        dateOfBirth,
        gender,
        add_province,
        add_district,
        add_munciplity,
        add_wardno,
        doc_type,
        contactNo,
        email,
        fathername,
        password].some((field) => field?.trim() === "")) {
      throw new Apierror(400, "* fields are required");
    }

    // Check if the user already exists
    const existingUser = await prisma.patient.findUnique({
      where: { email:email, },
    });

    if (existingUser) {
      throw new Apierror(409, "User already exists");
    }

    // Parse allergies string into an array of objects if they are comma-separated
    const allergyList = allergies
    ? allergies.split(',').map((allergy) => ({ name: allergy.trim() }))
    : [];
    // Upload profile picture to the cloud
    const profilePictureLocalPath = req.files?.profilePicture[0]?.path;
    let profilePicture = null;

    if (profilePictureLocalPath) {
      profilePicture = await uploadoncloud(profilePictureLocalPath);
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user and associated patient entry
    const labTechnician = await prisma.patient.create({
      data: {
        fullName,
          dateOfBirth: new Date(dateOfBirth),
          gender,
          add_province,
          add_district,
          add_munciplity,
          add_wardno: parseInt(add_wardno),
          add_area,
          doc_type,
          doc_number,
          contactNo,
          email,
          fathername,
          emergencyContactName,
          bloodType,
          allergies: {
            create: allergyList,
          },
          password:hashedPassword, // Ensure password is securely hashed before storing
          profilePicture: profilePicture.url,
          dateOfRegistration: new Date(),
       
      },
    });

    res.status(201).json({ message: 'patient registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error instanceof Apierror) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error registering Patient' });
    }
  }
});

export  {patientReg}
