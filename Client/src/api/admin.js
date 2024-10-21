import axios from "./axios";

export const adminToken = (tokenAdmin) => axios.post(`/adminToken`, tokenAdmin);
export const getAllQuestions = () => axios.get(`/questions`);

export const createQuestion = (question) => axios.post(`/question`, question);
export const deleteQuestion = (idQuestion) => axios.delete(`/question/${idQuestion}`);
export const updateQuestion = (idQuestion, newQuestion) =>
  axios.put(`/question/${idQuestion}`, newQuestion);
