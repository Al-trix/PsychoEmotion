import React, {createElement} from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { FaHandPointRight } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import { FaGavel } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaSadTear } from "react-icons/fa";
import { FaCloudRain } from "react-icons/fa";
import '../css/homeStyles.css'


export default function App() {
  const iconMap = {
    FaHandPointRight,
    FaCrown,
    FaGavel,
    FaComments,
    FaSadTear,
    FaCloudRain,
  };
 const personalidades = [
   {
     nombre: "Manipulador/a",
     descripcion: "Controla a otros para su beneficio.",
     color: "bg-red-600", // Representando un comportamiento dañino
     shadow: "shadow-red-600",
     icono: "FaHandPointRight",
   },
   {
     nombre: "Narcisista",
     descripcion: "Se cree superior y carece de empatía.",
     color: "bg-yellow-500", // Asociado con el ego y la importancia propia
     shadow: "shadow-yellow-500",
     icono: "FaCrown",
   },
   {
     nombre: "Criticón/a",
     descripcion: "Juzga negativamente sin aportar.",
     color: "bg-gray-700", // Color neutral, representando crítica y juicio
     shadow: "shadow-gray-700",
     icono: "FaGavel",
   },
   {
     nombre: "Chismoso/a",
     descripcion: "Difunde rumores malintencionados.",
     color: "bg-green-600", // Un color verde para simbolizar la envidia o los chismes
     shadow: "shadow-green-600",
     icono: "FaComments",
   },
   {
     nombre: "Victimista",
     descripcion: "Se presenta siempre como víctima.",
     color: "bg-blue-500", // Azul, representando tristeza o victimización
     shadow: "shadow-blue-500",
     icono: "FaSadTear",
   },
   {
     nombre: "Pesimista",
     descripcion: "Ve siempre el lado negativo de las cosas.",
     color: "bg-indigo-900", // Un color oscuro para representar el pesimismo
     shadow: "shadow-indigo-900",
     icono: "FaCloudRain",
   },
 ];


  return (
    <section className='w-full bg-black/40 pb-20 font-mono ov'>
      <h3 className='text-4xl font-medium text-center pt-14 pb-7 text-kenyan-copper-100 '>
        Conoce algunas personalidades dañinas
      </h3>
      <div className='container border-t  border-b pt-6 pb-10 mx-auto w-4/5 rounded-lg px-5 gap-y-10 gap-x-8 grid grid-cols-1 sm:grid-cols-3'>
        {personalidades.map(
          ({ nombre, descripcion, color, icono, shadow }, index) => (
            <Card
              shadow='sm'
              radius='full'
              key={index}
              className={`shadow-xl shadow-black transition-card hover:translate-y-4 rounded-xl tr`}
              
            >
              <CardBody
                className={`overflow-visible pb-16 relative ${color}  rounded-t-xl flex items-center justify-center mb-3`}
              >
                <span className='absolute -bottom-5 bg-inherit  rounded-full p-3  text-4xl '>
                  {createElement(iconMap[icono])}
                </span>
              </CardBody>
              <CardFooter className='text-small rounded-b-xl py-6 bg-transparent  flex text-left flex-col'>
                <h4 className='text-xl text-center  font-medium text-kenyan-copper-100'>
                  {nombre}
                </h4>
                <p className=' text-kenyan-copper-100/60 text-center text-sm'>
                  {descripcion}
                </p>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
}
