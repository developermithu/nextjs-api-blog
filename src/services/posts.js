import axios from '@/lib/axios';

export const getPosts = async (url) => {
    const separator = url.includes('?') ? '&' : '?';
    const finalUrl = `${url}${separator}status=published`;
    const response = await axios.get(finalUrl);
    return response.data;
};

export const getPost = async (slug) => {
    const response = await axios.get(`/api/posts/${slug}`);
    return response.data;
};

export const createPost = async (formData) => {
    const response = await axios.post('/api/posts', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updatePost = async (slug, formData) => {
    const response = await axios.post(`/api/posts/${slug}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    });
    return response.data;
};

export const deletePost = async (slug) => {
    const response = await axios.delete(`/api/posts/${slug}`);
    return response.data;
};

export const restorePost = async (id) => {
    const response = await axios.post(`/api/posts/${id}/restore`);
    return response.data;
};

export const forceDeletePost = async (id) => {
    const response = await axios.delete(`/api/posts/${id}/force-delete`);
    return response.data;
};