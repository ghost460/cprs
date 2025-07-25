import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Check if chat is allowed between two users
export const checkChatPermission = async (req, res) => {
  const { senderId, receiverId } = req.query;
console.log("sernder", senderId , "receiver", receiverId)
  if (!senderId || !receiverId) {
    return res.status(400).json({ isAllowed: false, message: "Missing senderId or receiverId" });
  }

  try {
    const parsedSenderId = parseInt(senderId);
    const parsedReceiverId = parseInt(receiverId);

    const confirmedAppointment = await prisma.appointment.findFirst({
      where: {
        status: "CONFIRMED", // or "APPROVED" based on your logic
        OR: [
          {
            doctorId: parsedSenderId,
            patientId: parsedReceiverId,
          },
          {
            doctorId: parsedReceiverId,
            patientId: parsedSenderId,
          },
        ],
      },
    });

    if (confirmedAppointment) {
      return res.json({ isAllowed: true });
    } else {
      return res.json({ isAllowed: false });
    }
  } catch (error) {
    console.error("Error checking chat permission:", error);
    res.status(500).json({ isAllowed: false, error: "Internal server error" });
  }
};
