'use client'

import React, { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebase_app from '@/firebase/config';

// Define the type for the context value
interface AuthContextType {
    user: User | null; // User type from Firebase
    loading: boolean; // Loading state
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

// Custom hook to use the AuthContext
export const useAuthContext = () => useContext(AuthContext);

// Define the props for AuthContextProvider
interface AuthContextProviderProps {
    children: React.ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null); // User type from Firebase
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    useEffect(() => {
        const auth = getAuth(firebase_app);

        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};