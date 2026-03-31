const jwt=require("jsonwebtoken");

const verifyUser=(req,res,next)=>{
const token=req.cookies.token;

if(!token) return res.status(401).send("Unauthorized");

try{
const data=jwt.verify(token,process.env.TOKEN_KEY);
req.userId=data.id;
next();
}catch(err){
return res.status(401).send("Invalid token");
}
};

module.exports=verifyUser;