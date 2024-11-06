import { useRef, useState, useEffect } from 'react';
import { Select, SelectItem, Button, Input, Tooltip } from '@nextui-org/react';
import { FaSortNumericUp } from 'react-icons/fa';
import {
  IoIosColorPalette,
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosWarning,
} from 'react-icons/io';
import { TiPen } from 'react-icons/ti';

import { FaClipboardQuestion } from 'react-icons/fa6';
import { FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { Swiper, SwiperSlide } from 'swiper/react';
import ErrorAlert from './ErrorAlert.jsx';
import { useForm } from 'react-hook-form';
import { createQuestion, updateQuestion } from '../api/admin.js';
import 'swiper/css';
import '../css/index.min.css';
import { useAuth } from '../context/authContext.jsx';

function CreateQuestion({
  close,
  nums,
  modify = false,
  num = null,
  question = null,
  color = null,
  id = null,
  setClose = undefined,
}) {
  const [itemInput, setItemInput] = useState(0);
  const [numsError, setNumsError] = useState([]);
  const nummsExist = nums.map((item) => item.num);
  const swiperRef = useRef(null);
  const { modifyQuestions } = useAuth();
  // Crear referencia para el Swiper
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  useEffect(() => {
    if (modify) {
      reset({
        num: num || '',
        question: question || '',
        bg: color || '',
      });
    } else {
      reset({
        num: '',
        question: '',
        bg: '',
      });
    }
  }, [modify, num, question, color, reset]);

  useEffect(() => {
    const numInput = watch('num');
    setNumsError(nummsExist.filter((item) => parseInt(item) === numInput));
  }, [watch('num')]);

  let colorsQuestion = [
    // Default Tailwind CSS colors
    { bg: 'bg-slate-800', hover: 'hover:bg-slate-700' },
    { bg: 'bg-gray-800', hover: 'hover:bg-gray-700' },
    { bg: 'bg-zinc-800', hover: 'hover:bg-zinc-700' },
    { bg: 'bg-neutral-800', hover: 'hover:bg-neutral-700' },
    { bg: 'bg-stone-800', hover: 'hover:bg-stone-700' },
    { bg: 'bg-red-800', hover: 'hover:bg-red-700' },
    { bg: 'bg-orange-800', hover: 'hover:bg-orange-700' },
    { bg: 'bg-amber-800', hover: 'hover:bg-amber-700' },
    { bg: 'bg-yellow-800', hover: 'hover:bg-yellow-700' },
    { bg: 'bg-lime-800', hover: 'hover:bg-lime-700' },
    { bg: 'bg-green-800', hover: 'hover:bg-green-700' },
    { bg: 'bg-emerald-800', hover: 'hover:bg-emerald-700' },
    { bg: 'bg-teal-800', hover: 'hover:bg-teal-700' },
    { bg: 'bg-cyan-800', hover: 'hover:bg-cyan-700' },
    { bg: 'bg-sky-800', hover: 'hover:bg-sky-700' },
    { bg: 'bg-blue-800', hover: 'hover:bg-blue-700' },
    { bg: 'bg-indigo-800', hover: 'hover:bg-indigo-700' },
    { bg: 'bg-violet-800', hover: 'hover:bg-violet-700' },
    { bg: 'bg-purple-800', hover: 'hover:bg-purple-700' },
    { bg: 'bg-fuchsia-800', hover: 'hover:bg-fuchsia-700' },
    { bg: 'bg-pink-800', hover: 'hover:bg-pink-700' },
    { bg: 'bg-rose-800', hover: 'hover:bg-rose-700' }, // Mantén solo una entrada
    // Custom colors you provided
    { bg: 'bg-ming-800', hover: 'hover:bg-ming-700' },
    { bg: 'bg-green-leaf-800', hover: 'hover:bg-green-leaf-700' },
    { bg: 'bg-saratoga-800', hover: 'hover:bg-saratoga-700' },
    { bg: 'bg-claret-800', hover: 'hover:bg-claret-700' },
    { bg: 'bg-jade-800', hover: 'hover:bg-jade-700' },
    { bg: 'bg-blaze-orange-800', hover: 'hover:bg-blaze-orange-700' },
    { bg: 'bg-electric-violet-800', hover: 'hover:bg-electric-violet-700' },
    { bg: 'bg-scarlet-800', hover: 'hover:bg-scarlet-700' },
    { bg: 'bg-blue-gem-800', hover: 'hover:bg-blue-gem-700' },
    { bg: 'bg-kenyan-copper-800', hover: 'hover:bg-kenyan-copper-700' },
  ];

  const handleClose = () => {
    setClose(false);
  };

  
  console.log(watch());
  
  const onSubmit = handleSubmit(async (data) => {
    const hoverColor = colorsQuestion.filter(
      (item) => item.hover.split('-')[1] === data.bg.split('-')[1]
    );
    try {
      if (modify) {
        await updateQuestion(id, {
          ...data,
          hover: hoverColor[0].hover,
        });
        modifyQuestions((prev) => !prev);
        setClose(false);

        return;
      }
      await createQuestion({
        ...data,
        hover: hoverColor[0].hover,
      });
      modifyQuestions((prev) => !prev);
      close();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <article className="bg-black h-min w-3/4 mx-auto sticky top-24  px-6 py-8 border-4 outline-kenyan-copper-900 border-white/30 rounded-3xl shadow-2xl shadow-black mt-28">
        <IoMdClose
          onClick={setClose ? handleClose : close}
          size={30}
          className=""
        />
        <form className="" onSubmit={onSubmit}>
          <h2 className="text-2xl text-center uppercase text-kenyan-copper-600 font-semibold">
            Registra una nueva pregunta
            <span className="mx-auto w-20 relative h-px bg-kenyan-copper-100 flex"></span>
          </h2>
          <h5 className="text-xs text-white/40 mb-2 text-center mt-4">
            Recuerda que la pregunta debe buscar una personalidad dañina
          </h5>
          <span className=" w-3/5 mx-auto relative h-px  bg-kenyan-copper-100/70 flex"></span>
          <Swiper
            ref={swiperRef} // Asignar la referencia aquí
            spaceBetween={50}
            slidesPerView={1}
            className={`gap-5 items-center 
                justify-center mt-4 mb-6 rounded-2xl  w-11/12  relative  px-12 pt-6 pb-5 flex shadow-2xl border-b border-kenyan-copper-300/80`}
            onSlideChange={(swiper) => setItemInput(swiper.activeIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {errors?.num ||
              errors?.question ||
              (errors?.color && (
                <span className="absolute left-2 flex px-2 text-sm animate-bounce py-1 border border-red-600 text-red-600 rounded-full  top-2">
                  <IoIosArrowBack />
                  <IoIosWarning />
                </span>
              ))}
            <SwiperSlide className="w-full   ">
              <Tooltip
                offset={12}
                placement=""
                showArrow={true}
                content={
                  <div className="px-1 py-2 bg-transparent">
                    <div className="text-small font-bold text-kenyan-copper-600 flex items-center gap-1">
                      <TiPen />
                      ¿Numero de que?
                    </div>
                    <div className="text-tiny text-white/60">
                      Aca va el numero de la pregunta el cual <br /> no debe
                      repetirse y claro, seguir el orden.
                    </div>
                  </div>
                }
              >
                <div>
                  <Input
                    type="text"
                    label="Numero"
                    placeholder="Escribe el numero de la pregunta"
                    variant="underlined"
                    startContent={<FaSortNumericUp />}
                    className="h-full    mx-auto"
                    {...register('num', {
                      required: {
                        value: true,
                        message: 'El numero de la pregunta es requerido',
                      },
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: 'El número debe ser mayor o igual a 1',
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: 'Debe ser un número válido',
                      },
                      minLength: {
                        value: 1,
                        message: 'El numero debe tener al menos 1 caracteres',
                      },
                      maxLength: {
                        value: 2,
                        message: 'El numero debe tener maximo  caracteres',
                      },
                    })}
                  />
                </div>
              </Tooltip>
              <ErrorAlert typeError={numsError.length !== 0 && !modify}>
                El numero {numsError[0]} Ya esta disponible en las preguntas
              </ErrorAlert>
              <ErrorAlert typeError={errors?.num}>
                {errors?.num?.message}
              </ErrorAlert>
            </SwiperSlide>
            <SwiperSlide className="relative w-full">
              <Tooltip
                offset={12}
                placement="bottom"
                showArrow={true}
                content={
                  <div className="px-1 py-2 bg-transparent">
                    <div className="text-small font-bold text-kenyan-copper-600 flex items-center gap-1">
                      <TiPen />
                      ¿Pregunta de que?
                    </div>
                    <div className="text-tiny text-white/60">
                      Aca va la pregunta que buscara las <br />
                      personalidades dañinas de los usuarios.
                    </div>
                  </div>
                }
              >
                <div>
                  <Input
                    type="text"
                    placeholder="Escribe la pregunta"
                    startContent={<FaClipboardQuestion />}
                    label="Pregunta"
                    variant="underlined"
                    color={errors.question && 'danger'}
                    className={`h-full mx-auto ${
                      errors?.question && 'border-red-600'
                    }`}
                    {...register('question', {
                      required: {
                        value: true,
                        message: 'La pregunta es requerida',
                      },
                      minLength: {
                        value: 15,
                        message: 'La pregunta es muy corta',
                      },
                      maxLength: {
                        value: 200,
                        message: 'La pregunta es muy larga',
                      },
                    })}
                  />
                </div>
              </Tooltip>
              <ErrorAlert typeError={errors?.question}>
                {errors?.question?.message}
              </ErrorAlert>
            </SwiperSlide>
            <SwiperSlide className="w-full flex flex-col  gap-6 ">
              <Tooltip
                placement="bottom"
                showArrow={true}
                content={
                  <div className="px-1 py-2 bg-transparent">
                    <div className="text-small font-bold text-kenyan-copper-600 flex items-center gap-1">
                      <TiPen />
                      ¿Color de que?
                    </div>
                    <div className="text-tiny text-white/60">
                      Aca va el color de la pregunta el cual denota la
                      <br />
                      emoción que esta pregunta genera en el usuario.
                    </div>
                  </div>
                }
              >
                <div>
                  <Select
                    startContent={<IoIosColorPalette />}
                    className="items-center  h-full"
                    variant="underlined"
                    label="Color"
                    placeholder="Elije el color de la pregunta"
                    defaultSelectedKeys={[color]}
                    {...register('bg', {
                      required: {
                        value: true,
                        message: 'El color es requerido',
                      },
                    })}
                  >
                    {colorsQuestion.map(({ bg }) => {
                      return (
                        <SelectItem
                          key={bg}
                          className={`py-2`}
                          startContent={
                            <span
                              className={`w-5 h-5 relative flex rounded-full ${bg} `}
                            ></span>
                          }
                        >
                          {bg.split('-')[1]}
                        </SelectItem>
                      );
                    })}
                  </Select>
                </div>
              </Tooltip>
            </SwiperSlide>
          </Swiper>

          <div className="flex justify-between items-center">
            <Button
              startContent={<IoIosArrowBack />}
              isDisabled={itemInput === 0}
              onClick={() => swiperRef.current.slidePrev()} // Ir al slide anterior
              className=" px-4 py-4  shadow-black border border-white/30 bg-red-700"
              variant="shadow"
              radius="sm"
              size="sm"
            >
              Atrás
            </Button>
            <span className=" w-1/2 mx-auto relative h-px  bg-kenyan-copper-800/70 flex"></span>

            {itemInput === 2 ? (
              <Button
                endContent={<FaCheck />}
                type="button"
                onClick={onSubmit}
                isDisabled={!watch('bg')}
                variant="shadow"
                className=" bg-emerald-800 px-4 py-4  shadow-black border border-white/30   rounded-lg  w-18"
              >
                Enviar
              </Button>
            ) : (
              <Button
                endContent={<IoIosArrowForward />}
                isDisabled={
                  (itemInput === 0 && isNaN(watch('num'))) ||
                  (itemInput === 1 && watch('question') === '') ||
                  (numsError.length !== 0 && !modify)
                }
                onClick={() => swiperRef.current.slideNext()}
                className="px-4 py-4  shadow-black border border-white/30 bg-cyan-700"
                size="sm" // Ir al siguiente slide
              >
                Siguiente
              </Button>
            )}
          </div>
        </form>
      </article>
    </>
  );
}

export default CreateQuestion;
