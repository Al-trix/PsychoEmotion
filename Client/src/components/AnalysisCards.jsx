import React from "react";
import {
  Chart as chartJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js/auto";
import { Doughnut, Bar, Pie, Line } from "react-chartjs-2";

chartJS.register(
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

function AnalysisiCard({ content }) {
  const options = {
    responsive: true,
    maintainAspectRatio: true, // Cambiado a true para evitar problemas de crecimiento
  };

  const scoresNegative = [];
  const scoresPositive = [];
  const scoresPersonalitys = {
    Extraversion: [],
    Agreeableness: [],
    Conscientiousness: [],
    Openness: [],
    Neuroticism: [],
  };

  content.forEach(({ sentimentAnalysis, personalityAnalysis }) => {
    sentimentAnalysis.forEach((item) => {
      const score = Number(item.score);
      if (item.label === "NEGATIVE") {
        if (!isNaN(score)) scoresNegative.push(score);
      } else if (item.label === "POSITIVE") {
        if (!isNaN(score)) scoresPositive.push(score);
      }
    });

    personalityAnalysis.forEach((item) => {
      const score = Number(item.score);
      if (scoresPersonalitys.hasOwnProperty(item.label) && !isNaN(score)) {
        scoresPersonalitys[item.label].push(score);
      }
    });
  });

  return (
    <>
      {content.map(
        ({
          _id,
          personalityAnalysis,
          question,
          response,
          sentimentAnalysis,
        }) => (
          <article
            key={_id}
            className={`w-full h-auto grid grid-cols-2 items-center justify-center border rounded-sm px-5 py-10 gap-3`}
          >
            <div className='h-full w-full flex flex-col gap-3'>
              <h6 className='text-base text-justify'>{question}</h6>
              <span className='text-sm w-fit bg-slate-800 py-1 rounded-lg px-2'>
                {response}
              </span>
            </div>
            <div className='w-full h-[300px]'>
              {" "}
              {/* Altura fija para evitar problemas */}
              <Doughnut
                className='w-full h-full'
                data={{
                  labels: sentimentAnalysis.map((item) => item.label || ""),
                  datasets: [
                    {
                      data: sentimentAnalysis.map((value) => value.score || 0),
                    },
                  ],
                  hoverOffset: 1,
                }}
                options={options}
              />
            </div>
            <div className='col-span-2 w-full h-[300px]'>
              <Bar
                className='w-full h-full'
                data={{
                  labels: personalityAnalysis.map((item) => item.label),
                  datasets: [
                    {
                      label: "Personality Traits",
                      data: personalityAnalysis.map((value) => value.score),
                    },
                  ],
                  hoverOffset: 1,
                }}
                options={options}
              />
            </div>
          </article>
        )
      )}

      <div className=' w-full grid grid-cols-2 place-items-center justify-center row-start-2   col-span-1 lg:col-span-2 p-5 gap-5  border-3 xl:col-span-3'>
        <div className='w-full border h-full'>
          <Pie
            className='w-full h-full'
            data={{
              labels: ["Personalidad negativa", "Personalidad Positiva"],
              datasets: [
                {
                  label: "Sentiment Traits",
                  data: [
                    scoresNegative.length > 0
                      ? (
                          scoresNegative.reduce((acc, val) => acc + val, 0) /
                          scoresNegative.length
                        ).toFixed(2)
                      : 0,
                    scoresPositive.length > 0
                      ? (
                          scoresPositive.reduce((acc, val) => acc + val, 0) /
                          scoresPositive.length
                        ).toFixed(2)
                      : 0,
                  ],
                },
              ],
              hoverOffset: 1,
            }}
            options={options}
          />
        </div>
        <div className='w-full border h-full'>
        
        <Line
            className='w-full h-full'
            data={{
              labels: Object.keys(scoresPersonalitys),
              datasets: [
                {
                  label: "Personality Traits",
                  data: Object.values(scoresPersonalitys).map((value) =>
                    value.length > 0
                      ? (
                          value.reduce((acc, val) => acc + val, 0) / value.length
                        ).toFixed(2)
                      : 0
                  ),
                },
              ],
              hoverOffset: 1,
            }}
            options={options}
          />
        </div>
      </div>
    </>
  );
}

export default AnalysisiCard;
