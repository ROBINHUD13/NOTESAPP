import React, { createContext, useState, useEffect, useContext } from 'react';
import { account, loginWithGoogle, logout } from './appwriteConfig';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        checkUserStatus();
    }, []);

    const checkUserStatus = async () => {
        try {
            const currentUser = await account.get();
            setUser(currentUser);
            console.log(currentUser);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {
        await loginWithGoogle();
    };

    const handleLogout = async () => {
        try {
            // Perform the logout process (Appwrite/ Firebase/ etc.)
            await account.deleteSession("current"); // Modify this based on your authentication method
            setUser(null); // Clear user state
            navigate("/"); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    const value = {
        user,
        loading,
        login,
        logout: handleLogout,
        checkUserStatus,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);