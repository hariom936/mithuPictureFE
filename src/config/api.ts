// src/config/api.ts

// Define the base URL for your backend API
export const BASE_URL = 'http://localhost:8000/api';

// Define the API endpoints as constants
export const API_ENDPOINTS = {
  login: `${BASE_URL}/user/login`,
  signup: `${BASE_URL}/user/add`,
  userList: `${BASE_URL}/user/list`,
  updateUser: `${BASE_URL}/user/update`,
  deleteUser: `${BASE_URL}/user/delete`, // Note: you'll append query string ?userId=xxx
  // You can add delete, change password, etc. here
};
