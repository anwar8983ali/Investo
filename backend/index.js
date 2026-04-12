require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const cors=require("cors");
const cookieParser=require("cookie-parser");

const User=require("./model/UserModel");
const {HoldingModel}=require("./model/HoldingModel");
const {PositionModel}=require("./model/PositionModel");
const {OrderModel}=require("./model/OrderModel");

const app=express();
const PORT=process.env.PORT||3002;
const uri=process.env.MONGO_URL;

// middleware
app.use(cookieParser());
app.use(express.json());

app.use(cors({
 origin:["https://your-app.vercel.app"],
 credentials:true
}));

// DB connect
mongoose.connect(uri)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// 🔥 JWT TOKEN
const createToken=(id)=>{
 return jwt.sign({id},process.env.TOKEN_KEY,{expiresIn:"3d"});
};

// 🔥 AUTH MIDDLEWARE
const verifyUser=(req,res,next)=>{
 const token=req.cookies.token;
 if(!token){
  return res.status(401).json({message:"Not logged in"});
 }
 try{
  const decoded=jwt.verify(token,process.env.TOKEN_KEY);
  req.user=decoded;
  next();
 }catch{
  return res.status(403).json({message:"Invalid token"});
 }
};

// ================= AUTH =================

// SIGNUP
app.post("/signup",async(req,res)=>{
 try{
  const {email,password,username}=req.body;

  if(!email||!password||!username){
   return res.status(400).json({success:false,message:"Missing fields"});
  }

  const normalizedEmail=email.trim().toLowerCase();

  const existing=await User.findOne({email:normalizedEmail});
  if(existing){
   return res.json({success:false,message:"User already exists"});
  }

  const hashedPassword=await bcrypt.hash(password,10);

  const user=await User.create({
   email:normalizedEmail,
   password:hashedPassword,
   username
  });

  const token=createToken(user._id);

  res.cookie("token",token,{
   httpOnly:true,
   secure:true,
   sameSite:"None",
   maxAge:3*24*60*60*1000
  });

  res.json({success:true,message:"Signup successful"});

 }catch(err){
  console.log(err);
  res.status(500).json({success:false,message:"Server error"});
 }
});

// LOGIN
app.post("/login",async(req,res)=>{
 try{
  const {email,password}=req.body;

  if(!email||!password){
   return res.status(400).json({success:false,message:"Missing fields"});
  }

  const normalizedEmail=email.trim().toLowerCase();

  const user=await User.findOne({email:normalizedEmail});
  if(!user){
   return res.json({success:false,message:"User not found"});
  }

  const auth=await bcrypt.compare(password,user.password);
  if(!auth){
   return res.json({success:false,message:"Wrong password"});
  }

  const token=createToken(user._id);

  res.cookie("token",token,{
   httpOnly:true,
   secure:true,
   sameSite:"None",
   maxAge:3*24*60*60*1000
  });

  res.json({success:true,message:"Login successful"});

 }catch(err){
  console.log(err);
  res.status(500).json({success:false,message:"Server error"});
 }
});

// ================= DATA =================

// holdings (protected)
app.get("/allHoldings",verifyUser,async(req,res)=>{
 const data=await HoldingModel.find();
 res.json(data);
});

// positions
app.get("/allPositions",async(req,res)=>{
 const data=await PositionModel.find();
 res.json(data);
});

// orders
app.get("/allOrders",async(req,res)=>{
 try{
  const orders=await OrderModel.find();
  res.json(orders);
 }catch{
  res.status(500).send("Error fetching orders");
 }
});

// NEW ORDER
app.post("/newOrder",async(req,res)=>{
 try{
  let {name,qty,price,mode}=req.body;

  if(!name||!qty||!price||!mode){
   return res.status(400).send("Missing fields");
  }

  const buyQty=Number(qty);
  const buyPrice=Number(price);

  const normalizedName=name.trim().toUpperCase();
  const normalizedMode=mode.toUpperCase();

  await OrderModel.create({
   name:normalizedName,
   qty:buyQty,
   price:buyPrice,
   mode:normalizedMode
  });

  let existing=await HoldingModel.findOne({name:normalizedName});

  // BUY
  if(normalizedMode==="BUY"){
   if(existing){
    const newQty=existing.qty+buyQty;
    const newAvg=(existing.avg*existing.qty+buyPrice*buyQty)/newQty;

    existing.qty=newQty;
    existing.avg=newAvg;

    await existing.save();
   }else{
    await HoldingModel.create({
     product:"CNC",
     name:normalizedName,
     qty:buyQty,
     avg:buyPrice,
     price:buyPrice,
     net:"0%",
     day:"0%",
     isLoss:false
    });
   }
  }

  // SELL
  else if(normalizedMode==="SELL"){
   if(!existing||existing.qty<buyQty){
    return res.status(400).send("Not enough stock");
   }

   existing.qty-=buyQty;

   if(existing.qty===0){
    await HoldingModel.deleteOne({name:normalizedName});
   }else{
    await existing.save();
   }
  }

  res.json({success:true});

 }catch(err){
  console.error(err);
  res.status(500).send("Server error");
 }
});

// ================= START =================
app.listen(PORT,()=>{
 console.log("Server running at port",PORT);
});
