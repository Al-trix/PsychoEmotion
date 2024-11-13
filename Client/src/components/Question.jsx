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
function Question({ numQuestion, question, bg, hover, preview = false }) {
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
    <article
      className={` ${bg} p-1  rounded-xl shadow-2xl  border border-white/10 h-ful w-full shadow-black/5 font-mono`}
    >
      <div className=" px-10 rounded-lg py-8 h-full w-full bg-black/85">
        <div>
          <h5 className="xl:text-xl   text-white text-justify font-sans  ">
            <span className={` text-2xl font-mono font-bold`}>
              {numQuestion}.{' '}
            </span>
            {question}
          </h5>
          <div className="flex flex-col xl:flex-row justify-start  pt-4  gap-4 border-t  border-white/20  lg:justify-evenly items-start lg:items-center ">
            <ButtonEncuesta
              bg={bg}
              hover={hover}
              prev={preview}
              handleChange={handleChange}
              value="Nunca"
              size="p-4"
              name={`question${numQuestion}`}
              color="border-red-500/50 outline-red-500/50"
            >
              <BsEmojiTearFill size={25} className="text-gray-400 relative z-50 " />
            </ButtonEncuesta>
            <ButtonEncuesta
              bg={bg}
              prev={preview}
              hover={hover}
              handleChange={handleChange}
              value="Casi nunca"
              size="p-2"
              name={`question${numQuestion}`}
              color="border-orange-500/40 outline-orange-500/40"
            >
              <BsEmojiFrownFill size={25} className="text-gray-400 relative z-50 " />
            </ButtonEncuesta>
            <ButtonEncuesta
              bg={bg}
              prev={preview}
              hover={hover}
              handleChange={handleChange}
              value="A veces"
              size="p-1"
              name={`question${numQuestion}`}
              color="border-yellow-500/40 outline-yellow-500/40"
            >
              <BsEmojiNeutralFill size={25} className=" text-gray-400 relative z-50 " />
            </ButtonEncuesta>
            <ButtonEncuesta
              bg={bg}
              hover={hover}
              prev={preview}
              handleChange={handleChange}
              value="Muy seguido"
              size="p-2"
              name={`question${numQuestion}`}
              color="border-jade-500/50 outline-jade-500/50"
            >
              <BsEmojiSmileFill size={25} className="text-gray-400 relative z-50 " />
            </ButtonEncuesta>
            <ButtonEncuesta
              bg={bg}
              prev={preview}
              hover={hover}
              handleChange={handleChange}
              value="Siempre"
              size="p-4"
              name={`question${numQuestion}`}
              color="border-green-600/70 outline-green-600/70"
            >
              <BsFillEmojiLaughingFill size={25} className="text-gray-400 relative z-50 " />
            </ButtonEncuesta>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Question;
