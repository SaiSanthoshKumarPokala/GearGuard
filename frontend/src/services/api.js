import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers['x-auth-token'] = token;
  }
  return req;
});

// Auth APIs
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const getUser = () => API.get('/auth/me');

// Equipment APIs
export const getEquipment = (params) => API.get('/equipment', { params });
export const getEquipmentById = (id) => API.get(`/equipment/${id}`);
export const getEquipmentRequests = (id) => API.get(`/equipment/${id}/requests`);
export const createEquipment = (data) => API.post('/equipment', data);
export const updateEquipment = (id, data) => API.put(`/equipment/${id}`, data);
export const deleteEquipment = (id) => API.delete(`/equipment/${id}`);

// Team APIs
export const getTeams = () => API.get('/teams');
export const getTeamById = (id) => API.get(`/teams/${id}`);
export const createTeam = (data) => API.post('/teams', data);
export const updateTeam = (id, data) => API.put(`/teams/${id}`, data);
export const deleteTeam = (id) => API.delete(`/teams/${id}`);

// Request APIs
export const getRequests = (params) => API.get('/requests', { params });
export const getRequestById = (id) => API.get(`/requests/${id}`);
export const createRequest = (data) => API.post('/requests', data);
export const updateRequest = (id, data) => API.put(`/requests/${id}`, data);
export const deleteRequest = (id) => API.delete(`/requests/${id}`);
export const getStatistics = () => API.get('/requests/statistics');

export default API;
