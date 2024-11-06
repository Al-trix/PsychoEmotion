import { useEffect, useState } from 'react';
import { bouncy } from 'ldrs';

import { analysisSurvey } from '../api/analysisSurvey';
import { useAuth } from '../context/authContext';
import AnalysisCards from '../components/AnalysisCards';
import InfoPersonalyties from '../components/InfoPersonalyties.jsx';
function AnalysisSurvey() {
  bouncy.register();
  const [analysisCreated, setAnalysisCreated] = useState(null);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const { analysis } = useAuth();
  console.log(analysis);

  useEffect(() => {
    const surveyAnalysisiApi = async () => {
      try {
        const analysisSurveyGet = await analysisSurvey();
        setAnalysisCreated(analysisSurveyGet?.data?.foundAnalysisCreate);
      } catch (error) {
        console.log(error?.response?.data?.message);
        if (error?.response?.data?.message === 'Analisis ya creado') {
          return;
        }
        if (error?.response?.data?.message === 'Not found user token') {
          setReload((prev) => !prev);
          return;
        }
        if (
          error?.response?.data?.message ===
          'Too many requests. Please wait a moment before trying again'
        ) {
          setReload((prev) => !prev);
          return;
        }
      } finally {
        setLoading(false);
      }
    };
    surveyAnalysisiApi();
  }, [reload]);

  if (loading) {
    return (
      <div className="flex w-full   justify-center items-center">
        <l-bouncy size="80" speed="1.2" color="#288"></l-bouncy>
      </div>
    );
  }

  const analysisFound = analysis?.data?.foundAnalysis;

  return (
    <section className=" my-3 mt-10">
      <h1 className="w-max mx-auto animation-title text-4xl text-kenyan-copper-500 font-bold">
        Todo sobre tus respuestas
      </h1>
      <span className="mx-auto w-32 my-1  bg-white/40 h-px animation-image flex "></span>
      <div className="grid gap-1 mt-8 px-10">
        <h4 className="text-lg border mx-auto text-kenyan-copper-200 animation-image font-medium border-white/50 shadow-lg shadow-black w-max px-4 py-2 rounded-full">
          ¿Qué nos dicen los Rasgos y sus Porcentajes?
        </h4>

        <span className=" w-px my-1  bg-white/40 h-3 mx-auto animation-title flex "></span>
        <p className="text-md px-4 text-center text-white/70 w-4/5 mx-auto animation-title shadow-xl shadow-black border border-white/50 rounded-2xl py-3">
          Cada individuo posee una combinación única de rasgos de personalidad
          que definen cómo interactúa y percibe el mundo a su alrededor. Estos
          rasgos, medidos en porcentajes, ofrecen una imagen clara de la
          intensidad con la que una persona muestra ciertas características. En
          este artículo, exploraremos los cinco rasgos de personalidad más
          comunes —Extraversion, Agreeableness, Conscientiousness, Openness, y
          Neuroticism— y el significado de sus porcentajes en los perfiles de
          personalidad.
        </p>
      </div>
      <div className='flex mt-24 items-center justify-center animation-up'>
        <span className=" w-1/3   bg-white/40 h-px mx-auto flex "></span>
        <span className='text-2xl font-medium text-kenyan-copper-300'>Mas sobre las personalidades</span>
        <span className=" w-1/3   bg-white/40 h-px mx-auto flex "></span>
      </div>
      <InfoPersonalyties />
      <div className=" gap-6">
        {analysis && !analysisCreated && (
          <AnalysisCards content={analysisFound} />
        )}
        {analysisCreated && <AnalysisCards content={analysisCreated} />}
      </div>
    </section>
  );
}

export default AnalysisSurvey;
