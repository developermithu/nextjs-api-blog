import axios from '@/lib/axios';

export const getPosts = async () => {
    const response = await axios.get('/api/posts');
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

export const updatePost = async (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        if (key === 'cover_image' && data[key]) {
            formData.append(key, data[key]);
        } else {
            formData.append(key, data[key]);
        }
    });
    formData.append('_method', 'PUT');
    
    const response = await axios.post(`/api/posts/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const deletePost = async (slug) => {
    const response = await axios.delete(`/api/posts/${slug}`);
    return response.data;
};