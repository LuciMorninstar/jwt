
import mongoose from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        minLength:2,
        maxLength:50,
        required:true
    },

    email:{
        type:String,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "please enter a valid email"],
        unique:true,
        required:true,
        lowercase:true
    },

    password:{
        type:String,
        required:true
    }
})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")){
       return  next();
    }
     const salt = await bcrypt.genSalt(10);
     this.password = await bcrypt.hash(this.password, salt);
     next();

})

UserSchema.methods.comparePassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword, this.password);

}

const UserModel = mongoose.model("user",UserSchema);

export default UserModel;