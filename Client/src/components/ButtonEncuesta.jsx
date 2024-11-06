import React from "react";
import { BsEmojiNeutralFill } from "react-icons/bs";

import { useAuth } from "../context/authContext";
function ButtonEncuesta({ handleChange, value, size, name, bg, hover, children, color, prev }) {
  const { valueChecked} = useAuth()
  return (
    <div className="flex flex-col  sm:justify-center w-full items-center ">
            
    
    <label
      className={` ${
        valueChecked === value ? `${bg}` : `${hover}`
      }  ${size} outline   outline-offset-4 ${color}  outline-2  transition-colors duration-200 rounded-full border-1  cursor-pointer `}
    >
    {children}
      <input
        type='radio'
        name={name}
        onChange={!prev && handleChange}
        checked={!prev && valueChecked === value}
        value={!prev && value}
        hidden
      />
    </label>
    <span className={`${bg} px-4 mt-5 opacity-60 text-sm border-2  border-black/50 tracking-wide rounded-lg text-white`}>{value}</span>
    </div>
  );
}

export default ButtonEncuesta;
