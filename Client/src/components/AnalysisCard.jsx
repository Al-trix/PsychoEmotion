import {
  Chart as chartJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js/auto';
import {Divider} from '@nextui-org/react'
import { Doughnut, Bar } from 'react-chartjs-2';
import { FaQuestion } from 'react-icons/fa';
import { PiNotepad } from 'react-icons/pi';

chartJS.register(
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);


function AnalysisCard({
  question,
  response,
  sentimentAnalysis,
  personalityAnalysis,
  options,
}) {

   // Colores fijos para la gráfica de Bar
  const personalityColors = [
    '#4BC0C0', // Jade
    '#FF9F40',
    '#FF6384',
    '#36A2EB',
    '#9966FF',
  ];

  return (
    <article className="p-4 bg-gray-950/95 m-1 items-center backdrop-blur-2xl rounded-lg shadow-md">
      <h4 className="text-xl font-bold">Pregunta #{question.split('.')[0]}</h4>
      <Divider className="my-2" />
      <div className="mb-4">
        <h3 className="text-center gap-1 flex items-center  mx-auto w-max px-4 py-1 border-b-2  border-gray-800 rounded-full shadow-black shadow-2xl ">
          <FaQuestion
            size={20}
            className=" border p-1 rounded-full border-white/80"
          />
          <Divider className="w-3" />
          {question}
          </h3>
          <Divider className="h-4 mx-auto" orientation="vertical" />
          <h3 className="text-center gap-2 flex items-center  mx-auto w-max px-4 py-1 border-b-2  border-gray-800 rounded-full shadow-black shadow-2xl">
          <PiNotepad
          size={25}
          className=" border p-1 rounded-full border-white/80"
          />
          <Divider className="w-2" />

          {response}
        </h3>
      </div>
      <div className="flex gap-4 px-10 items-center justify-center">
        <div className="h-[300px] w-min border-2 border-white/20 px-4 py-4 rounded-3xl shadow-2xl shadow-black  flex items-center justify-center">
          <Doughnut
            className="rounded-lg"
            data={{
              labels: sentimentAnalysis.map((item) => item.label || ''),
              datasets: [
                {
                  data: sentimentAnalysis.map(
                    (value) => parseFloat(value.score) || 0
                  ),
                  backgroundColor: ['#00BFA5', '#FF6384'], // Se usa el array generado
                  hoverOffset: 4,
                },
              ],
            }}
            options={{
              ...options,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    color: 'rgba(255, 255, 255, 0.87)', // Color de las etiquetas
                  },
                },
              },
              elements: {
                arc: {
                  borderWidth: 2,
                  borderColor: 'black', // Color del borde
                },
              },
            }}
          />
        </div>
        <div className="h-[300px] w-min border-2 border-white/20 px-4 py-4 rounded-3xl shadow-2xl shadow-black  flex items-center justify-center">
          <Bar
            className="rounded-lg"
            data={{
              labels: personalityAnalysis.map((item) => item.label),
              datasets: [
                {
                  label: 'Tipos de personalidades',
                  data: personalityAnalysis.map((value) => value.score),
                  backgroundColor: personalityColors,
                  borderColor: 'white', // Color de las líneas
                  borderWidth: 2, // Grosor de las líneas
                  hoverBackgroundColor: personalityColors.map(
                    (color) => color + '80'
                  ), // Colores al pasar el ratón
                },
              ],
            }}
            options={{
              ...options,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                  labels: {
                    color: 'rgba(255, 255, 255, 0.87)', // Color de las etiquetas
                  },
                },
              },
              scales: {
                y: {
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Color de las líneas de la cuadrícula
                  },
                },
                x: {
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)', // Color de las líneas de la cuadrícula
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </article>
  );
}

export default AnalysisCard;
