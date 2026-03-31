import React,{useState} from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext=React.createContext({
openBuyWindow:(uid)=>{},
openSellWindow:(uid)=>{},
closeWindow:()=>{},
});

export const GeneralContextProvider=(props)=>{
const[isWindowOpen,setIsWindowOpen]=useState(false);
const[selectedStockUID,setSelectedStockUID]=useState("");
const[actionType,setActionType]=useState(""); // BUY or SELL

// ✅ Open BUY
const handleOpenBuyWindow=(uid)=>{
setIsWindowOpen(true);
setSelectedStockUID(uid);
setActionType("BUY");
};

// ✅ Open SELL
const handleOpenSellWindow=(uid)=>{
setIsWindowOpen(true);
setSelectedStockUID(uid);
setActionType("SELL");
};

// ✅ Close (common)
const handleCloseWindow=()=>{
setIsWindowOpen(false);
setSelectedStockUID("");
setActionType("");
};

return(
<GeneralContext.Provider
value={{
openBuyWindow:handleOpenBuyWindow,
openSellWindow:handleOpenSellWindow,
closeWindow:handleCloseWindow,
}}
>
{props.children}

{/* 🔥 Conditional Rendering */}
{isWindowOpen&&actionType==="BUY"&&(
<BuyActionWindow uid={selectedStockUID}/>
)}

{isWindowOpen&&actionType==="SELL"&&(
<SellActionWindow uid={selectedStockUID}/>
)}

</GeneralContext.Provider>
);
};

export default GeneralContext;