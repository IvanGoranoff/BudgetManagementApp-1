import axios from 'axios';

// Конфигуриране на axios инстанция
const api = axios.create({
  baseURL: 'http://localhost:3000' // Използвайте environment variable тук
});

// Обработка на грешки
const handleResponse = (response) => response.data;
const handleError = (error) => Promise.reject(error.response || error.message);

// API функции
export const login = (email, password) => {
  return api.post('/Account/Login', { email, password }).then(handleResponse).catch(handleError);
};

export const register = (name, email, password, mobile) => {
  return api.post('/Account/Register', { name, email, password, mobile }).then(handleResponse).catch(handleError);
};

export const logout = () => {
  return api.get('/Account/Logout').then(handleResponse).catch(handleError);
};