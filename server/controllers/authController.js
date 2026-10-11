import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => 
    jwt.sign({id}, process.env.JWT_SECRET , {expiresIn:"7d"});

export const register = async(req,res) => 
{
    try 
    {
        const {name , email , password} = req.body;

        if(!name || !email || !password)
        {
            return res.status(400).json({message: "All fields are required"})
        }

        if(password.length<6)
        {
            return
            res
            .status(400)
            .json({message:"Password must be at least 6 letters"});
        }
        
        const exists = await User.findOne({email});
        if(exists)
        {
            return res.status(400).json({message: "Email already registered"});
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name , email , password : hashed});

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }

    catch(err)
    {
        res.status(500).json({message:err.message});
    }
};


export const login = async (req,res) => {
    try{
        const {email , password} = req.body;

        if(!email || !password)
        {
            return res.status(400).json({message: "Email and passwords are required"});
        }

        const user = await User.findOne({email}).select("+password");
        if(!user || !(await bcrypt.compare(password , user.password)))
        {
            return res.status(401).json({message:"Invalid email and password"});
        }

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }

    catch(err)
    {
        res.status(500).json({message:err.message});
    }
}  

export const getMe = async (req,res) => {
    res.json(req.user);
};