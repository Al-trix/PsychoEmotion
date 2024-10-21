import React, { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import {Image} from '@nextui-org/react'
import "../css/animations.css";

function Developer({ img, description, name, delay, handleClick, color, bg }) {
  
  return (
    <article
      onClick={handleClick}
      className={` animation-devs  cursor-pointer hover:scale-95 hover:opacity-90 transition-transform duration-300  bg-black/60 border border-white/70 rounded-xl gap-7 flex items-center`}
    >
      <picture className='w-1/4  bg-gray-100 rounded-xl pointer-events-none'>
        <img
          src={img}
          alt=''
          data-img={`img${delay}`}
          className='w-full select-none pointer-events-none'
          style={{ viewTransitionName: `img${delay}` }}
        />
      </picture>
      <div className='pointer-events-none  '>
        <h3
          data-name={`text${delay}`}
          style={{ viewTransitionName: `text${delay}` }}
          className={`pointer-events-none  ${color} text-2xl font-bold`}
        >
          {name}
        </h3>
        <p className='pointer-events-none text-sm text-white/80'>{description}</p>
        <FaArrowDown
          color='#fff'
          size={30}
          className='animate-bounce  mt-2 pointer-events-none'
        />
      </div>
    </article>
  );
}

export default Developer;
