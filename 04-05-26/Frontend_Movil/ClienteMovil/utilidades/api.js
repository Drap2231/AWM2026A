import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
    // REEMPLAZA CON LA IP DE TU PC (No uses localhost)
    baseURL: "http://192.168.100.245:8000" 
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