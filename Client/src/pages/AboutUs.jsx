import Developer from "../components/Developer";
import { flushSync } from "react-dom";
import DeveloperView from "../components/DeveloperView";
import "../css/animations.css";
import { useState } from "react";
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
  console.log(view, imgView, imgStyleView);
  return (
    <div className="w-full  justify-center items-center font-mono my-9">
      <div className="">
        <h3 className="text-4xl text-white animation-text text-center">
          Conoce el equipo
        </h3>
        <p>
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
      {view && (
        <section className="flex border-rainbow border-2 flex-col w-3/4 mx-auto mt-4 rounded-xl bg-black/20 py-4 px-7 gap-5">
          <Developer
            handleClick={handleClick}
            img={'../../public/logo.png'}
            delay={1}
            description={'Deeveloper full-stack'}
            name={'Alvaro Arboleda'}
            color={'text-ming-400'}
            bg={'bg-ming-800'}
          />
          <Developer
            handleClick={handleClick}
            img={'../../public/logo.png'}
            rigth={true}
            delay={2}
            description={'Diseñador grafico'}
            name={'Deivy Gallego'}
            color={'text-red-500'}
            bg={'bg-red-800'}
          />
          <Developer
            handleClick={handleClick}
            img={'../../public/logo-lite.png'}
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
          imgStyleView={imgStyleView}
        />
      )}
    </div>
  );
}

export default AboutUs;
