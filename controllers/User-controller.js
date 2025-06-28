
import UserModel from "../models/UserModel.js"


export const getAllUsers = async(req,res,next)=>{

    try {

         const users = await UserModel.find();



    if(!users){
        return res.status(404).json({
            success:false,
            message:"No users found!"
        })

    }

    return res.status(200).json({
        success:true,
        message:"Users found",
        users
    })

        
    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Internal Server Erorr"
        })
        
    }

   
}