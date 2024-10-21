import React, { useEffect, useState } from "react";
import { getAllQuestions, deleteQuestion } from "../api/admin.js";
import { useAuth } from "../context/authContext.jsx";
import CreateQuestion from "../components/CreateQuestion.jsx";
import { Button } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import { IoAddCircleOutline } from "react-icons/io5";
function CrudQuestions() {
  const [questions, setQuestions] = useState([]);
  const [valueQuestion, setValueQuestion] = useState({
    num: "",
    question: "",
    color: "",
    id: "",
  });
  const { modifyQuestion, modifyQuestions } = useAuth();

  const [isCreate, setIsCreate] = useState(false);
  const [isModify, setIsModify] = useState(false);
  const { userAdmin } = useAuth();
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

  const handleClickModal = () => {
    setIsCreate((prev) => !prev);
  };

  const handleClickModify = (num, color, id, question) => {
    setValueQuestion({
      num,
      question,
      id,
      color,
    });
    setIsModify((prev) => !prev);
  };
  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion(id);
      modifyQuestions((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className='relative font-mono  container mx-auto w-full bg-black/20 my-4 py-5 rounded-lg px-10'>
        {isCreate && (
          <CreateQuestion nums={questions}  close={handleClickModal} />
        )}
        {isModify && (
          <CreateQuestion
            num={valueQuestion.num}
            id={valueQuestion.id}
            question={valueQuestion.question}
            color={valueQuestion.color}
            modify={isModify}

            setClose={setIsModify}
            nums={questions}
            close={handleClickModal}
          />
        )}
        <article className='flex justify-between mt-2'>
          <div>
            <Button
              onClick={handleClickModal}
              startContent={<IoAddCircleOutline />}
              className=' rounded-lg bg-emerald-800'
            >
              Añadir pregunta
            </Button>
          </div>
          <div className='flex gap-4 items-center'>
            <h4 className='bg-kenyan-copper-950 text-white/80 text-sm px-3 py-2 rounded-lg'>
              Numero de preguntas:{" "}
              <span className='text-white '>{questions.length}</span>
            </h4>
            <h4 className='bg-kenyan-copper-950 text-white/80 text-sm px-3 py-2 rounded-lg'>
              Usuario modificando:{" "}
              <span className='text-white uppercase'>{userAdmin.username}</span>
            </h4>
          </div>
        </article>

        <article className='flex flex-col gap-5 mt-6'>
          {questions.length !== 0 &&
            questions.map((item) => {
              return (
                <div
                  className={` w-full flex gap-6 items-center justify-between rounded-lg  px-6 py-4`}
                  key={item._id}
                >
                  <h3 className=' border-r-1 pr-5 rounded-sm'>
                    <span>{item.num}.</span> {item.question}
                  </h3>
                  <span
                    className={` w-10 h-10 ${
                      item.bg ? item.bg : "bg-slate-800"
                    }  ${
                      item.hover ? item.hover : "hover:bg-slate-600"
                    } flex border rounded-full `}
                  ></span>
                  <div className='flex gap-4'>
                    <Button
                      startContent={<MdDelete />}
                      size='sm'
                      onClick={() => handleDeleteQuestion(item._id)}
                      variant='shadow'
                      className='shadow-red-800/20 text-sm  bg-red-800'
                      shadow
                    >
                      Eliminar
                    </Button>
                    <Button
                      startContent={<FaEdit />}
                      size='sm'
                      onClick={() => handleClickModify(item.num, item.bg, item._id, item.question)}
                      variant='shadow'
                      className='shadow-cyan-800/20 text-sm bg-cyan-800'
                      shadow
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              );
            })}
        </article>
      </section>
      {isCreate && (
        <div
          onClick={handleClickModal}
          className='w-full h-screen  bg-black/80 fixed top-0 z-40'
        ></div>
      )}
      {isModify && (
        <div
          onClick={handleClickModal}
          className='w-full h-screen  bg-black/80 fixed top-0 z-40'
        ></div>
      )}
     
      </>
  );
}

export default CrudQuestions;
