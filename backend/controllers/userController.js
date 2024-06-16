import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";


// Login user
const loginUser=async (req,res)=>{
    const {email,password}=req.body;

    try{
        // Checking if user exists
        const user=await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User Does Not Exist"});
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false, message:"Invalid Password"});
        }

        const token=createToken(user._id);
        res.json({success:true,token});
    }
    catch(error){
        console.log(error);
        res.json({success:false, message:"Error in login"});
    }
}


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET);
}

// Register user
const registerUser=async (req,res)=>{
    const{name,password,email}=req.body;
    
    try{
        // Checking if user already exists
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"User already exists"});
        }

        // Validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Invalid email format"});
        }

        if(password.length<8){
            return res.json({success:false, message:"Password must be atleast 8 characters long"});
        }

        // Hashing User password
        const salt=await bcrypt.genSalt(10); // set number between 5 and 15 (15 stringest password and it will take time to  encrypt the password)
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        });

        const user = newUser.save();
        const token=createToken(user._id);
        res.json({success:true,token});

    }
    catch(err){
        console.log(err);
        res.json({success:false, message:"Error in registering user"});
    }
}

export {loginUser,registerUser};