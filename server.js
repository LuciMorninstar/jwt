import express from "express"
import connectDB from "./config/connectDB.js";
import AuthRouter from "./routes/AuthUserRoute.js";
import userRouter from "./routes/User-route.js";
import cors from "cors";

const app = express ();
import "dotenv/config"


const PORT = process.env.PORT;

app.use(express.json());

app.use(cors());

app.get("/",(req,res,next)=>{

    res.send({message:"THIsis the homepage"});
    
})

app.use("/api/v1/user",AuthRouter)
app.use("/api/v1/user",userRouter)

connectDB();


app.listen(PORT,()=>{

    console.log(`The server has been established at http://localhost:${PORT}`);

})

