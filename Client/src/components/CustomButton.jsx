import React from "react";
import state from "../../strore";
import { useSnapshot } from "valtio";

const CustomButton = ({ type, title, handleClick, customStyles }) => {
  const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: "#fff",
      };
    } else if (type === "outline") {
      return {
        border: "1px solid #1dc071",
        color: "#1dc071",
      };
    }
  };
  return (
    <div>
      <button
        className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
        style={generateStyle(type)}
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  );
};

export default CustomButton;
