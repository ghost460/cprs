import { Router } from "express";
import { checkChatPermission } from "../controllers/appointmentPermission.js";

const permissionRoutes = Router();

// Route: GET /api/appointment/check-permission?senderId=6&receiverId=5
permissionRoutes.get("/check-permission", checkChatPermission);

export default permissionRoutes;
