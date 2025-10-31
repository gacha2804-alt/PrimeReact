
import React, { useState } from 'react';

import { login } from '../services/auth.service'; 

const Login = () => { 
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');

        try {
            await login(correo, contrasena); 
            setMensaje('Inicio de sesión exitoso. Redirigiendo...');
            
            window.location.reload(); 
          
        } catch (error) {
            
            const msg = error.response?.data?.message || 'Error de conexión o servidor.';
            setMensaje(` Error: ${msg}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', border: '1px solid #e2eaf6ff', borderRadius: '5px' }}>
            <h2>Iniciar Sesión</h2>
            <input 
                type="email" 
                placeholder="Correo" 
                value={correo} 
                onChange={(e) => setCorreo(e.target.value)} 
                required 
                style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
            />
            <input 
                type="password" 
                placeholder="Contraseña" 
                value={contrasena} 
                onChange={(e) => setContrasena(e.target.value)} 
                required 
                style={{ marginBottom: '15px', padding: '8px', width: '100%' }}
            />
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#b060b9ff', color: 'white', border: 'none', cursor: 'pointer' }}>
                Entrar
            </button>
            <p style={{ color: mensaje.startsWith('') ? 'red' : 'green', marginTop: '10px' }}>{mensaje}</p>
        </form>
    );
};

export default Login;