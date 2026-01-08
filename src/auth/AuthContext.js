import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load token on app start
    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem('TOKEN');
            if (storedToken) {
                setToken(storedToken);
            }
            setLoading(false);
        };

        loadToken();
    }, []);

    // Login
    const login = async (token) => {
        await AsyncStorage.setItem('TOKEN', token);
        setToken(token);
    };

    // Logout
    const logout = async () => {
        await AsyncStorage.removeItem('TOKEN');
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                login,
                logout,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
