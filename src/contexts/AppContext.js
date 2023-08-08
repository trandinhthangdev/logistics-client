import React from "react";
import { createContext, useEffect, useState } from "react";
import { auth } from "./../firebase.config";
import axios from "axios";
export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Set up an authentication observer to track the user's sign-in state.
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("user", user);
                axios.defaults.headers.accessToken = user.accessToken;
                // User is signed in.
                setUser(user);
            } else {
                // User is signed out.
                setUser(null);
            }
            setLoadingUser(false);
        });

        // Unsubscribe from the observer when the component is unmounted.
        return () => unsubscribe();
    }, []);
    const appContextData = {
        user,
        setUser,
        loadingUser,
        setLoadingUser,
        loading,
        setLoading,
    };
    return (
        <AppContext.Provider value={appContextData}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
