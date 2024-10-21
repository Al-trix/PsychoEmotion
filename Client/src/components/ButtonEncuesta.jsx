import React from "react";
import { BsEmojiNeutralFill } from "react-icons/bs";

import { useAuth } from "../context/authContext";
function ButtonEncuesta({ handleChange, value, size, name, bg, hover, children, color }) {
  const { valueChecked} = useAuth()
  return (
    <div className="flex flex-col  sm:justify-center w-full items-center ">
            
    
    <label
      className={` ${
        valueChecked === value ? `${bg}` : `${hover}`
      }  ${size} outline   outline-offset-4 ${color} outline-2  transition-colors duration-200 rounded-full border-1 m-3 cursor-pointer `}
    >
    {children}
      <input
        type='radio'
        name={name}
        onChange={handleChange}
        checked={valueChecked === value}
        
        value={value}
        hidden
      />
    </label>
    <span className={`${bg} px-2 mt-5 opacity-80 rounded-lg text-white/80`}>{value}</span>
    </div>
  );
}

export default ButtonEncuesta;
