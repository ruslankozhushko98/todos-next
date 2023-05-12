import axios from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.BASE_URL ? String(process.env.BASE_URL) : 'http://localhost:3000',
});
