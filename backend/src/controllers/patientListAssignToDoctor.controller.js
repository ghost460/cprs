import { PrismaClient } from '@prisma/client';
import { ascynHandlar } from "../utils/asyncHandler.js";

const prisma = new PrismaClient();

const getTodaysPatientsByDoctor = ascynHandlar(async (req, res) => {
    // Extract doctorId from query parameters
    const { doctorId } = req.query; 

    if (!doctorId) {
        return res.status(400).json({ message: "Doctor ID is required." });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to start of the day

    console.log("The data for search Doctor:", doctorId);

    try {
        const medicalHistories = await prisma.medicalHistory.findMany({
            where: {
                doctorId: parseInt(doctorId),
                visitDate: {
                    gte: today, // Greater than or equal to the start of today
                    lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Less than the start of tomorrow
                }
            },
            include: {
                patient: true // Include patient details
            }
        });

        console.log("MedicalHistory is", medicalHistories);

        res.status(200).json({ medicalHistories });
    } catch (err) {
        console.error("Error fetching today's patients by doctor:", err);
        res.status(500).json({ message: "Error fetching today's patients by doctor." });
    }
});

export { getTodaysPatientsByDoctor };
