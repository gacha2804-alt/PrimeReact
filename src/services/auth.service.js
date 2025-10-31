
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const AUTH_URL = `${API_BASE_URL}/auth`; 

export const login = async (correo, contrasena) => {
    const response = await axios.post(`${AUTH_URL}/login`, { 
        correo,
        contrasena,
    });
   
    if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const register = async (nombre, correo, contrasena, rol) => {
    
    return axios.post(`${AUTH_URL}/register`, {
        nombre,
        correo,
        contrasena,
        rol,
    });
};

export const logout = () => {
    localStorage.removeItem('user');
    window.location.reload(); 
};

export const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        
        if (!userStr) {
            return null;
        }
        
        return JSON.parse(userStr); 
        
    } catch (error) {
       
        console.error("Error al obtener o parsear el usuario de localStorage:", error);
        localStorage.removeItem('user');
        return null;
    }
};