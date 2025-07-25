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
  const { id } = req.params;
  const {
    fullName,
    address,
    contactNo,
    email,
    licenseNo,
    username,
    password,
    specialization,
    experience,
  } = req.body;

  const profilePictureLocalPath = req.files?.profilePicture?.[0]?.path;

  try {
    // Find doctor by ID with related user
    const existingDoctor = await prisma.doctor.findUnique({
      where: { id: parseInt(id) },
      include: { user: true },
    });

    if (!existingDoctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }

    // ✅ Check for username conflict only if changed
    if (username && username !== existingDoctor.user.username) {
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Username already taken." });
      }
    }

    // ✅ Upload profile picture to cloud if new one provided
    let profilePicture = existingDoctor.profilePicture;
    if (profilePictureLocalPath) {
      const uploaded = await uploadoncloud(profilePictureLocalPath);
      profilePicture = uploaded.url;
    }

    // ✅ Hash password only if a new one is provided
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    // ✅ Update doctor and linked user data
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
        profilePicture,
        user: {
          update: {
            username,
            ...(hashedPassword && { password: hashedPassword }),
          },
        },
      },
      include: { user: true },
    });

    res.status(200).json({ message: "Doctor updated successfully", doctor: updatedDoctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    if (error instanceof ApiError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An error occurred while updating the doctor." });
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

  // ✅ Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    const { role, hospitalId } = req.query;

    let doctors = [];

    if (role === "SUPERADMIN") {
      // Return all doctors
      doctors = await prisma.doctor.findMany();
    } else if (role === "ADMIN") {
      if (!hospitalId) {
        return res.status(400).json({ error: "Hospital ID required for ADMIN" });
      }

      // Fetch doctors only from that hospital
      const hospitalWithDoctors = await prisma.hospital.findUnique({
        where: {
          id: parseInt(hospitalId),
        },
        include: {
          doctors: {
            include: {
              doctor: true,
            },
          },
        },
      });

      if (!hospitalWithDoctors) {
        return res.status(404).json({ error: "Hospital not found" });
      }

      // Extract doctors from junction table
      doctors = hospitalWithDoctors.doctors.map((dh) => dh.doctor);
    } else {
      return res.status(403).json({ error: "Unauthorized role" });
    }

    res.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
};
