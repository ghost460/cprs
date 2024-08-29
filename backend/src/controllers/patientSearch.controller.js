import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Search patient by ID, contact number, email, or full name
const searchPatient = async (req, res) => {
  const { id, contactNo, email, fullName } = req.query;
  
  try {
    let searchCriteria = {};

    // Build the search criteria based on the provided query parameters
    if (id) {
      searchCriteria.id = parseInt(id);
    }
    if (contactNo) {
      searchCriteria.contactNo = contactNo;
    }
    if (email) {
      searchCriteria.email = email;
    }
    if (fullName) {
      searchCriteria.fullName = { contains: fullName, mode: 'insensitive' };
    }

    if (Object.keys(searchCriteria).length === 0) {
      return res.status(400).json({ error: "Please provide at least one search criteria." });
    }

    // Use findMany to return multiple results if fullName is used
    const patients = await prisma.patient.findMany({
      where: searchCriteria,
    });

    if (patients.length === 0) {
      return res.status(404).json({ error: "No patient found with the provided criteria." });
    }

    return res.status(200).json(patients);
  } catch (error) {
    console.error("Error searching for patient:", error);
    return res.status(500).json({ error: "An error occurred while searching for the patient." });
  }
};

export { searchPatient };
