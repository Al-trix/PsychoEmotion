import axios from './axios.js'
export const surveyResponsed = (survey) => axios.post(`/surveyResponse`, survey);
export const surveyResponsedUser = (user) => axios.post(`/surveyResponseGet`, user);
export const surveyResponseLogout = () => axios.get(`/surveyResponseLogout`);
export const createTokenCookie = (user) => axios.get(`/createTokenCookie`, user);

