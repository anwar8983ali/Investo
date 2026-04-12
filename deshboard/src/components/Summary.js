import React,{useEffect,useState} from "react";
import axios from "axios";

const Summary=()=>{

const[holdings,setHoldings]=useState([]);

useEffect(()=>{
fetchHoldings();
},[]);

const fetchHoldings=async()=>{
try{
const res=await axios.get("https://investo-hdsy.onrender.com/allHoldings");
setHoldings(res.data);
}catch(err){
console.error(err);
}
};

// 🔥 CALCULATIONS
let investment=0;
let currentValue=0;

holdings.forEach((item)=>{
investment+=item.avg*item.qty;
currentValue+=item.price*item.qty;
});

const pnl=currentValue-investment;
const pnlPercent=investment?((pnl/investment)*100).toFixed(2):0;

return(
<>
<div className="username">
<h6>Hi, User!</h6>
<hr className="divider"/>
</div>

<div className="section">
<span><p>Equity</p></span>

<div className="data">
<div className="first">
<h3>{(currentValue/1000).toFixed(2)}k</h3>
<p>Margin available</p>
</div>

<hr/>

<div className="second">
<p>Margins used <span>0</span></p>
<p>Opening balance <span>{(currentValue/1000).toFixed(2)}k</span></p>
</div>
</div>

<hr className="divider"/>
</div>

<div className="section">
<span>
<p>Holdings ({holdings.length})</p>
</span>

<div className="data">
<div className="first">
<h3 className={pnl>=0?"profit":"loss"}>
{(pnl/1000).toFixed(2)}k <small>{pnlPercent}%</small>
</h3>
<p>P&L</p>
</div>

<hr/>

<div className="second">
<p>
Current Value <span>{(currentValue/1000).toFixed(2)}k</span>
</p>

<p>
Investment <span>{(investment/1000).toFixed(2)}k</span>
</p>
</div>
</div>

<hr className="divider"/>
</div>
</>
);
};

export default Summary;
