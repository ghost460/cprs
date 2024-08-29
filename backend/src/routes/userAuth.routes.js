import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/userlogin.controller.js";
const userauthroutes= Router()
userauthroutes.post('/loginUser',    loginUser);
userauthroutes.post('/logoutUser', logoutUser)
    export default userauthroutes;