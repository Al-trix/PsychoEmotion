import Developer from "../components/Developer";
import { flushSync } from "react-dom";
import DeveloperView from "../components/DeveloperView";
import alvaro from '../../public/alvaro-face.jpeg'
import simon from '../../public/simon-face.jpeg'
import deivy from '../../public/deivy-face.jpeg'
import "../css/animations.css";
import { useState } from "react";
import { Divider } from "@nextui-org/react";
function AboutUs() {
  
  const [view, setView] = useState(true);
  const [imgView, setImgView] = useState("");
  const [nameView, setNameView] = useState("");
  const [nameStyleView, setNameStyleView] = useState("");
  const [imgStyleView, setImgStyleView] = useState("");

  const handleClick = (e) => {
    document.startViewTransition(() => {
      flushSync(() => {
        setImgView(e.target.childNodes[0].children[0].src);
        setNameView(e.target.childNodes[1].childNodes[0].innerText);
        setNameStyleView(e.target.childNodes[1].childNodes[0].dataset.name);
        setImgStyleView(e.target.childNodes[0].children[0].dataset.img);
        setView((prev) => !prev);
      });
    });
  };
  const handleClickExit = () => {
    document.startViewTransition(() => {
      flushSync(() => {
        setView((prev) => !prev);
      });
    });
  };
  const descriptions = {
    textSimon:
      'Estudiante de la Institución Educativa la candelaria, interesado en los estudios de la mente humana y cómo se relaciona la persona con su entorno, yo sueño con poder seguir cultivando mis intereses en la universidad y poder lograr algo de lo que me sienta orgulloso.',
    textDeivy:
      'Estudiante de la institución educativa La Candelaria, amante del dibujo y el diseño, sueño con poder descubrir nuevos gustos, pasiones e intereses en la vida, seguir con los estudios y cultivar nuevos propósitos en la universidad y en la futura vida independiente',
      textAlvaro: 'Estudiante de la Institución Educativa la candelaria, apasionado por la tecnologuia y la informatica, conocedor de multiples lenguajes y gran amante del codigo. Una persona interesada plenamente en sus estudios y trabajos. Mi sueño es estudiar ingenieria en la universidad y seguir con un empleo en esto.'
  };
  
  console.log(view, imgView, imgStyleView);
  return (
    <div className="w-full  justify-center items-center font-mono my-9">
      <div className="w-3/4 text-center mx-auto ">
        <h3 className="text-2xl border-2  mx-auto w-max border-kenyan-copper-500 rounded-lg  px-5 py-5 font-bold text-white animation-title text-center">
          Conoce el equipo
          <Divider className="mt-1 w-32   mx-auto" />
        </h3>
        <Divider
          className="mt-1 h-3  bg-kenyan-copper-500 mx-auto"
          orientation="vertical"
        />
        <p className=" border-2 animation-image border-kenyan-copper-500 rounded-lg  px-5 py-5 text-white/80 text-md shadow-md shadow-white/20">
          Tres estudiantes apasionados por la tecnología y la psicología se
          unieron para crear un portal web innovador que utiliza inteligencia
          artificial para realizar encuestas de personalidad. Su principal
          motivación fue su frustración con las típicas encuestas en línea, las
          cuales suelen ser poco claras y genéricas, sin ofrecer una explicación
          profunda de los distintos rasgos de personalidad. Con su portal,
          buscan que cada usuario reciba un análisis detallado, personalizado y
          más significativo de su carácter, ayudando a la gente a entenderse
          mejor a sí misma.
        </p>
      </div>
      <div className="flex mt-24 items-center justify-center animation-up">
        <span className=" w-2/5   bg-white/40 h-px mx-auto flex "></span>
        <span className="text-3xl mx-7 font-medium text-kenyan-copper-300">
          Integrantes
        </span>
        <span className=" w-2/5   bg-white/40 h-px mx-auto flex "></span>
      </div>
      {view && (
        <section className="mt-8 animation-up  w-max mx-auto gap-5 flex ">
          <Developer
            handleClick={handleClick}
            img={alvaro}
            delay={1}
            description={'Deeveloper full-stack'}
            name={'Alvaro Arboleda'}
            color={'text-ming-400'}
            bg={'bg-ming-800'}
          />
          <Developer
            handleClick={handleClick}
            img={deivy}
            rigth={true}
            delay={2}
            description={'Diseñador grafico'}
            name={'Deivy Gallego'}
            color={'text-red-500'}
            bg={'bg-red-800'}
          />
          <Developer
            handleClick={handleClick}
            img={simon}
            delay={3}
            description={'Investigador y logistica'}
            name={'Simon Andres Rojas'}
            color={'text-jade-500'}
            bg={'bg-jade-800'}
          />
        </section>
      )}
      {!view && (
        <DeveloperView
          name={nameView}
          nameStyleView={nameStyleView}
          handleClickExit={handleClickExit}
          src={imgView}
          text={
            nameView && nameView === 'Simon Andres Rojas'
              ? descriptions.textSimon
              : nameView === 'Deivy Gallego Villa'
              ? descriptions.textDeivy
              : descriptions.textAlvaro
          }
          imgStyleView={imgStyleView}
        />
      )}
    </div>
  );
}

export default AboutUs;
