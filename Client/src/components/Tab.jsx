import React from "react";
import { useSnapshot } from "valtio";

import state from "../strore";

const Tab = ({ tab, isfilterTab, isActiveTab, handleclick }) => {
  const snap = useSnapshot(state);

  const activeStyle = isfilterTab && isActiveTab ? { backgroundColor: snap.color, opacity: 0.5}
  : {backgroundColor : "transparent", opacity: 1};
  return(

  <div
    key={tab.name}
    className={`tab-btn ${isfilterTab ? "glassmorphism rounded-full" : "rounded-4"}`}
    onClick={handleclick}
    style={activeStyle}
  >
    <img 
    src={tab.icon} 
    alt={tab.name}
    className={`${isActiveTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"}`}
    />
  </div>
  )
};

export default Tab;
