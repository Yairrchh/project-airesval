// src/config/config.js
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Definir la URL base utilizando la variable de entorno
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const config =  {
  BASE_URL,
};

export default config;