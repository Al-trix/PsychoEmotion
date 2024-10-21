import React, { useEffect } from "react";
import mockup from "../../public/mockup.jpg";
import Encuesta from "../components/Encuesta.jsx";
import TypeOfPersonalities from "../components/TypeOfPersonalities.jsx";
import { Image, Button } from "@nextui-org/react";
import "../css/homeStyles.css";
import "../css/animations.css";
import { useAuth } from "../context/authContext";

function Home() {
  // Se puede hacer el chequeo del user dentro del useEffect
  // Dependencia en el user

  return (
    <>
      <section className='img relative justify-center gap-4  items-center flex w-full '>
        <div className=' z-30 relative basis-3/4 font-mono  text-center  flex gap-4 flex-col pb-20'>
          <h1 className='animation-title text-7xl text-kenyan-copper-100  font-medium'>
            Bienvenido a{" "}
            <span className='  uppercase text-6xl text-kenyan-copper-600  animate-pulse font-bold'>
              psychoEmotion
            </span>
          </h1>
          <p className='animation-text text-sm  text-kenyan-copper-100'>
            Portal web para hacer una encuesta que lanzará un resultado de
            alguna personalidad dañina que podrías tener.
          </p>
        </div>
      </section>
      <section className='grid mt-10 font-mono w-3/4 pb-10 gap-y-20 container mx-auto xl:grid-rows-2 '>
        <article className='animation-cards-text w-full grid grid-cols-1 place-items-center  xl:grid-cols-2  shadow-2xl  rounded-xl shadow-black/50 pr-7  gap-6 border  px-5 py-3 justify-center'>
          <Image className='r hidden sm:block' src='../../public/img1.jpeg' />
          <div className='flex justify-center pr-8 w-full gap-5 flex-col'>
            <h3 className='text-2xl w-full text-kenyan-copper-50 font-medium'>
              ¿Qué es una personalidad dañina?
            </h3>
            <p className='text-lg font-light text-kenyan-copper-100/50 text-justify'>
              Una personalidad dañina es un patrón persistente de pensamientos,
              sentimientos y comportamientos que impactan negativamente el
              bienestar de la persona y quienes la rodean. Se distingue por
              mantener rasgos o hábitos perjudiciales para la tranquilidad
              mental, en lugar de ser explosiones emocionales ocasionales.
            </p>
          </div>
        </article>
        <article className='animation-cards-text w-full grid grid-cols-1 place-items-center  xl:grid-cols-2  shadow-2xl  rounded-xl shadow-black/50 pr-7  gap-6 border  px-5 py-3 justify-center'>
          <div className='flex justify-center pr-8 w-full gap-5 flex-col'>
            <h3 className='text-2xl w-full text-kenyan-copper-50 font-medium'>
              ¿Cómo afecta esto en la vida cotidiana?
            </h3>
            <p className='text-lg font-light text-kenyan-copper-100/50 text-justify'>
              Las personalidades tóxicas pueden impactar diversas áreas de
              nuestra vida, generando conflictos en nuestras relaciones,
              afectando el rendimiento académico y aumentando el estrés, lo que
              deteriora nuestra salud mental. En resumen, casi todos los
              aspectos de nuestra vida pueden verse negativamente influenciados.
            </p>
          </div>
          <Image className='r hidden sm:block' src='../../public/img1.jpeg' />
        </article>
      </section>
      <TypeOfPersonalities />
      <Encuesta />
    </>
  );
}

export default Home;
