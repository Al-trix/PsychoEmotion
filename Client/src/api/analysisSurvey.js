import axios from './axios'

export const analysisSurvey = () => axios.get(`/analysisSurvey`);
export const analysisSurveyGet = () => axios.get(`/analysisSurveyGet`);
export const validateTokenAnalysis = () => axios.get(`/validateTokenAnalysis`);
