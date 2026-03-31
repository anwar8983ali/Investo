import React,{useState,useContext} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import GeneralContext from "./GeneralContext.js";
import "./BuyActionWindow.css";

const SellActionWindow=({uid})=>{
const[stockQuantity,setStockQuantity]=useState(1);
const[stockPrice,setStockPrice]=useState(0.0);

const{closeBuyWindow}=useContext(GeneralContext);

const handleSellClick=async()=>{
try{
await axios.post("http://https://investo-hdsy.onrender.com/newOrder",{
name:uid,
qty:stockQuantity,
price:stockPrice,
mode:"SELL", // 🔥 change here
});
closeBuyWindow();
}catch(err){
console.error("Error placing sell order:",err);
}
};

const handleCancelClick=()=>{
closeBuyWindow();
};

return(
<div className="container" id="sell-window" draggable="true">
<div className="regular-order">
<div className="inputs">
<fieldset>
<legend>Qty.</legend>
<input
type="number"
onChange={(e)=>setStockQuantity(e.target.value)}
value={stockQuantity}
/>
</fieldset>

<fieldset>
<legend>Price</legend>
<input
type="number"
step="0.05"
onChange={(e)=>setStockPrice(e.target.value)}
value={stockPrice}
/>
</fieldset>
</div>
</div>

<div className="buttons">
<span>Check before selling</span>
<div>
<Link className="btn btn-red" onClick={handleSellClick}>
Sell
</Link>

<Link to="" className="btn btn-grey" onClick={handleCancelClick}>
Cancel
</Link>
</div>
</div>
</div>
);
};

export default SellActionWindow;
