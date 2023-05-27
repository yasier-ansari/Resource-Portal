'use client'

import { createContext, useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '@/util/firebase/config'
import { fetchUserProfile } from "@/util/firebase/user";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [error, setError] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { session, setSession } = useSession();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const res = await fetchUserProfile(user.uid);
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
                toggleModal,
                userInfo,
                setUserInfo
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
