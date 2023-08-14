import React from "react";
import { createContext, useEffect, useState } from "react";
import { auth } from "./../firebase.config";
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";
export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(undefined);
    const [userInfo, setUserInfo] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [openChatBox, setOpenChatBox] = useState(false);
    const [isAuthModal, setIsAuthModal] = useState(false);


    useEffect(() => {
        if (user) {
            setIsAuthModal(false);
            if (!user?.email) {
                axios
                    .get("/api/users/get-me")
                    .then((res) => {
                        setUserInfo(res.data);
                    })
                    .catch((err) => {
                        setUserInfo(null);
                    });
            } else {
                setUserInfo(null);
            }
        }
    }, [user]);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                axios.defaults.headers.accessToken = user.accessToken;
                setUser(user);
            } else {
                setUser(null);
                setUserInfo(null)
            }
        });

        return () => unsubscribe();
    }, []);

    const onLogout = () => {
        signOut(auth).then(() => {
            setUser(null);
            setUserInfo(null)
        }).catch((error) => {
        });
    }
    const isAdmin = !!user?.email;
    const appContextData = {
        user,
        setUser,
        loading,
        setLoading,
        openChatBox,
        setOpenChatBox,
        isAuthModal,
        setIsAuthModal,
        userInfo,
        setUserInfo,
        isAdmin,
        onLogout
    };
    return (
        <AppContext.Provider value={appContextData}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
