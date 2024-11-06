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
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { Divider } from '@nextui-org/react';
import { Pie, Line } from 'react-chartjs-2';
import AnalysisCard from '../components/AnalysisCard.jsx';

chartJS.register(
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function AnalysisiCards({ content }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgba(255, 255, 255, 0.87)',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.87)',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.87)',
        },
      },
    },

    elements: {
      line: {
        borderWidth: 3,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
      point: {
        radius: 5,
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 2,
        hoverRadius: 8,
        hoverBackgroundColor: 'rgba(255, 99, 132, 1)',
        hoverBorderColor: 'rgba(255, 255, 255, 1)',
      },
    },
  };

  const scoresNegative = [];
  const scoresPositive = [];
  const scoresPersonalitys = {
    Extraversión: [],
    Amabilidad: [],
    Responsabilidad: [],
    Apertura: [],
    Neuroticismo: [],
  };

  content.forEach(({ sentimentAnalysis, personalityAnalysis }) => {
    sentimentAnalysis.forEach((item) => {
      const score = Number(item.score);
      if (item.label === 'NEGATIVE') {
        if (!isNaN(score)) scoresNegative.push(score);
      } else if (item.label === 'POSITIVE') {
        if (!isNaN(score)) scoresPositive.push(score);
      }
    });

    personalityAnalysis.forEach((item) => {
      const score = Number(item.score);
      if (Object.hasOwn(scoresPersonalitys, item.label) && !isNaN(score)) {
        scoresPersonalitys[item.label].push(score);
      }
    });
  });

  return (
    <>
      <Divider className="mt-6 mb-8" />
      <div className="w-11/12  animation-card-big mx-auto border-rainbow">
        <div className="bg-black/90 rounded-lg px-10 py-8">
          <h4 className="mx-auto text-lg border-b font-semibold border-kenyan-copper-500 w-max px-3 shadow-lg shadow-white/10 py-2 rounded-lg">
            Aca Puedes ver el analisis general de tus respuestas
          </h4>
          <span className="w-px my-1 bg-white/40 h-3 mx-auto flex"></span>
          <p className="mx-auto text-white/80 w-4/5 text-md text-center border-b shadow-lg shadow-white/10 border-kenyan-copper-500/80 px-4 py-3 rounded-full">
            Recuerda que esto es generado por IA y todo puede variar, no es 100%
            seguro y los resultados deben ser tomados con pinzas. Teniendo eso
            en cuenta, revisalo.
          </p>
          <Divider className="mt-6 mb-8" />
          <div className="flex justify-center gap-6">
            <div className="w-max px-8 mr-6 shadow-lg shadow-white/10 border border-kenyan-copper-500 rounded-xl flex items-center justify-center py-4 h-[340px]">
              <Pie
                className="w-full"
                data={{
                  labels: ['Personalidad negativa', 'Personalidad Positiva'],
                  datasets: [
                    {
                      label: 'Sentiment Traits',
                      data: [
                        scoresNegative.length > 0
                          ? (
                              scoresNegative.reduce(
                                (acc, val) => acc + val,
                                0
                              ) / scoresNegative.length
                            ).toFixed(2)
                          : 0,
                        scoresPositive.length > 0
                          ? (
                              scoresPositive.reduce(
                                (acc, val) => acc + val,
                                0
                              ) / scoresPositive.length
                            ).toFixed(2)
                          : 0,
                      ],
                      backgroundColor: ['#00BFA5', '#FF6384'],
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
            <div className="w-[600px] px-8 shadow-lg shadow-white/10 border border-kenyan-copper-500 rounded-xl flex items-center justify-center h-[340px]">
              <Line
                data={{
                  labels: Object.keys(scoresPersonalitys),
                  datasets: [
                    {
                      label: 'Personality Traits',
                      data: Object.values(scoresPersonalitys).map((value) =>
                        value.length > 0
                          ? (
                              value.reduce((acc, val) => acc + val, 0) /
                              value.length
                            ).toFixed(2)
                          : 0
                      ),
                      borderColor: 'rgba(75, 192, 192, 1)',
                      backgroundColor: 'rgba(75, 192, 192, 0.2)',
                      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                      pointHoverBackgroundColor: 'rgba(255, 159, 64, 1)',
                      pointHoverRadius: 8,
                      fill: true,
                    },
                  ],
                }}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-14 gap-4 items-center justify-center">
        <Divider className="w-1/3" />
        <h4 className="w-max text-2xl text-kenyan-copper-300">
          Revisa el analisis de tus respuestas
        </h4>
        <Divider className="w-1/3" />
      </div>
      <div className="flex  rounded-3xl items-center gap-2   my-10 pl-5">
        <div className=" gap-2 animation-rigth-estadistics  shadow-lg shadow-black border border-kenyan-copper-500 px-6 py-8 rounded-3xl flex basis-1/2 flex-col">
          <h3 className="text-xl text-center  font-semibold ">
            ¿Qué Significan estos porcentajes en cada pregunta?
          </h3>
          <Divider className="" />
          <p className="text-justify text-white/70  text-base">
            Cada pregunta en el análisis de personalidad refleja un aspecto
            específico de los rasgos individuales, permitiendo obtener una
            visión detallada en distintas áreas. Los porcentajes no solo miden
            una cualidad general, sino también cómo esa cualidad se expresa en
            contextos específicos.
          </p>
        </div>
        <Divider className="w-20" />
        <Swiper
          modules={[EffectCreative]}
          grabCursor={true}
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ['100%', 0, 0],
            },
          }}
          allowTouchMove={true}
          spaceBetween={30}
          className=" mySwiper animation-left-estadistics w-full rounded-xl relative flex border-rainbow  "
        >
          <div className="w-full h-fit px-1 py-3 bg-black rounded-lg">
            {content.map(
              ({
                _id,
                personalityAnalysis,
                question,
                response,
                sentimentAnalysis,
              }) => (
                <SwiperSlide key={_id}>
                  <AnalysisCard
                    personalityAnalysis={personalityAnalysis}
                    question={question}
                    response={response}
                    sentimentAnalysis={sentimentAnalysis}
                  />
                </SwiperSlide>
              )
            )}
          </div>
        </Swiper>
      </div>
    </>
  );
}

export default AnalysisiCards;
