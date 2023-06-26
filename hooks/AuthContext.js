'use client'

import { createContext, useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '@/util/firebase/config'
import { fetchUserProfile } from "@/util/firebase/user";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const [authReady, setAuthReady] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState();
    const { session, setSession } = useSession();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTag, setFilterTag] = useState("");
    const [filterLang, setFilterLang] = useState("English");
    const [typeOfAuth, setTypeOfAuth] = useState();

    useEffect(() => {
        setAuthReady(false);
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log(user, "user here")
                setTypeOfAuth(user.providerData[0].providerId)
                const res = await fetchUserProfile(user.uid);
                setUserInfo(res);
                setSession(user);
            } else {
                setUserInfo(null);
                setSession(null);
            }
            setAuthReady(true);
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
                setAuthReady,
                searchTerm,
                filterTag,
                filterLang,
                setFilterLang,
                setFilterTag,
                loading,
                setLoading,
                typeOfAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
