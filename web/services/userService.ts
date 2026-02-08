import api from './api';

export const fetchAllUsers = async () => {
  const res = await api.get('/users'); // Admin only
  return res.data;
};

export const fetchUserById = async (id: number) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const updateUserById = async (id: number, data: any) => {
  const res = await api.put(`/users/${id}`, data);
  return res.data;
};

export const deleteUserById = async (id: number) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};
