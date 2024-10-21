import axios from "./axios.js";

export const registerAdminApi = (user) => axios.post(`/registerAdmin`, user);
export const loginAdminApi = (user) => axios.post(`/loginAdmin`, user);
export const logOutAdminApi = () => axios.post(`/logOutAdmin`);
export const verifyTokenAdmin = () => axios.get(`/verifyTokenAdmin`);

