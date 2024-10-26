import React, { useEffect, useRef, useState } from "react";
import { Navigation } from "swiper/modules";
import Question from "./Question";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import { FaArrowRight } from "react-icons/fa";
import { analysisSurvey } from "../api/analysisSurvey";
import { useAuth } from "../context/authContext";
import { getAllQuestions } from '../api/admin.js'
import { Button, Image } from "@nextui-org/react";
import { surveyResponsed } from "../api/surveyResponse.js";

function Encuesta() {
  const { question, valueChecked, setValueChecked, modifyQuestion, user, responseSurvey } =
    useAuth();
  const [responses, setResponses] = useState({ surveyResponse: [] });
  const [itemQuestion, setItemQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [playEncuesta, setPlayEncuesta] = useState(false);
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  

  useEffect(() => {
    if (itemQuestion === 1) {
      setResponses({ surveyResponse: [] }); // Limpiar el array responses cuando llegues al slide 1
      setValueChecked(""); // Reiniciar el valor seleccionado
    }
  }, [itemQuestion]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsResult = await getAllQuestions();
        setQuestions(questionsResult.length !== 0 && questionsResult.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, [modifyQuestion]);

  const handleStart = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleEnd = async () => {
    try {
      const res = await surveyResponsed(responses);

      navigate("/AnalysisSurvey");
    } catch (error) {
      console.log(error);
    }
  };

  const handleResponse = () => {
    if (valueChecked) {
      setResponses((prev) => ({
        userId: user.uid,
        surveyResponse: [...prev.surveyResponse, question],
      }));
      setValueChecked("");
      if (swiperRef.current && valueChecked !== "") {
        swiperRef.current?.slideNext();
      }
    }
  };

  
  const handleBefore = () => {
    setResponses((prev) => ({
      ...prev,
      surveyResponse: prev.surveyResponse.slice(0, -1),
    }));
    setValueChecked("");
    if (swiperRef.current?.swiper && valueChecked !== "") {
      swiperRef.current.swiper.slidePrev();
    }
  };
  const handlePress = () => {
    setPlayEncuesta((prev) => !prev);
  };

  return (
    <section className='relative flex flex-col items-center justify-center mb-20' id="encuesta">
      <h3 className=' text-4xl font-bold font-mono text-center pt-14 pb-7 text-kenyan-copper-100 '>
        Encuesta
      </h3>
      {responseSurvey ?  (
        <div>
          <h1>Ya respondiste la encuesta</h1>
          <NavLink to={"/AnalysisSurvey"}>
            <p>Revisa la encuesta</p>
          </NavLink>
        </div>
      ) : (
        <>
          <div
            className={`${
              playEncuesta ? "scale-100 opacity-100" : "scale-0 opacity-10"
            } transition-transform duration-800 relative  w-full justify-center flex flex-col items-center`}
          >
            <Swiper
              modules={[Navigation]}
              allowTouchMove={false}
              spaceBetween={40}
              className={`border-rainbow  items-center  w-11/12 lg:w-3/5 flex  shadow-2xl bg-black/60`}
              slidesPerView={1}
              onSlideChange={(swiper) => setItemQuestion(swiper.activeIndex)}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
            >
              <SwiperSlide>
                <div className=' w-full bg-black/90 border border-raius border-white/20 py-20 rounded-2xl items-center flex flex-col justify-center font-mono  gap-5'>
                  <h1 className='content-star text-5xl text-kenyan-copper-500 font-bold'>
                    Bienvenido a la encuesta
                  </h1>
                  <span className='w-1/2 h-px mx-auto bg-white'></span>
                  <p className='text-white/40 w-2/3 text-center'>
                    Recuerda responder todas las preguntas y ver los resultados
                    al finalizar
                  </p>
                  <Button
                    onPress={handleStart}
                    color='primary'
                    className={`px-2 bg-kenyan-copper-700 ${
                      itemQuestion === 0 && "swiper-button-next"
                    }`}
                  >
                    comencemos
                  </Button>
                </div>
              </SwiperSlide>
              {questions.map(({ question, bg, num, hover }, index) => (
                <SwiperSlide key={num + index}>
                  <Question
                    numQuestion={num}
                    question={question}
                    bg={bg}
                    hover={hover}
                  />
                </SwiperSlide>
              ))}
              <SwiperSlide className=' w-full bg-black/90 border border-raius border-white/20 py-20 rounded-2xl items-center flex flex-col justify-center font-mono  gap-5'>
                <h1 className='content-star text-5xl text-kenyan-copper-500 font-bold'>
                  Acabamos la encuesta
                </h1>
                <span className='w-1/2 h-px mx-auto bg-white'></span>
                <Button
                  onPress={handleEnd}
                  color='primary'
                  className={`px-2 bg-kenyan-copper-700`}
                >
                  Envia tus resultados
                </Button>
              </SwiperSlide>
            </Swiper>

            <div
              className={` ${
                itemQuestion === 0 && playEncuesta && "scale-x-0 opacity-0"
              }  scale-105  justify-between  opacity-100  transition-transform duration-400  w-2/5 px-5 rounded-full py-3 flex items-center  bg-black/80 mt-4`}
            >
              <Button
                onClick={handleBefore}
                disabled={itemQuestion === 1}
                className='bg-gray-800 disabled:pointer-events-none disabled:opacity-50 text-white/80 swiper-button-prev rounded-full'
                shadow
              >
                Atrás
              </Button>
              <span className='text-white font-mono text-xl bg-black px-3 py-1 rounded-lg '>
                {itemQuestion}/{questions.length+1}
              </span>
              <Button
                onClick={handleResponse}
                disabled={valueChecked === "" || itemQuestion === 0}
                className={`bg-kenyan-copper-800 disabled:pointer-events-none disabled:opacity-50  text-white/80 rounded-full ${
                  itemQuestion !== 0 && "swiper-button-next"
                }`}
                shadow
              >
                Siguiente
              </Button>
            </div>
          </div>
          <article
            className={`${
              playEncuesta ? "scale-0 opacity-10" : "scale-100 opacity-100"
            } transition-transform duration-800 absolute top-40 mx-auto rounded-xl bg-black/40 border border-white/30  w-4/5 flex`}
          >
            <div className='px-6 py-6 font-mono  flex flex-col justify-center'>
              <h3 className='text-3xl text-kenyan-copper-500'>Importante</h3>
              <span className='w-1/12 h-px bg-white '></span>
              <p className='text-white/70 w-4/5 text-justify my-5'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aspernatur officia velit ullam enim pariatur eum sunt architecto
                alias accusamus incidunt rem voluptatum vitae dolorem numquam
                tempore delectus, saepe porro suscipit.
              </p>
              <Button
                color='prmary'
                className='bg-kenyan-copper-900 w-4/5 text-xl animate-bounce '
                onPress={handlePress}
              >
                Empecemos <FaArrowRight size={20} />{" "}
              </Button>
            </div>
            <Image
              width={2500}
              radius='none'
              isBlurred
              className=' hidden  sm:block'
              src='../../public/img1.jpeg'
            />
          </article>
        </>
      )}
    </section>
  );
}

export default Encuesta;
