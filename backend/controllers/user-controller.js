import { request } from "express";
import User from "../models/User.js";
import bcryptjs from "bcryptjs";
export const getAllUser=async(req,res,next)=>{
    let users;
    try {
        users=await User.find();
    } catch (error) {
        console.log(error)
    }
    if(!users) {
        return res.status(404).json({message:"NO USERS FOUND"})
    }
   return res.status(200).json({users})
}
export const signup=async(req,res,next)=>{
    const {name,email,password}=req.body;

    let existingUser;
    try {
        existingUser=await User.findOne({email})
    } catch (error) {
        console.log(error)
    }
    if(existingUser) {
        return res.status(400).json({message:"USER ALREADY EXISTED"})
    }
    const hasedPassword=bcryptjs.hashSync(password)
    const  newUser=new User({
        name,email,password:hasedPassword,blogs:[],
    })
    try {
        await newUser.save()
    } catch (error) {
        console.log(error)
    }
   return res.status(201).json({newUser})
}
export const login=async(req,res,next)=>{
    const {email,password}=req.body;

    let existingUser;
    try {
        existingUser=await User.findOne({email})
    } catch (error) {
        console.log(error)
    }
    if(!existingUser) {
        return res.status(400).json({message:"NO EXISTING USER"})
    }
    const isPasswordCorrect=bcryptjs.compareSync(password,existingUser.password)
    if(!isPasswordCorrect) {
        return res.status(400).json({message:"PASS INCORRECT"})
    }
   return res.status(200).json({message:"SUCCESSFULL LOGIN",user:existingUser})
}