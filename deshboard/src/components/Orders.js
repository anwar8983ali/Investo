import React,{useEffect,useState} from "react";
import axios from "axios";


const Orders=()=>{
const[orders,setOrders]=useState([]);

useEffect(()=>{
fetchOrders();
},[]);

const fetchOrders=async()=>{
try{
const res=await axios.get("https://investo-hdsy.onrender.com/allOrders");
setOrders(res.data);
}catch(err){
console.error("Error fetching orders:",err);
}
};

return(
<div className="order-table">
<h2>Orders</h2>

<table className="orders-table">
<thead>
<tr>
<th>Stock</th>
<th>Type</th>
<th>Qty</th>
<th>Price</th>
<th>Status</th>
</tr>
</thead>

<tbody>
{orders.length===0?(
<tr>
<td colSpan="5" className="no-data">No Orders Found</td>
</tr>
):(
orders.map((order,index)=>(
<tr key={index}>
<td>{order.name}</td>

<td className={order.mode==="BUY"?"buy":"sell"}>
{order.mode}
</td>

<td>{order.qty}</td>

<td>₹{order.price}</td>

<td className="status">Completed</td>
</tr>
))
)}
</tbody>
</table>

</div>
);
};

export default Orders;
