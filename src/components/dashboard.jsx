
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUser, logout } from '../services/auth.service'; 

const DashboardProtegido = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(true);
    
    const user = getCurrentUser(); 

    useEffect(() => {
       
        if (!user || !user.token) {
            setError('No autorizado. Por favor, inicia sesión.');
            setCargando(false);
            return;
        }

        const fetchUsuarios = async () => {
            try {
                
                const response = await axios.get('http://localhost:3000/api/users', {
                    headers: {
                        Authorization: `Bearer ${user.token}` 
                    }
                });
                
                setUsuarios(response.data);
                
            } catch (error) { 
                const errorMessage = error.response?.data?.message || 'Token inválido. Vuelve a iniciar sesión.';
                setError(`Acceso Denegado: ${errorMessage}`);
                
                logout(); 
                window.location.reload(); 
            } finally {
                setCargando(false);
            }
        };

        fetchUsuarios();
    }, [user]); 

    if (cargando) return <div style={{ padding: '20px' }}>Cargando datos protegidos...</div>;

    if (error) return <div style={{ color: 'red', padding: '20px', border: '1px solid red' }}>{error}</div>;

    if (!user) return <div style={{ color: 'red', padding: '20px' }}> No autorizado.</div>;

    return (
        <div style={{ border: '2px solid #d84e8cff', padding: '20px', borderRadius: '5px' }}>
            <h2>Panel de Control (Ruta Protegida)</h2>
            <p>Conectado como: <strong>{user.correo}</strong> (Rol: {user.rol})</p>
            
            <button 
                onClick={() => { 
                    logout(); 
                    window.location.reload(); 
                }}
                style={{ padding: '10px 15px', backgroundColor: '#c2cee1ff', color: 'white', border: 'none', cursor: 'pointer', marginBottom: '15px' }}
            >
                Cerrar Sesión
            </button>
            
            <h3>Usuarios obtenidos de /api/users:</h3>
            <ul>
                {usuarios.map(u => (
                    <li key={u.idUsuario}>{u.nombre} ({u.correo})</li>
                ))}
            </ul>
        </div>
    );
};
export default DashboardProtegido;