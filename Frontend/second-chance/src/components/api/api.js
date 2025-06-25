// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:000/api',
});

export default API;
