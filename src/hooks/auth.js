import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useSWR from 'swr';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter();

    const {
        data: user,
        error,
        mutate,
    } = useSWR('/api/user', () => {
        const token = localStorage.getItem('auth_token');
        if (!token) return null;

        return axios
            .get('/api/user')
            .then((res) => res.data)
            .catch((error) => {
                if (error.response?.status === 401) {
                    localStorage.removeItem('auth_token');
                    return null;
                }
                if (error.response?.status !== 409) throw error;
            });
    });

    const isAdmin = user?.role === 'admin';
    const isUser = user?.role === 'user';

    const register = async ({ setErrors, ...props }) => {
        setErrors([]);

        try {
            const response = await axios.post('/api/auth/register', props);
            localStorage.setItem('auth_token', response.data.token);
            await mutate();
            if (redirectIfAuthenticated) router.push(redirectIfAuthenticated);
        } catch (error) {
            if (error.response?.status !== 422) throw error;
            setErrors(Object.values(error.response.data.errors).flat());
        }
    };

    const login = async ({ setErrors, setStatus, ...props }) => {
        setErrors([]);
        setStatus(null);

        try {
            const response = await axios.post('/api/auth/login', props);
            localStorage.setItem('auth_token', response.data.token);
            await mutate();
            if (redirectIfAuthenticated) router.push(redirectIfAuthenticated);
        } catch (error) {
            if (error.response?.status !== 422) throw error;
            setErrors(Object.values(error.response.data.errors).flat());
        }
    };

    const logout = async () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                await axios.post('/api/auth/logout');
            } catch (error) {
                console.error('Logout error:', error);
            }
            localStorage.removeItem('auth_token');
            await mutate(null);
        }
        router.push('/login');
    };

    useEffect(() => {
        if (!user && !error && !localStorage.getItem('auth_token')) return;

        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            router.push(redirectIfAuthenticated);
        }

        if (middleware === 'auth' && error) {
            logout();
        }
    }, [user, error, middleware, redirectIfAuthenticated]);

    return {
        user,
        isAdmin,
        isUser,
        register,
        login,
        logout,
    };
};
