import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Auth=()=>{

const navigate=useNavigate();

const[isSignup,setIsSignup]=useState(true);

const[data,setData]=useState({
email:"",
username:"",
password:""
});

const handleChange=(e)=>{
setData({...data,[e.target.name]:e.target.value});
};

const handleSubmit=async(e)=>{
e.preventDefault();

try{
const url=isSignup
?"http://localhost:3002/signup"
:"http://localhost:3002/login";

const res=await axios.post(url,data,{
withCredentials:true
});

if(res.data.success){
alert(isSignup?"Signup Successful":"Login Successful");
navigate("/dashboard");
}else{
alert(res.data.message);
}

}catch(err){
console.log(err);
}
};

return(
<div className="auth-container">

<div className="auth-box">

<h2>{isSignup?"Create Account":"Login"}</h2>

<form onSubmit={handleSubmit}>

{isSignup && (
<input
type="text"
name="username"
placeholder="Username"
onChange={handleChange}
/>
)}

<input
type="email"
name="email"
placeholder="Email"
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
onChange={handleChange}
/>

<button type="submit">
{isSignup?"Signup":"Login"}
</button>

</form>

<p onClick={()=>setIsSignup(!isSignup)} className="toggle">
{isSignup
?"Already have account? Login"
:"Don't have account? Signup"}
</p>

</div>
</div>
);
};

export default Auth;