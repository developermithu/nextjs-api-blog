import axios from '../axios';

export async function getPosts(page = 1, perPage = 20, status = 'published') {
    try {
        const response = await axios.get(`/api/posts?page=${page}&per_page=${perPage}&status=${status}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

export async function getPost(slug) {
    try {
        const response = await axios.get(`/api/posts/${slug}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching post:', error);
        throw error;
    }
}

export async function getFeaturedPost() {
    try {
        const response = await axios.get('/api/posts', {
            params: {
                is_featured: true,
                status: 'published',
                limit: 1,
            },
        });
        return response.data.data[0];
    } catch (error) {
        console.error('Error fetching featured post:', error);
        throw error;
    }
}
