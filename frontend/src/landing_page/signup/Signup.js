import React,{useState} from "react";
import axios from "axios";

const Auth=()=>{

const[isSignup,setIsSignup]=useState(true);

const[data,setData]=useState({
email:"",
username:"",
password:""
});

const handleChange=(e)=>{
setData({...data,[e.target.name]:e.target.value});
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!data.email || !data.password || (isSignup && !data.username)) {
    alert("Please fill all fields");
    return;
  }

  try {
    const url = isSignup
      ? "https://investo-hdsy.onrender.com/signup"
      : "https://investo-hdsy.onrender.com/login";

    const res = await axios.post(url, data, {
      withCredentials: true,
    });

    console.log("Response:", res.data);

    if (res.data.success) {
      window.location.href="https://your-dashboard.vercel.app";
    } else {
      // 🔥 THIS WAS MISSING
      alert(res.data.message);
    }

  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
};

return(
<div className="auth-container">

<div className="auth-box">

<h2>{isSignup?"Create Account":"Login"}</h2>

<form onSubmit={handleSubmit}>

{isSignup&&(
<input
type="text"
name="username"
placeholder="Username"
value={data.username}
onChange={handleChange}
/>
)}

<input
type="email"
name="email"
placeholder="Email"
value={data.email}
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
value={data.password}
onChange={handleChange}
/>

<button type="submit">
{isSignup?"Signup":"Login"}
</button>

</form>

<p
onClick={()=>setIsSignup(!isSignup)}
className="toggle"
>
{isSignup
?"Already have account? Login"
:"Don't have account? Signup"}
</p>

</div>
</div>
);
};

export default Auth;
