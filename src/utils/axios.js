import axios from 'axios';
import ENV_VAR from '../config/config';
const client = axios.create({
  baseURL: ENV_VAR.BACKEND_URL,
  headers: {
    'content-type': 'application/json',
  },
});
export default client;
