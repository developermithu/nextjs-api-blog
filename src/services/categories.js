import axios from '@/lib/axios';

export const getCategories = (url) => axios.get(url).then((res) => res.data);

export const getCategory = (id) => axios.get(`/api/categories/${id}`).then((res) => res.data);

export const createCategory = (data) => axios.post('/api/categories', data).then((res) => res.data);

export const updateCategory = (id, data) => axios.put(`/api/categories/${id}`, data).then((res) => res.data);

export const deleteCategory = (id) => axios.delete(`/api/categories/${id}`).then((res) => res.data);
