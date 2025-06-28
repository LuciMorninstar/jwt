    import mongoose from "mongoose"
    import UserModel from "../models/UserModel.js";
    import jwt from "jsonwebtoken";

    export const UserSignUp = async(req,res,next)=>{

        const session = await mongoose.startSession();
        session.startTransaction();
        


        try {

            const {name, email, password} = req.body;
            // console.log(name);
            // console.log(email);
            // console.log(password);

            const existingEmail = await UserModel.findOne({email:email});

            if(existingEmail){
                return res.json({
                    success:false,
                    message:"Email already exists!"
                } )

            }

            const User = await UserModel.create([{
                name:name,
                email:email,
                password:password
            }],{session})

            console.log(User[0]);

            const token = jwt.sign({userId:User[0]._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN });

    








            await session.commitTransaction();
            session.endSession();

            res.status(200).json({
                success:true,
                message:"User signup sucessfully",
                data:{
                    token,
                    user:User[0]
                }
            })

        

            

        } catch (error) {
            console.error(error);
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ success:false,message:"Internal server error && transation aborted"})
        


            
        }








    }



    export const UserSignIn = async(req,res,next)=>{

        const{email, password} = req.body;

        try {

            const existingUser = await UserModel.findOne({email:email});

        if(!existingUser){
            return res.status(404).json({
                success:false,
                message:"No such email exists!"
            })
        }

        const doesPasswordMatch = await existingUser.comparePassword(password);

        if(!doesPasswordMatch){
            return res.status(400).json({
                success:false,
                message:"Email or password invalid"
            })
        }

        const token = jwt.sign({UserId:existingUser._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN});

        res.status(200).json({
            success:true,
            message:"Sign in successful",
            token,
        })

        

            
        } catch (error) {

            return res.status(500).json({
                success:false,
                message:"Interal server error"
            })
            
        }

        



    






    }