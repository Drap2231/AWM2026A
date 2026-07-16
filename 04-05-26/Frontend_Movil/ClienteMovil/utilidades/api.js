import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
    baseURL: "http://172.29.8.230:8000" 
});

// Interceptor asíncrono para React Native
api.interceptors.request.use(async (config) => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.log("Error al recuperar el token", error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});