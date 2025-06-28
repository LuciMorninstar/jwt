import express from "express"
import { getAllUsers } from "../controllers/User-controller.js";
import { authorized } from "../controllers/middlewares/authMiddleware.js";


const userRouter = express.Router();


userRouter.get("/", authorized, getAllUsers);


export default userRouter;