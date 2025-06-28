import aj from "../../config/arcjet.js"

const arcjetMiddleware = async(req,res,next)=>{



    try {

    const decision = await aj.protect(req, {requested:5})

        
    if(decision.isDenied){
        if(decision.reason.isRateLimit()){
            return res.status(400).json({
                success:false,
                message:"Rate Limit exceeded"
            })
        }
            if(decision.reason.isBot()){
                return res.status(400).json({
                    success:false,
                    message:"Bot detected"
                })
            }
            return res.status(403).json({message:"Access denied"})

        
       
    }
next();
        
    } catch (error) {
        console.error("Arcjet Middleware error");;
        res.json({message:"Arcjet middleware error"});
        
    }

}

export default arcjetMiddleware;