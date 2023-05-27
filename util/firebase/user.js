import { collection, doc, getDoc, getDocs, query, where, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./config";

export const createUserDocument = async (user) => {
    const q = query(collection(db, "userProfile"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        const { uid, displayName, email, photoURL, reloadUserInfo } = user;

        const docRef = doc(db, "userProfile", uid);
        await setDoc(docRef, {
            displayName,
            email,
            photoURL,
            username: reloadUserInfo.screeName,
            githubUrl: `www.github.com/${reloadUserInfo.screenName}`,
            createdAt: serverTimestamp(),
            twitter: '',
            website: '',
            linkedin: '',
            infoVisible: true
        });
    }
};
export const fetchUserProfile = async (userId) => {
    try {
        const docRef = doc(db, 'userProfile', userId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            return { uid: userId, ...data };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};
