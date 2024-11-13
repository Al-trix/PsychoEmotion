import { useEffect, useRef, useState } from 'react';
import { Navigation } from 'swiper/modules';
import Question from './Question';
import landing2 from '../../public/image-landing2.jpeg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IoIosArrowForward } from 'react-icons/io';

import { NavLink, useNavigate } from 'react-router-dom';
import 'swiper/css';
import { BsEmojiNeutral } from 'react-icons/bs';
import mockup from '../../public/mockup.jpg';
import { MdOutlineSubdirectoryArrowRight } from 'react-icons/md';
import { GiCheckMark } from 'react-icons/gi';

import { FaArrowRight, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/authContext';
import { getAllQuestions } from '../api/admin.js';
import { Button, Divider, Image } from '@nextui-org/react';
import { surveyResponsed } from '../api/surveyResponse.js';

function Encuesta() {
  const {
    question,
    valueChecked,
    setValueChecked,
    modifyQuestion,
    user,
    responseSurvey,
  } = useAuth();
  const [responses, setResponses] = useState({ surveyResponse: [] });
  const [itemQuestion, setItemQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [playEncuesta, setPlayEncuesta] = useState(false);
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  useEffect(() => {
    if (itemQuestion === 1) {
      setResponses({ surveyResponse: [] }); // Limpiar el array responses cuando llegues al slide 1
      setValueChecked(''); // Reiniciar el valor seleccionado
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
      await surveyResponsed(responses);
      navigate('/AnalysisSurvey');
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
      setValueChecked('');
      if (swiperRef.current && valueChecked !== '') {
        swiperRef.current?.slideNext();
      }
    }
  };

  const handleBefore = () => {
    setResponses((prev) => ({
      ...prev,
      surveyResponse: prev.surveyResponse.slice(0, -1),
    }));
    setValueChecked('');
    if (swiperRef.current?.swiper && valueChecked !== '') {
      swiperRef.current.swiper.slidePrev();
    }
  };
  const handlePress = () => {
    setPlayEncuesta((prev) => !prev);
  };

  return (
    <section
      className={`relative flex flex-col items-center justify-center mb-14 `}
      id="encuesta"
    >
      <h3 className=" text-4xl mt-5 font-bold font-mono text-center pt-14  pb-4 text-kenyan-copper-100 ">
        Encuesta
      </h3>
      <Divider className="w-1/2 mb-8" />
      {responseSurvey ? (
        <div className="w-max mb-10 mx-auto  rounded-full shadow-lg shadow-black relative px-2 py-16">
          <FaCheck className='absolute translate-x-1/2  text-green-500/60 left-12 -z-10 -translate-y-1/4 bottom-30' size={350}/>

          <h4 className="text-xl backdrop-blur-xl border-white/10 border-b-0 shadow-lg z-50 shadow-black text-center rounded-sm px-4 pb-1 pt-2 mx-auto w-max border  text-jade-500 ">
            Ya respondiste la encuesta
            <Divider className="mb-px  w-12 mt-1 mx-auto" />
          </h4>
          <Divider className="mb-5  h-4 mt-1 mx-auto" orientation="vertical" />
          <p className="text-md w-2/3 border z-50 border-b-0 backdrop-blur-xl border-white/10 shadow-lg shadow-black text-center mx-auto text-white/80  px-4 py-2">
            Gracias por completar la encuesta. Puedes revisar tus respuestas
            haciendo clic en el botón de abajo.
          </p>
          <NavLink to={'/AnalysisSurvey'}>
            <Button
              color="primary"
              className="mt-6 text-lg  flex items-center justify-center border backdrop-blur-xl text-cyan-800 outline-1 outline-offset-6  outline-cyan-800 hover:bg-cyan-500 hover:text-white hover:outline-offset-0   shadow-white/10 border-cyan-800  font-semibold mx-auto px-10 py-2 rounded-lg w-max"
            >
              Revisa la encuesta <IoIosArrowForward />
            </Button>
          </NavLink>
        </div>
      ) : (
        <>
          <div
            className={`${
              playEncuesta ? 'animation-in-home' : 'opacity-0'
            }   w-full justify-center flex flex-col  items-center`}
          >
            <div className="border-rainbow w-3/4 shadow-2xl shadow-black z-10 relative">
              <Swiper
                modules={[Navigation]}
                allowTouchMove={false}
                spaceBetween={55}
                className={` items-center ${
                  itemQuestion !== 0 && 'px-14 pt-1'
                } w-full rounded-xl relative   flex     bg-black`}
                slidesPerView={1}
                onSlideChange={(swiper) => setItemQuestion(swiper.activeIndex)}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
              >
                <SwiperSlide
                  className={` w-full   ${
                    itemQuestion === 0 && 'pb-20 px-20 pt-24 opacity-100'
                  } opacity-0 shadow-xl  relative  rounded-2xl  flex flex-col z-50 font-mono  start-survey`}
                >
                  <h1 className=" text-4xl shadow-black/50 w-max text-kenyan-copper-600 flex  flex-col tracking-widest  px-2 py-2   z-30 font-bold">
                    ¡Antes de empezar recuerda!
                    <span className="w-1/4 ml-4  h-px  bg-white/30 "></span>
                  </h1>
                  <p className="text-white/80   px-4 pt-2 pb-4 text-md    ">
                    Responde las preguntas correctamente y con mucha sinceridad,
                    lee las preguntas antes de responder y revisa todo antes de
                    enviar tus respuestas, muchas gracias.
                  </p>
                  <Button
                    onClick={handleStart}
                    color="primary"
                    radius="full"
                    variant="shadow"
                    size="lg"
                    endContent={<MdOutlineSubdirectoryArrowRight />}
                    className={`w-max px-10 animate-bounce relative mt-2 ml-3 py-4 z-50 border border-white/40 shadow-black  bg-kenyan-copper-700 ${
                      itemQuestion === 0 && 'swiper-button-next'
                    }  `}
                  >
                    Iniciemos
                  </Button>
                </SwiperSlide>
                {questions.map(({ question, bg, num, hover }, index) => (
                  <SwiperSlide key={num + index} className="my-auto py-10 px-4">
                    <Question
                      numQuestion={num}
                      question={question}
                      bg={bg}
                      hover={hover}
                    />
                  </SwiperSlide>
                ))}
                <SwiperSlide
                  className={`magic ${
                    itemQuestion === questions.length + 1
                      ? 'slideDownReturn h-full'
                      : 'h-px'
                  } w-full  items-center  flex-col justify-center  font-mono overflow-hidden  gap-5`}
                >
                  <div className="my-10 py-7 px-12 rounded-3xl  bg-gray-950/90 z-30 relative">
                    <h3 className="text-5xl text-center mb-2 text-kenyan-copper-500 font-bold">
                      !Hemos acabado¡
                    </h3>

                    <div className="mt-3 text-base  gap-2 border-t rounded-full  px-16 pt-6 pb-4">
                      <h4 className="font-semibold flex items-center gap-2 mb-1">
                        <BsEmojiNeutral />
                        ¿Que haran con mis respuestas?
                      </h4>
                      <p className="text-white/60">
                        La mayoria de usuarios se pregunta esto y aca te
                        responseremos esto. Tus preguntas se enviaran a una{' '}
                        <span className="text-jade-500 font-semibold">IA </span>
                        que hara un analisis sobre algunas de tus{' '}
                        <span className="text-red-500 font-semibold">
                          personalidades dañinas
                        </span>{' '}
                        y tambien te dara un porcentaje en cuan positiva o
                        negativa es, asi que no temas y{' '}
                        <span className="text-kenyan-copper-500 text-xl">
                          ¡Analicemos!
                        </span>
                        .
                      </p>
                    </div>
                    <div className="w-full items-center justify-center flex">
                      <button
                        onClick={handleEnd}
                        className={`px-6 py-3 btn flex items-center gap-2 mt-5 bg-jade-800 rounded-xl mx-auto w-max`}
                      >
                        Envia tus resultados
                        <GiCheckMark />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div
              className={` ${
                itemQuestion === 0 && playEncuesta && 'scale-x-0 opacity-0'
              }  scale-105  justify-between  opacity-100  transition-transform duration-400  w-2/5 px-5 rounded-full py-3 flex items-center  bg-black/80 mt-4`}
            >
              <Button
                onClick={handleBefore}
                disabled={itemQuestion === 1}
                className="bg-gray-800 disabled:pointer-events-none disabled:opacity-50 text-white/80 swiper-button-prev rounded-full"
                shadow
              >
                Atrás
              </Button>
              <span className="text-white font-mono text-xl bg-black px-3 py-1 rounded-lg ">
                {itemQuestion}/{questions.length + 1}
              </span>
              <Button
                onClick={handleResponse}
                disabled={valueChecked === '' || itemQuestion === 0}
                className={`bg-kenyan-copper-800 disabled:pointer-events-none disabled:opacity-50  text-white/80 rounded-full ${
                  itemQuestion !== 0 && 'swiper-button-next'
                }`}
                shadow
              >
                Siguiente
              </Button>
            </div>
          </div>
          <article
            className={` ${
              playEncuesta ? '-z-10 ' : 'z-20'
            }   absolute  p-10 top-16 items-center mx-auto rounded-xl   w-4/5 flex`}
          >
            <div
              className={`px-6 translate-x-20  py-20 ${
                playEncuesta && 'animation-out-home top-12'
              }
                items-center bg-black/50 backdrop-blur-3xl   z-30 shadow-2xl rounded-full   shadow-black font-mono  flex flex-col justify-center`}
            >
              <h3 className="text-3xl text-kenyan-copper-500">Importante</h3>
              <span className="w-1/12 h-px bg-white "></span>
              <p className="text-white/70 w-4/5 text-justify my-5">
               Recuerda que esta encuesta es analizada por una IA la cual no es 100% segura de que tus resultados sean los mas acertados, pero si te puede brindar un apoyo respecto al estado mental y emociona, por lo que despues del diagnóstico realizado por la encuesta, se recomienda la atención de un profesional.
              </p>
              <Button
                color="prmary"
                endContent={<MdOutlineSubdirectoryArrowRight />}
                className="bg-kenyan-copper-900 w-max mt-2  px-5 py-4 text-lg animate-bounce "
                onClick={handlePress}
              >
                Empecemos
              </Button>
            </div>
            <div className={` ${playEncuesta && 'animation-out-image'} `}>
              <Image
                width={2500}
                height={380}
                radius="lg"
                className={`translate-y-20 object-cover  -translate-x-20 hidden  sm:block`}
                src={landing2}
              />
            </div>
          </article>
        </>
      )}
    </section>
  );
}

export default Encuesta;
