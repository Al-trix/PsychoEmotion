import React, { useRef, useState, useEffect } from "react";
import {
  Select,
  SelectItem,
  Button,
  Input,
  commonColors,
} from "@nextui-org/react";
import { IoMdClose } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import ErrorAlert from "./ErrorAlert.jsx";
import { useForm } from "react-hook-form";
import { createQuestion, updateQuestion } from "../api/admin.js";
import "swiper/css";
import "../css/index.min.css";
import { useAuth } from "../context/authContext.jsx";

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
  } = useForm();
  useEffect(() => {
    const numInput = watch("num");
    setNumsError(nummsExist.filter((item) => parseInt(item) === numInput));
  }, [watch("num")]);

  let colorsQuestion = [
    // Default Tailwind CSS colors
    { bg: "bg-slate-800", hover: "hover:bg-slate-700" },
    { bg: "bg-gray-800", hover: "hover:bg-gray-700" },
    { bg: "bg-zinc-800", hover: "hover:bg-zinc-700" },
    { bg: "bg-neutral-800", hover: "hover:bg-neutral-700" },
    { bg: "bg-stone-800", hover: "hover:bg-stone-700" },
    { bg: "bg-red-800", hover: "hover:bg-red-700" },
    { bg: "bg-orange-800", hover: "hover:bg-orange-700" },
    { bg: "bg-amber-800", hover: "hover:bg-amber-700" },
    { bg: "bg-yellow-800", hover: "hover:bg-yellow-700" },
    { bg: "bg-lime-800", hover: "hover:bg-lime-700" },
    { bg: "bg-green-800", hover: "hover:bg-green-700" },
    { bg: "bg-emerald-800", hover: "hover:bg-emerald-700" },
    { bg: "bg-teal-800", hover: "hover:bg-teal-700" },
    { bg: "bg-cyan-800", hover: "hover:bg-cyan-700" },
    { bg: "bg-sky-800", hover: "hover:bg-sky-700" },
    { bg: "bg-blue-800", hover: "hover:bg-blue-700" },
    { bg: "bg-indigo-800", hover: "hover:bg-indigo-700" },
    { bg: "bg-violet-800", hover: "hover:bg-violet-700" },
    { bg: "bg-purple-800", hover: "hover:bg-purple-700" },
    { bg: "bg-fuchsia-800", hover: "hover:bg-fuchsia-700" },
    { bg: "bg-pink-800", hover: "hover:bg-pink-700" },
    { bg: "bg-rose-800", hover: "hover:bg-rose-700" }, // Mantén solo una entrada
    // Custom colors you provided
    { bg: "bg-ming-800", hover: "hover:bg-ming-700" },
    { bg: "bg-green-leaf-800", hover: "hover:bg-green-leaf-700" },
    { bg: "bg-saratoga-800", hover: "hover:bg-saratoga-700" },
    { bg: "bg-claret-800", hover: "hover:bg-claret-700" },
    { bg: "bg-jade-800", hover: "hover:bg-jade-700" },
    { bg: "bg-blaze-orange-800", hover: "hover:bg-blaze-orange-700" },
    { bg: "bg-electric-violet-800", hover: "hover:bg-electric-violet-700" },
    { bg: "bg-scarlet-800", hover: "hover:bg-scarlet-700" },
    { bg: "bg-blue-gem-800", hover: "hover:bg-blue-gem-700" },
    { bg: "bg-kenyan-copper-800", hover: "hover:bg-kenyan-copper-700" },
  ];

  const handleClose = () => {
    setClose(false)
  }

  const onSubmit = handleSubmit(async (data) => {
    const hoverColor = colorsQuestion.filter(
      (item) => item.hover.split("-")[1] === data.bg.split("-")[1]
    );
    try {
      if (modify) {
        await updateQuestion(id, {
          ...data,
          hover: hoverColor[0].hover,
        });
        modifyQuestions((prev) => !prev);
        setClose(false)

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
      <article className="">
        <IoMdClose
          onClick={setClose ? handleClose : close}
          size={30}
          className=''
        />
        <form onSubmit={onSubmit}>
          <h2 className=''>
            Crea tu pregunta
          </h2>
          <span className=' w-14 -translate-x-1/2 left-1/2 relative my-3 h-px bg-kenyan-copper-100 flex'></span>
          <Swiper
            ref={swiperRef} // Asignar la referencia aquí
            spaceBetween={50}
            slidesPerView={1}
            className={`gap-5 items-center w-4/5  flex shadow-2xl bg-black/60`}
            onSlideChange={(swiper) => setItemInput(swiper.activeIndex)}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            <SwiperSlide className='w-full'>
              <Input
                type='text'
                label='Numero'
                variant='underlined'
                defaultValue={modify ? num : ""}
                className='h-full '
                {...register("num", {
                  required: {
                    value: true,
                    message: "El numero de la pregunta es requerido",
                  },
                  valueAsNumber: true,
                  min: {
                    value: 1,
                    message: "El número debe ser mayor o igual a 1",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Debe ser un número válido",
                  },
                  minLength: {
                    value: 1,
                    message: "El numero debe tener al menos 1 caracteres",
                  },
                  maxLength: {
                    value: 2,
                    message: "El numero debe tener maximo  caracteres",
                  },
                })}
              />
              <ErrorAlert typeError={numsError.length !== 0 }>
                El numero {numsError[0]} Ya esta disponible en las preguntas
              </ErrorAlert>
              <ErrorAlert typeError={errors?.num}>
                {errors?.num?.message}
              </ErrorAlert>
            </SwiperSlide>
            <SwiperSlide className='w-full'>
              <Input
                type='text'
                defaultValue={modify ? question : ""}
                label='Escribe la pregunta'
                variant='underlined'
                color={errors.question && "danger"}
                className={`h-full ${errors.question && "border-red-600"}`}
                {...register("question", {
                  required: {
                    value: true,
                    message: "La pregunta es requerida",
                  },
                  minLength: {
                    value: 15,
                    message: "La pregunta es muy corta",
                  },
                  maxLength: {
                    value: 200,
                    message: "La pregunta es muy larga",
                  },
                })}
              />
              <ErrorAlert typeError={errors?.question}>
                {errors?.question?.message}
              </ErrorAlert>
            </SwiperSlide>
            <SwiperSlide className='w-full flex flex-col  gap-6 '>
              <Select
                className='items-center h-full'
                variant='underlined'
                label='Selecciona el color de la pregunta'
                defaultSelectedKeys={[color]}
                {...register("bg", {
                  required: {
                    value: true,
                    message: "El color es requerido",
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
                      {bg.split("-")[1]}
                    </SelectItem>
                  );
                })}
              </Select>

              {itemInput === 2 && (
                <div className='flex  w-full mx-auto items-center justify-between '>
                  <Button
                    onClick={() => swiperRef.current.slidePrev()} // Ir al slide anterior
                    className=' bg-red-900'
                    size='sm'
                  >
                    Atrás
                  </Button>
                  <Button
                    size='sm'
                    isDisabled={itemInput === 2 && watch("bg") === ""}
                    type='submit'
                    variant='shadow'
                    className=' bg-emerald-600  rounded-lg  w-18'
                  >
                    Enviar
                  </Button>
                </div>
              )}
            </SwiperSlide>
          </Swiper>
          {itemInput !== 2 && (
            <div className=''>
              <Button
                isDisabled={itemInput === 0}
                onClick={() => swiperRef.current.slidePrev()} // Ir al slide anterior
                className=''

                size='sm'
              >
                Atrás
              </Button>
              <Button
                isDisabled={
                  (itemInput === 0 && isNaN(watch("num"))) ||
                  (itemInput === 1 && watch("question") === "")
                }
                onClick={() => swiperRef.current.slideNext()}
                className=''
                size='sm' // Ir al siguiente slide
              >
                Siguiente
              </Button>
            </div>
          )}
        </form>
      </article>
    </>
  );
}

export default CreateQuestion;
