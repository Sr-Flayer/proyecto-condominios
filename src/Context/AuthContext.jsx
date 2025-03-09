import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    const login = async (credentials) => {
        try {
            const response = await fetch('https://api-condominios-noti.onrender.com/api/verifyToken', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            if (response.ok) {
                setToken(data.token);
                setUser({ departamento: data.departamento, rol: data.rol });
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error en login:', error);
        }
    };

    const logout = () => {
        setToken('');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 
