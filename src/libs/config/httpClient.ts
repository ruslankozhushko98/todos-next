import axios from 'axios';

export const httpClient = axios.create({
  baseURL: String(process.env.BASE_URL),
});
