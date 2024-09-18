import { ascynHandlar } from "../utils/asyncHandler.js";
import { PrismaClient } from '@prisma/client';
import { Apierror } from "../utils/Apierror.js";


const prisma = new PrismaClient();

 export  const patientmedicalHistory = ascynHandlar(async (req, res) => {
  
    let { patientId, hospitalId, doctorId, visitDate } = req.body;
    if (!patientId || !hospitalId || !doctorId || !visitDate) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const parsedDoctorId = parseInt(doctorId);

  try {
    
        // Create a new medical history record
        const medicalHistory = await prisma.medicalHistory.create({
          data: {
            patientId,
            hospitalId,
            doctorId:parsedDoctorId,
            visitDate: new Date(visitDate),
        
            bloodPressure: null,
            weight: null,
            currentProblem: '', 
            refersToTest: false, 
            labtesttype: '', 
            LabtestItems: '', 
            doctorPrescription: '', 
          },
        });
    
        // Respond with success message
        res.status(201).json({ message: 'Medical history created successfully', data: medicalHistory });
      } catch (err) {
        console.error('Error creating medical history:', err);
        res.status(500).json({ error: 'Error creating medical history' });
      }
    });

  export const getMedicalHistory = ascynHandlar(async (req, res)=>{
    const {id,patient: patientId}=req.query;

    const q={}
    if (id){q['id']=parseInt(id)}
    else if (patientId){q['patientId']=parseInt(patientId)}
    console.log(q);
    

    try {
      const medicalHistories = await prisma.medicalHistory.findMany({
          where: {
              ...q,
              // visitDate: {
              //     gte: today, // Greater than or equal to the start of today
              //     lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Less than the start of tomorrow
              // }
          },
          include: {
              patient: true, // Include patient details
              hospital:true,
              precripted_doctor:true, // reference missing xa schema ma, so doctor details aairako xaina
          }
      });
      res.status(201).json({ message: 'Medical history fetched successfully', data: medicalHistories });
    }catch(err){
      console.error('Error fetching medical history:', err);
        res.status(500).json({ error: 'Error creating medical history' });

    }
  })

  
  export const updateMedicalHistory = async (req, res) => {
    try {
      // Destructure the ID and other fields from the request body
      let {id}=req.params;
      id=parseInt(id);
      // console.log('umh',id);
      

      let {
        bloodPressure,
        weight,
        currentProblem,
        refersToTest,
        labtesttype ,
        LabtestItems ,
        doctorPrescription ,
      } = req.body;

  
      // Check if the ID is provided
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "MedicalHistory ID is required for update.",
        });
      }
      
      weight=parseFloat(weight)
  
      // Update the medical history record
      const updatedMedicalHistory = await prisma.medicalHistory.update({
        where: { id: parseInt(id, 10) },
        data: {
          bloodPressure,
          weight,
          currentProblem,
          refersToTest,
          labtesttype,
          LabtestItems,
          doctorPrescription,
        },
      });
  
      // Send a successful response with the updated medical history entry
      res.status(200).json({
        success: true,
        message: "Medical history updated successfully.",
        data: updatedMedicalHistory,
      });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error updating medical history:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update medical history.",
        error: error.message,
      });
    }
  };
  