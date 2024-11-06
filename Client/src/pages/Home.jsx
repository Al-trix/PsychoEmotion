import Encuesta from '../components/Encuesta.jsx';
import { FaQuestion } from 'react-icons/fa6';

import TypeOfPersonalities from '../components/TypeOfPersonalities.jsx';
import landing from '../../public/landing.jpg';

import { Accordion, AccordionItem } from '@nextui-org/react';
import { Image, Button, Divider } from '@nextui-org/react';
import '../css/homeStyles.css';
import '../css/animations.css';
import { IoIosArrowDown } from 'react-icons/io';

function Home() {
  const scrollToEncuesta = () => {
    const section = document.getElementById('encuesta');
    section.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
  };
  // Se puede hacer el chequeo del user dentro del useEffect
  // Dependencia en el user

  return (
    <>
      <section className="w-full  px-10 py-12 mt-16 bg-black/30 flex items-center justify-between shadow-black shadow-2xl rounded-lg mx-auto container gap-8 ">
        <div className="basis-auto">
          <h1 className="text-4xl animation-title uppercase font-light tracking-widest">
            Bienvenido a{' '}
            <span className="text-kenyan-copper-600 aimation-title font-medium">
              psychoEmotion
            </span>
          </h1>
          <Divider className="w-48 mt-1 animation-title" />
          <p className="text-lg mt-4 text-white/60 animation-text">
            Ve al lugar de la encuesta y descubre si tu personalidad es algo
            negativo o positivo tanto para ti como para los demas, así como que
            tipo de personalidades podrian estar en tu mente.
          </p>
          <Button
            color="primary"
            onClick={scrollToEncuesta}
            variant="shadow"
            startContent={<IoIosArrowDown />}
            className="bg-kenyan-copper-700 shadow-black border  animation-btn border-black font-bold  mt-6 text-white/80 "
            size="lg"
          >
            Empecemos
          </Button>
        </div>
        <div className="basis-full relative">
          <Image
            src={landing}
            className={`shadow-xl animation-image border-2 border-white/30 shadow-black w-full blur-xs`}
            radius="sm"
            width={720}
            height={350}
          />
        </div>
      </section>
      <section className="flex flex-row-reverse  gap-10 justify-center items-center mx-auto container mb-32 mt-36">
        <div className="flex animation-cards flex-col basis-1/2 px-10 rounded-3xl py-8  shadow-black shadow-xl border-white/30 ">
          <h3 className="text-3xl tracking-widest text-kenyan-copper-400 font-medium">
            ¿Te interesa saber mas?
          </h3>
          <div className="h-px w-12 rounded-full border mt-1 bg-kenyan-copper-400/30 block mb-2"></div>

          <Accordion
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: 'auto',
                  transition: {
                    height: {
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                      duration: 0.8,
                    },
                    opacity: {
                      easings: 'ease',
                      duration: 0.8,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: 'ease',
                      duration: 0.1,
                    },
                    opacity: {
                      easings: 'ease',
                      duration: 0.1,
                    },
                  },
                },
              },
            }}
            variant="ligth"
          >
            <AccordionItem
              startContent={<FaQuestion />}
              key="1"
              aria-label="Accordion 1"
              title="Para que sirve este test?"
            >
              textsasasasaaaaaaaaaaaaaaaaaaaaaaaaa
            </AccordionItem>
            <AccordionItem
              startContent={<FaQuestion />}
              key="2"
              aria-label="Accordion 2"
              title="Por que hacerlo?"
            >
              textsasasasaaaaaaaaaaaaaaaaaaaaaaaaa
            </AccordionItem>
            <AccordionItem
              startContent={<FaQuestion />}
              key="3"
              aria-label="Accordion 3"
              title="Como se que personalidades dañinas puedo tener?"
            >
              textsasasasaaaaaaaaaaaaaaaaaaaaaaaaa
            </AccordionItem>
            <AccordionItem
              startContent={<FaQuestion />}
              key="4"
              aria-label="Accordion 4"
              title="Este test sirve para entender mis emociones?"
            ></AccordionItem>
          </Accordion>
        </div>
        <div className="w-px animation-cards rounded-lg  block border h-72 bg-white"></div>
        <div className="basis-1/2 animation-cards ">
          <h4 className="text-3xl text-kenyan-copper-100 ">
            ¿Que es una personalidad dañina?
          </h4>
          <div className="h-px w-16 rounded-full border mt-1 bg-kenyan-copper-400/30 block mb-2"></div>

          <p className=" text-white/50 text-lg text-justify">
            Una personalidad dañina es un patrón persistente de pensamientos,
            sentimientos y comportamientos que impactan negativamente el
            bienestar de la persona y quienes la rodean. Se distingue por
            mantener rasgos o hábitos perjudiciales para la tranquilidad mental,
            en lugar de ser explosiones emocionales ocasionales.
          </p>
        </div>
      </section>
      <TypeOfPersonalities />
      <Encuesta />
    </>
  );
}

export default Home;
