import axios from 'axios';

export const PrediksiApi = axios.create({ baseURL: 'http://192.168.43.157:3000' });