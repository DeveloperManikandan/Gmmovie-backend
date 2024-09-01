import {User} from "../models/userModels.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Login= async(req,res)=>{
    try {

        const {email,password}=req.body;
        if(!email || !password)
        {
            return res.status(401).json({
                message:"Please enter email and password",
                success:false
            });
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"User not found"});
            }
            const isMatch=await bcryptjs.compare(password,user.password);
            if(!isMatch){
                return res.status(400).json({msg:"Invalid mail-id or password...!"});
                }

                const tokendata ={
                    id:user._id,
                }
                    const token= await jwt.sign(tokendata,"qwertyuiopasdfghjklzxcvbnm",{expiresIn:"1d"});
                    return res.status(200).cookie("token",token,{httpOnly:true}).json({
                        message:`Login Successfull ${user.username}`, success:true,user
                        });
                } catch (error) {
                    console.log(error);
                    res.status(500).json({message:"Error in Login",success:false});
                    }
                    
}

export const Logout = async(req,res)=>{
    try {
        res.clearCookie("token", {path:"/"});
        return res.json({msg:"Logout Successfull",success:false});
        } catch (error) {
            console.log(error);
            res.status(500).json({message:"Error in Logout",success:false});
            }
}

export const Register =async(req,res) =>{
    try{
        const {username,email,password} = req.body;
       if(!username || !email || !password) {
            return res.status(401).json({
                message:"Please fill all the fields",
                success :false
                })
        }
        const user = await User.findOne({email});
        if(user)
            {
                return res.status(401).json({
                    message:"User already exists",
                    success :false,
                    })
                    }
                    const hashedpassword = await bcryptjs.hash(password,16);
                    await User.create({
                        username,
                        email,
                        password :hashedpassword
                    });
                    return res.status(201).json({
                        message:"User created successfully",
                        success :true
                        })
    } catch (error){
        console.log(error);
    }
}