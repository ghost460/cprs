import { PrismaClient } from '@prisma/client';
import { ascynHandlar } from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

const getLabTestList = ascynHandlar(async (req, res) => {
    // Extract doctorId from query parameters
    const { hospitalId } = req.query; 
    if (!hospitalId) {
        return res.status(400).json({ message: "Hospital ID is required." });
    }

  
    try {
        const labtestlist = await prisma.medicalHistory.findMany({
            where: {
                hospitalId: parseInt(hospitalId),
                refersToTest:true,
                            },
            include: {
                patient: true // Include patient details
            }
        });

        console.log(" Refers to Labtest list is:", labtestlist);

        res.status(200).json({ labtestlist });
    } catch (err) {
        console.error("Error fetching today's patients by doctor:", err);
        res.status(500).json({ message: "Error fetching today's patients by doctor." });
    }
});

export { getLabTestList };
