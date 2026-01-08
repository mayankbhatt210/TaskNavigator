import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosInstance = axios.create({
    baseURL: 'https://gorest.co.in/public/v2',
    timeout: 10000,
});

// Attach token automatically
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem('TOKEN');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
