import { useEffect, useState } from "react";
import { bouncy } from "ldrs";

import { analysisSurvey } from "../api/analysisSurvey";
import { useAuth } from "../context/authContext";
import AnalysisCards from "../components/AnalysisCards";

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
        if(error?.response?.data?.message === "Analisis ya creado"){
          return
        }
        if(error?.response?.data?.message === "Not found user token"){
          setReload((prev) => !prev)
          return
        }
        if(error?.response?.data?.message === "He service is loading"){
          setReload((prev) => !prev)
          return
        }
        if (
          error?.response?.data?.message ===
          "Too many requests. Please wait a moment before trying again"
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
      <div className='flex w-full   justify-center items-center'>
        <l-bouncy size='80' speed='1.2' color='#288'></l-bouncy>
      </div>
    );
  }

  const analysisFound = analysis?.data?.foundAnalysis;

  return (
    <section className=' grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2   justify-center items-center gap-4 my-5'>
      <h1 className=' lg:col-span-2 xl:col-span-3 text-center text-4xl  mb-7'>
        Analisis de la encuesta
      </h1>
      {analysis && !analysisCreated && (
        <AnalysisCards content={analysisFound} />
      )}
      {analysisCreated && <AnalysisCards content={analysisCreated} />}
    </section>
  );
}

export default AnalysisSurvey;
