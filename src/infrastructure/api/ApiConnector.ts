import axios from 'axios';

export const apiConnection = axios.create({
  responseType: 'json',
});
