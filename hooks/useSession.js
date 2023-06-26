'use client'

import { GithubAuthProvider, signInWithPopup, signOut, getAuth, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { createUserDocument, createUserProfile, createUserProfileForEmail, fetchUserProfile, createUserProfileForProviderMethod, sendEmailToNewUser } from "@/util/firebase/user";
import { AuthContext } from "./AuthContext";

export const useSession = () => {
    const [session, setSession] = useState(null);
    const githubProvider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    const { setUserInfo, setError, setLoading, setAuthReady } = useContext(AuthContext);

    const login = async () => {
        setError(null);
        setLoading(true)
        try {
            const res = await signInWithRedirect(auth, githubProvider);
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
    // const createUserWithEmail = async (name, email, password, opted, setErrors) => {
    //     setLoading(true)
    //     await createUserWithEmailAndPassword(auth, email, password)
    //         .then(async (userCredential) => {
    //             const user = userCredential.user;
    //             const res = await createUserProfileForEmail(user.uid, name, email, opted);
    //             console.log(res, "session func res");
    //             const rep = await fetchUserProfile(res.user.uid);
    //             await sendEmailToNewUser(name, email);
    //             setSession(rep)
    //             setUserInfo(rep)
    //             setLoading(false)
    //         })
    //         .catch((error) => {
    //             if (error.code === 'auth/email-already-in-use') {
    //                 setErrors({ email: 'Email is already taken' });
    //             }
    //             const errorMessage = error.message;
    //             setError(errorMessage)
    //         });
    // }
    const createUserWithEmail = async (name, email, password, opted) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userProfileRef = await createUserProfileForEmail(user.uid, name, email, opted);
            const userProfile = await fetchUserProfile(user.uid);
            await sendEmailToNewUser(email, name);
            setSession(userProfile);
            setUserInfo(userProfile);
            setLoading(false);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                throw new Error('Email is already taken');
            } else {
                throw new Error('Failed to create user');
            }
        }
    };

    // const loginUserWithEmail = async (email, password, setErrors) => {
    //     setLoading(true)
    //     await signInWithEmailAndPassword(auth, email, password)
    //         .then(async (userCredential) => {
    //             const rep = await fetchUserProfile(userCredential.user.uid);
    //             console.log(userCredential.user, "credentials");
    //             console.log(rep, "rep");
    //             setLoading(false)
    //             setSession(rep)
    //             setUserInfo(rep)
    //         })
    //         .catch((error) => {
    //             if (error.code === 'auth/user-not-found') {
    //                 setErrors({ email: ' No such email found ' });
    //             } else if (error.code === 'auth/wrong-password') {
    //                 setErrors({ email: "Incorrect password" })
    //             }
    //             const errorMessage = error.message;
    //             setError(errorMessage)
    //         })
    // };
    const loginUserWithEmail = async (email, password, setError) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userProfile = await fetchUserProfile(userCredential.user.uid);
            setLoading(false);
            setSession(userProfile);
            setUserInfo(userProfile);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('No user found with this email');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password');
            } else {
                setError('Failed to log in');
            }
            console.error('Login error:', error);
        }
    };

    const createUserWithGithub = async () => {
        await signInWithRedirect(auth, githubProvider)
            .then(async (userCredential) => {
                const res = await createUserProfileForProviderMethod(userCredential.user, 'github');
                const rep = await fetchUserProfile(res.uid);
                setSession(rep)
                setUserInfo(rep)
            })
            .catch((e) => {
                setError(e.message)
            })
        setLoading(false)
    }
    const loginUserWithGithub = async () => {
        await signInWithRedirect(auth, githubProvider)
            .then(async (userCredential) => {
                const rep = await fetchUserProfile(userCredential.user.uid);
                setSession(rep)
                setUserInfo(rep)
            })
            .catch((e) => {
                setError(e.message)
            })
        setLoading(false)
    }
    const loginUserWithGoogle = async () => {
        setError(null);
        setLoading(true)
        try {
            const res = await signInWithPopup(auth, googleProvider);
            if (!res) {
                throw new Error("Could not complete signup");
            }
            setSession(res.user);
            const rep = await fetchUserProfile(res.user.uid);
            setUserInfo(rep);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }
    const createUserWithGoogle = async () => {
        setError(null);
        setLoading(true)
        try {
            const res = await signInWithPopup(auth, googleProvider);
            if (!res) {
                throw new Error("Could not complete signup");
            }
            setSession(res.user);
            // setUser(res.user);
            const res2 = await createUserProfileForProviderMethod(res.user, 'google');
            const rep = await fetchUserProfile(res2.user.uid);
            setUserInfo(rep);
            setLoading(false)
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

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
    return { login, session, setSession, logout, createUserWithEmail, loginUserWithEmail, createUserWithGoogle, createUserWithGithub, loginUserWithGithub, loginUserWithGoogle };
};