import express from "express";
import {UserSignUp, UserSignIn} from "../controllers/AuthUserController.js"

const AuthRouter = express.Router();

AuthRouter.post("/signUp",UserSignUp)
AuthRouter.post("/signIn",UserSignIn)
// AuthRouter.post("/signOut",)


export default AuthRouter;