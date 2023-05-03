import axios from 'axios';
import { config } from 'dotenv';

config();

export const httpClient = axios.create({
  baseURL: String(process.env.BASE_URL),
});
