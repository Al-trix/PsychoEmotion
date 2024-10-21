import React, { useState } from "react";
import ButtonEncuesta from "./ButtonEncuesta";
import { useAuth } from "../context/authContext";
import {
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
  BsEmojiFrownFill,
  BsEmojiTearFill,
  BsFillEmojiLaughingFill,
} from "react-icons/bs";

import "../css/homeStyles.css";
function Question({ numQuestion, question, bg, hover }) {
  const { setQuestion, setValueChecked } = useAuth();
  const handleChange = (e) => {
    setValueChecked(e.target.value);
    setQuestion((prev) => ({
      ...prev,
      question: numQuestion + ". " + question,
      response: e.target.value,
    }));
  };

  return (
    <article className='py-12 mt-8 mx-7  rounded-xl shadow-2xl bg-gray-800/70 border border-white/10 shadow-black/5 font-mono'>
      <div className='lg:px-14 px-7'>
        <div>
          <h5 className='xl:text-xl   text-white text-justify font-sans  '>
            <span className={` text-2xl font-mono font-bold`}>
              {numQuestion}.{" "}
            </span>
            {question}
          </h5>
          <div className='flex flex-col xl:flex-row justify-start mt-2 pt-4  gap-6 border-t border-white/20  lg:justify-evenly items-start lg:items-center '>
            <ButtonEncuesta
              bg={bg}
              hover={hover}
              handleChange={handleChange}
              value='Nada'
              size='p-4'
              name={`question${numQuestion}`}
              color="border-red-500/50 outline-red-500/50"
            >
            <BsEmojiTearFill size={25} className='text-white/20' />
            </ButtonEncuesta>
            <ButtonEncuesta
              bg={bg}
              hover={hover}
              handleChange={handleChange}
              value='Muy poco'
              size='p-2'
              name={`question${numQuestion}`}
              color="border-orange-500/40 outline-orange-500/40"
            >
              <BsEmojiFrownFill size={25} className='text-white/20' />
            </ButtonEncuesta>
            <ButtonEncuesta
              bg={bg}
              hover={hover}
              handleChange={handleChange}
              value='medio'
              size='p-1'
              name={`question${numQuestion}`}
              color="border-yellow-500/40 outline-yellow-500/40"
            >
              <BsEmojiNeutralFill size={25} className='text-white/20' />
            </ButtonEncuesta>
            <ButtonEncuesta
              bg={bg}
              hover={hover}
              handleChange={handleChange}
              value='un poco'
              size='p-2'
              name={`question${numQuestion}`}
              color="border-jade-500/50 outline-jade-500/50"
            >
              <BsEmojiSmileFill size={25} className='text-white/20' />
            </ButtonEncuesta>
            <ButtonEncuesta
              bg={bg}
              hover={hover}
              handleChange={handleChange}
              value='mucho'
              size='p-4'
              name={`question${numQuestion}`}
              color="border-green-600/70 outline-green-600/70"
            >
              <BsFillEmojiLaughingFill size={25} className='text-white/20' />
            </ButtonEncuesta>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Question;
