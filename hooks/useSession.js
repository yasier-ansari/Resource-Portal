'use client'
import { GithubAuthProvider, signInWithPopup, signOut, getAuth, signInWithRedirect } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { createUserDocument } from "@/util/firebase/user";
// import { AuthContext } from "./AuthContext";
import { fetchUserProfile } from "@/util/firebase/user";
import { AuthContext } from "./AuthContext";

export const useSession = () => {
    const [session, setSession] = useState(null);
    const provider = new GithubAuthProvider();
    const auth = getAuth();
    const { setUserInfo, setError, setLoading, setAuthReady } = useContext(AuthContext);

    const login = async () => {
        setError(null);
        setLoading(true)
        try {
            const res = await signInWithRedirect(auth, provider);
            if (!res) {
                throw new Error("Could not complete signup");
            }
            setSession(res.user);
            // setUser(res.user);
            await createUserDocument(res.user);
            const rep = await fetchUserProfile(res.user.uid);
            setUserInfo(rep);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };
    const logout = async () => {
        try {
            await signOut(auth);
            console.log("user logged out");
            setSession(null);
            setUserInfo();
        } catch (error) {
            console.log(error.message);
        }
    };
    return { login, session, setSession, logout };
};