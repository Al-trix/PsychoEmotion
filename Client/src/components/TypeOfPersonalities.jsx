import React, { createElement } from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import {
  FaLightbulb,
  FaClipboardCheck,
  FaSmile,
  FaHandshake,
  FaExclamationTriangle,
  FaSadCry,
} from 'react-icons/fa';
import '../css/homeStyles.css';

export default function TypeOfPersonalities() {
  const iconMap = {
    FaLightbulb,
    FaClipboardCheck,
    FaSmile,
    FaHandshake,
    FaExclamationTriangle,
    FaSadCry,
  };

  const personalidades = [
    {
      nombre: 'Apertura',
      descripcion: 'Tendencia a ser receptivo a nuevas ideas y experiencias.',
      color: 'bg-blue-400', // Color azul claro para representar apertura y creatividad
      shadow: 'shadow-blue-400',
      icono: 'FaLightbulb',
    },
    {
      nombre: 'Responsabilidad',
      descripcion:
        'Muestra un alto nivel de autodisciplina y cumplimiento de deberes.',
      color: 'bg-green-500', // Color verde que representa responsabilidad y crecimiento
      shadow: 'shadow-green-500',
      icono: 'FaClipboardCheck',
    },
    {
      nombre: 'Extraversión',
      descripcion:
        'Tendencia a ser sociable y a buscar la atención de los demás.',
      color: 'bg-yellow-500', // Color amarillo para simbolizar energía y sociabilidad
      shadow: 'shadow-yellow-500',
      icono: 'FaSmile',
    },
    {
      nombre: 'Amabilidad',
      descripcion: 'Tendencia a ser compasivo y cooperativo con los demás.',
      color: 'bg-teal-400', // Color teal que refleja empatía y apoyo
      shadow: 'shadow-teal-400',
      icono: 'FaHandshake',
    },
    {
      nombre: 'Neuroticismo',
      descripcion:
        'Tendencia a experimentar emociones negativas como ansiedad y tristeza.',
      color: 'bg-red-600', // Color rojo que puede simbolizar estrés y emociones intensas
      shadow: 'shadow-red-600',
      icono: 'FaExclamationTriangle',
    },
    {
      nombre: 'Pesimista',
      descripcion: 'Tiende a ver el lado negativo de las situaciones.',
      color: 'bg-indigo-900', // Color oscuro para representar pesimismo y seriedad
      shadow: 'shadow-indigo-900',
      icono: 'FaSadCry',
    },
  ];

  return (
    <section className="w-full bg-black/40 pb-20 font-mono ov">
      <h3 className="text-4xl font-medium text-center pt-14 pb-7 text-kenyan-copper-100">
        Conoce algunas personalidades
      </h3>
      <div className="container border-t border-b pt-6 pb-10 mx-auto w-4/5 rounded-lg px-5 gap-y-10 gap-x-8 grid grid-cols-1 sm:grid-cols-3">
        {personalidades.map(
          ({ nombre, descripcion, color, icono }, index) => (
            <Card
              shadow="sm"
              radius="full"
              key={index}
              className={`shadow-xl shadow-black  animation-card animation-card${index+1} rounded-xl `}
            >
              <CardBody
                className={`overflow-visible pb-16 relative ${color} rounded-t-xl flex items-center justify-center mb-3`}
              >
                <span className="absolute -bottom-5 bg-inherit rounded-full p-3 text-4xl">
                  {createElement(iconMap[icono])}
                </span>
              </CardBody>
              <CardFooter className="text-small rounded-b-xl py-6 bg-transparent flex text-left flex-col">
                <h4 className="text-xl text-center font-medium text-kenyan-copper-100">
                  {nombre}
                </h4>
                <p className="text-kenyan-copper-100/60 text-center text-sm">
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
