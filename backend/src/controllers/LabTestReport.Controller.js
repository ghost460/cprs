import { ascynHandlar } from "../utils/asyncHandler.js";
import { uploadoncloud } from "../utils/fileuploder.js"; // Corrected the function name and file name
import { PrismaClient } from "@prisma/client";
import { Apierror } from "../utils/Apierror.js";

const prisma = new PrismaClient();

const LabTestReport = ascynHandlar(async (req, res) => {
  const { labTestReport, labTechnicianId, medicalHistoryId } = req.body;

  try {
    // Ensure required fields are present
    if (!labTestReport || !labTechnicianId || !medicalHistoryId) {
      throw new Apierror("Missing required fields", 400);
    }

    // Upload lab test report document to the cloud
    const labTestReportDocPath = req.files?.labTestReportDoc[0]?.path;
	let labTestReportDoc=null;    
    if (labTestReportDocPath) {
      labTestReportDoc = await uploadoncloud(labTestReportDocPath);
      
    }

    // Create the lab test report entry in the database
    const newLabTest = await prisma.LabTest.create({
      data: {
        labTestReport,
        labTechnicianId: parseInt(labTechnicianId),
        medicalHistoryId: parseInt(medicalHistoryId),
        labTestReportDoc:labTestReportDoc.url,
      },
    });

    await prisma.MedicalHistory.update({
      where: { id: parseInt(medicalHistoryId) },
      data: { refersToTest: false },
    });

    res.status(201).json({ message: "Lab test report submitted successfully", newLabTest });
  } catch (error) {
    console.error("Error during lab test report submission:", error);
    if (error instanceof Apierror) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Error submitting lab test report" });
    }
  }
});

export { LabTestReport };
