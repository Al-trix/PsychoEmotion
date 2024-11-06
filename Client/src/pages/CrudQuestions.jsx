import { useEffect, useState } from 'react';
import Question from '../components/Question.jsx';
import { getAllQuestions, deleteQuestion } from '../api/admin.js';
import { useAuth } from '../context/authContext.jsx';
import CreateQuestion from '../components/CreateQuestion.jsx';
import { Button } from '@nextui-org/react';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { IoAddCircleOutline } from 'react-icons/io5';

function CrudQuestions() {
  const [questions, setQuestions] = useState([]);
  const [valueQuestion, setValueQuestion] = useState({
    num: '',
    question: '',
    color: '',
    id: '',
  });
  const { modifyQuestion, modifyQuestions, userAdmin } = useAuth();

  const [isCreate, setIsCreate] = useState(false);
  const [isModify, setIsModify] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionsResult = await getAllQuestions();
        setQuestions(questionsResult.length !== 0 ? questionsResult.data : []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, [modifyQuestion]);

  const handleClickModal = () => {
    setIsCreate((prev) => !prev);
    if (isCreate) resetModal(); // Reset modal on close
  };

  const handleClickModify = (num, color, id, question) => {
    setValueQuestion({
      num,
      question,
      id,
      color,
    });
    setIsModify(true); // Activar el modo edición directamente
  };

  const resetModal = () => {
    setValueQuestion({
      num: '',
      question: '',
      color: '',
      id: '',
    });
    setIsCreate(false);
    setIsModify(false);
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
    <div
      className={`w-full mx-auto grid ${
        isModify || isCreate ? 'grid-cols-2' : ''
      } relative`}
    >
      <section className="container mx-auto w-full mt-10 mb-6 ">
        <article
          className={`flex w-3/4 ${
            isModify || isCreate ? 'flex-col text-sm gap-4 ' : ''
          } bg-black/30 px-6 rounded-lg py-4 items-center mx-auto justify-between`}
        >
          <div>
            <Button
              onClick={handleClickModal}
              startContent={<IoAddCircleOutline />}
              radius="sm"
              className="bg-jade-900 shadow-md shadow-black border border-white/30 px-6 py-2"
              variant="shadow"
            >
              Añadir pregunta
            </Button>
          </div>
          <div className="flex flex-row-reverse rounded-lg gap-4 items-center">
            <h4 className="border border-kenyan-copper-600 shadow-white/10 shadow-lg px-3 py-2 rounded-lg">
              Numero de preguntas: <span>{questions.length}</span>
            </h4>
            <h4 className="bg-kenyan-copper-800 shadow-white/10 shadow-lg px-3 py-2 rounded-lg">
              Administrador modificando:{' '}
              <span className="font-medium">{userAdmin.username}</span>
            </h4>
          </div>
        </article>
        <article className="w-full flex flex-col items-center mx-auto gap-6 justify-center px-6 py-6 rounded-2xl">
          {questions.length !== 0 &&
            questions.map(({ num, question, bg, hover, _id }) => (
              <div
                className={`w-4/5 flex ${
                  isModify || isCreate ? 'flex-col w-min' : ''
                } px-10 pb-6 bg-black/50 items-center shadow-lg shadow-black rounded-lg border-white/50 border-2`}
                key={_id}
              >
                <div className="basis-full mx-auto">
                  <Question
                    numQuestion={num}
                    question={question}
                    preview
                    bg={bg}
                    hover={hover}
                  />
                </div>
                <div
                  className={`flex bg-gray-800/50 border border-white/10 shadow-xl shadow-gray-800 h-min flex-col px-10 py-10 mt-6 gap-6 rounded-lg mx-auto ${
                    isModify || isCreate ? 'w-full' : ''
                  }`}
                >
                  <span className="w-full text-center text-kenyan-copper-200 uppercase font-bold">
                    Opciones
                  </span>
                  <div
                    className={`flex flex-col ${
                      isModify || isCreate ? 'flex-row' : ''
                    } items-center gap-3`}
                  >
                    <Button
                      startContent={<MdDelete />}
                      onClick={() => handleDeleteQuestion(_id)}
                      variant="shadow"
                      className="px-8 py-4 w-full bg-red-700 shadow-lg shadow-black"
                    >
                      Eliminar
                    </Button>
                    <Button
                      startContent={<FaEdit />}
                      onClick={() => handleClickModify(num, bg, _id, question)}
                      variant="shadow"
                      className="px-8 py-4 w-full bg-cyan-700 shadow-lg shadow-black"
                    >
                      Editar
                    </Button>
                  </div>
                </div>
              </div>
            ))}
        </article>
      </section>
      {

        isCreate ? isModify  ?  <CreateQuestion
            num={valueQuestion.num}
            id={valueQuestion.id}
            question={valueQuestion.question}
            color={valueQuestion.color}
            modify={true}
            setClose={() => setIsModify(false)}
            nums={questions}
            close={resetModal} 
          /> : <CreateQuestion nums={questions} close={handleClickModal} /> : isModify &&  <CreateQuestion
            num={valueQuestion.num}
            id={valueQuestion.id}
            question={valueQuestion.question}
            color={valueQuestion.color}
            modify={true}
            setClose={() => setIsModify(false)}
            nums={questions}
            close={resetModal} 
          /> 
        
      }
    </div>
  );
}

export default CrudQuestions;
