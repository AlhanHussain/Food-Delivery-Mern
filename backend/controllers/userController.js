import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator"


//login user
const loginUser=async(req,res)=>{
const {email, password} = req.body;
try {
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({success:false,message:"User not found"})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({success:false,message:"Invalid credentials"})
    }
  const token = createToken(user._id);
    res.status(200).json({success:true,message:"Login successful",token})

} catch (error) {
    console.log({success:false,message:error.message});
}

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//resgister user
const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;
    try {

        //checking if user already exists
        const exists  = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"user already exists"})
        }
        //validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token})
 
    } catch (error) {
        console.log(error);
            res.json({success:false,message:"something went wrong"})
        
    }
}




export {
    loginUser,
    registerUser
}