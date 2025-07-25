// controllers/appointmentController.js

import { PrismaClient } from "@prisma/client";
import { ascynHandlar } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/Apierror.js";

const prisma = new PrismaClient();

export const createAppointment = ascynHandlar(async (req, res) => {
  const { doctorId, patientId, hospitalId, problem, appointmentAt } = req.body;

  // Input validation
  if (!doctorId || !patientId || !hospitalId || !problem || !appointmentAt) {
    throw new Apierror(400, "All fields are required: doctorId, patientId, hospitalId, problem, appointmentAt");
  }

  const parsedDoctorId = parseInt(doctorId);
  const parsedPatientId = parseInt(patientId);
  const parsedHospitalId = parseInt(hospitalId);

  try {
    const appointment = await prisma.appointment.create({
      data: {
        doctorId: parsedDoctorId,
        patientId: parsedPatientId,
        hospitalId: parsedHospitalId,
        problem,
        appointmentAt: new Date(appointmentAt),
      },
    });

    res.status(201).json({
      success: true,
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    console.error("Appointment creation error:", error);
    throw new Apierror(500, "Failed to create appointment");
  }
});

//get appointment request for the doctor account's 
// controllers/appointmentController.js

export const getAppointments = ascynHandlar(async (req, res) => {
  const { userType, userId, status } = req.query;

  if (!userType || !userId) {
    throw new Apierror(400, "userType and userId are required");
  }

  const where = {};

  if (userType === "DOCTOR") {
    where.doctorId = parseInt(userId);
  } else if (userType === "ADMIN") {
    where.hospitalId = parseInt(userId);
  } 
  else if(userType === "PATIENT"){
    where.patientId = parseInt(userId)
  }
  else {
    throw new Apierror(400, "Invalid userType (must be 'doctor' or 'hospital')");
  }

  if (status) {
    where.status = status;
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        patient: true,
        doctor: true,
        hospital: true,
      },
      orderBy: {
        appointmentAt: "asc",
      },
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw new Apierror(500, "Failed to fetch appointments");
  }
});

// PATCH: Update appointment status
export const updateAppointmentStatus = ascynHandlar(async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;

  if (!status) {
    throw new Apierror(400, "Status is required");
  }

  try {
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: parseInt(appointmentId),
      },
      data: {
        status,
      },
    });

    res.status(200).json({
      success: true,
      message: "Appointment status updated successfully",
      data: updatedAppointment,
    });
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw new Apierror(500, "Failed to update appointment status");
  }
});