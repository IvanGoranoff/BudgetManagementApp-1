import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Сменете с реалния URL на вашия сървър

export const login = (email, password) => {
  return axios.post(`${BASE_URL}/Account/Login`, { email, password });
};

export const register = (name, email, password, mobile) => {
  return axios.post(`${BASE_URL}/Account/Register`, { name, email, password, mobile });
};

export const logout = () => {
  return axios.get(`${BASE_URL}/Account/Logout`);
};

// Добавете други ендпойнти тук
