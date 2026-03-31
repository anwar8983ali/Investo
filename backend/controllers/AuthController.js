const User=require("../models/UserModel");
const bcrypt=require("bcryptjs");
const createToken=require("../utils/token");

// SIGNUP
exports.signup=async(req,res)=>{
const{email,password,username}=req.body;

const exist=await User.findOne({email});
if(exist) return res.json({success:false,message:"User exists"});

const user=await User.create({email,password,username});
const token=createToken(user._id);

res.cookie("token",token,{httpOnly:true});

res.json({success:true});
};

// LOGIN
exports.login=async(req,res)=>{
const{email,password}=req.body;

const user=await User.findOne({email});
if(!user) return res.json({success:false,message:"Invalid"});

const auth=await bcrypt.compare(password,user.password);
if(!auth) return res.json({success:false,message:"Invalid"});

const token=createToken(user._id);
res.cookie("token",token,{httpOnly:true});

res.json({success:true});
};