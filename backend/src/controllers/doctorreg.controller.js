import { ascynHandlar } from "../utils/asyncHandler.js";
import { uploadoncloud } from "../utils/fileuploder.js";
import { PrismaClient } from '@prisma/client';
import { Apierror } from "../utils/Apierror.js";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

 export  const DoctorReg = ascynHandlar(async (req, res) => {
    const { fullName, address, contactNo, email, licenseNo, username, password, specialization, experience } = req.body;

  try {
    // Validate required fields
    if ([fullName, address, contactNo, licenseNo, email, username, password].some((field) => field?.trim() === "")) {
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
    const doctorData = await prisma.doctor.create({
      data: {
        fullName,
        address, 
        contactNo, 
        email, 
        licenseNo,
        specialization, 
        experience: parseInt(experience, 10),
        profilePicture:profilePicture.url,
        user: {
          create: {
            username,
            password: hashedPassword,
            role: 'DOCTOR', // Specify the role explicitly
          },
        },
      },
    });

    res.status(201).json({ message: 'doctor registered successfully', doctorData });
  } catch (error) {
    console.error('Error during registration:', error);
    if (error instanceof Apierror) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Error registering Doctor' });
    }
  }
});



// Doctor Search  controller 
export const searchDoctor = async (req, res) => {
    try {
        const { id, licenseNo, email, contactNo } = req.query;

        let searchCriteria = {};

        if (id) {
            searchCriteria.id = parseInt(id);
        } else if (licenseNo) {
            searchCriteria.licenseNo = licenseNo;
        } else if (email) {
            searchCriteria.email = email;
        } else if (contactNo) {
            searchCriteria.contactNo = contactNo;
        } else {
            return res.status(400).json({ error: "User Not found, Please provide search criteria." });
        }

        const doctor = await prisma.doctor.findUnique({
            where: searchCriteria,
        });

        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ error: "Doctor not found." });
        }
    } catch (error) {
        console.error("Error searching doctor:", error);
        res.status(500).json({ error: "An error occurred while searching for the doctor." });
    }
};

//update controller 
export const updateDoctor = ascynHandlar(async (req, res) => {
    const { id } = req.params; // Get the doctor ID from the request params
    const { fullName, address, contactNo, email, licenseNo, username, password, specialization, experience } = req.body;
    const profilePictureLocalPath = req.files?.profilePicture?.[0]?.path; // Safely access profilePicture
  
    try {
      // Check if the doctor exists
      const existingDoctor = await prisma.doctor.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!existingDoctor) {
        return res.status(404).json({ error: "Doctor not found." });
      }
  
      // Upload profile picture if provided
      let profilePicture = existingDoctor.profilePicture; // retain the old profile picture by default
  
      if (profilePictureLocalPath) {
        profilePicture = await uploadoncloud(profilePictureLocalPath);
      }
  
      // Hash the password before saving it if provided
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  
      // Update the doctor record
      const updatedDoctor = await prisma.doctor.update({
        where: { id: parseInt(id) },
        data: {
          fullName,
          address,
          contactNo,
          email,
          licenseNo,
          specialization,
          experience: parseInt(experience, 10),
          profilePicture: profilePicture ? profilePicture.url : existingDoctor.profilePicture,
          user: {
            update: {
              username,
              // Only update password if a new one is provided
              ...(hashedPassword && { password: hashedPassword }),
            },
          },
        },
      });
  
      res.json({ message: 'Doctor updated successfully', updatedDoctor });
    } catch (error) {
      console.error("Error updating doctor data:", error);
      if (error instanceof Apierror) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An error occurred while updating the doctor.' });
      }
    }
  });
  export const countDoctors = async (req, res) => {
    try {
      const totalDoctors = await prisma.doctor.count();
      res.status(200).json({
        message: 'Total number of registered doctors',
        totalDoctors,
      });
    } catch (error) {
      console.error('Error fetching doctor count:', error);
      res.status(500).json({ error: 'An error occurred while fetching the doctor count.' });
    }
  };
  