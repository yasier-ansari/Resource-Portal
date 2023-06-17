'use client'

import { createContext, useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '@/util/firebase/config'
import { fetchUserProfile } from "@/util/firebase/user";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [error, setError] = useState(false);
    const [authReady, setAuthReady] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState();
    const { session, setSession } = useSession();
    const [searchTerm, setSearchTerm] = useState("");
    const auth = getAuth();

    useEffect(() => {
        setAuthReady(false);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const res = await fetchUserProfile(user.uid);
                setAuthReady(true);
                setUserInfo(res);
                // setUserInfo(res);
                setSession(user);
            } else {
                setUserInfo(null);
                setSession(null);
            }
        });
        return unsubscribe;
    }, []);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <AuthContext.Provider
            value={{
                error,
                setError,
                isModalVisible,
                setIsModalVisible,
                toggleModal,
                userInfo,
                setUserInfo,
                setSearchTerm,
                authReady,
                searchTerm
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
