import {config} from 'dotenv'

config();

export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const ACCESS_TOKEN_HF = process.env.ACCESS_TOKEN_HF;
export const TOKEN_ADMIN = process.env.TOKEN_ADMIN;
