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
      <section className='container mx-auto '>
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
        <article className=''>
          <div>
            <Button
              onClick={handleClickModal}
              startContent={<IoAddCircleOutline />}
              className=''
            >
              Añadir pregunta
            </Button>
          </div>
          <div className=''>
            <h4 className=''>
              Numero de preguntas:{" "}
              <span className=' '>{questions.length}</span>
            </h4>
            <h4 className=''>
              Usuario modificando:{" "}
              <span className=''>{userAdmin.username}</span>
            </h4>
          </div>
        </article>

        <article className='bg-black/40 items-center gap-y-10 justify-center grid grid-cols-2  p-9 rounded-2xl '>
          {questions.length !== 0 &&
            questions.map((item) => {
              return (
                <div
                  className={`px-8 ${item.bg}  relative shadow-lg shadow-black py-6 rounded-lg border-white/50 border-2`}
                  key={item._id}
                >
                  <div></div>
                  <h3 className="text-lg text-center text-white shadow-lg shadow-black bg-black/30 w-max mx-auto px-3 py-2 rounded-lg overflow-hidden text-ellipsis whitespace-nowrap">
                    <span className="font-bold">{item.num}.</span>{' '}
                    {item.question}
                  </h3>

                  <div className="flex gap-12 bg-black/30 px-4 py-3 rounded-lg mx-auto w-max">
                    <Button
                      startContent={<MdDelete />}
                      size="sm"
                      onClick={() => handleDeleteQuestion(item._id)}
                      variant="shadow"
                      className="px-10 bg-red-700 shadow-lg shadow-black"
                      shadow
                    >
                      Eliminar
                    </Button>
                    <Button
                      startContent={<FaEdit />}
                      size="sm"
                      onClick={() =>
                        handleClickModify(
                          item.num,
                          item.bg,
                          item._id,
                          item.question
                        )
                      }
                      variant="shadow"
                      className="px-10 bg-green-700 shadow-lg shadow-black"
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              );
            })}
        </article>
      </section>
    
     
      </>
  );
}

export default CrudQuestions;
