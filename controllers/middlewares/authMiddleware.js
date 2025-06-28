import UserModel from "../../models/UserModel.js";
import jwt from "jsonwebtoken"


 export const authorized = async(req,res,next)=>{

    let token;

    try {

        
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

        token = req.headers.authorization.split(" ")[1];

    }

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized access"
        })
    }

    const decodeToken = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await UserModel.findById(decodeToken._id).select("-password");

    if(!req.user){
        return res.status(404).json({
            success:false,
            message:"No such user found with that token"
        })
    }
    next();
        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
        
    }





}



export const checkRole = async(req,res,next)=>{

    if(req.user && req.user.role === "admin"){
     next();
    }

    return res.status(403).json({
        success:false,
        message:"You are not a admin"
    })



    



}