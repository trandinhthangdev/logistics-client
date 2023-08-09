import React from "react";
import { createContext, useEffect, useState } from "react";
import { auth } from "./../firebase.config";
import { getDatabase, ref, child, get } from "firebase/database";
import axios from "axios";
export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userInfo, setUserInfo] = useState(undefined);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loading, setLoading] = useState(false);
    const [openChatBox, setOpenChatBox] = useState(false);
    const [isAuthModal, setIsAuthModal] = useState(false);

    useEffect(() => {
        if (user) {
            setIsAuthModal(false);
            axios
                .get("/api/users/get-me")
                .then((res) => {
                    console.log("res", res);
                    setUserInfo(res.data);
                })
                .catch((err) => {
                    console.log("err", err);
                    setUserInfo(null);
                });
        }
    }, [user]);
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
        openChatBox,
        setOpenChatBox,
        isAuthModal,
        setIsAuthModal,
        userInfo,
        setUserInfo,
    };
    return (
        <AppContext.Provider value={appContextData}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
