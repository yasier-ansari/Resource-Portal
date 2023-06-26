import { collection, doc, getDoc, getDocs, query, where, setDoc, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from "./config";

export const createUserDocument = async (user) => {
    const q = query(collection(db, "userProfile"), where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        const { uid, displayName, email, photoURL, reloadUserInfo } = user;

        const docRef = doc(db, "userProfile");
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
            newsletter: true
        });
        await fetch('http://localhost:3000/email', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userEmail: email, userName: displayName }),
        })
    }
};

// export const createUserProfileForEmail = async (uid, name, email, opted) => {
//     const docRef = doc(db, "userProfile");
//     console.log(name, email, opted)
//     const rep = await setDoc(docRef, {
//         uid,
//         displayName: name,
//         email: email,
//         createdAt: serverTimestamp(),
//         newsletter: opted,
//     });
//     console.log(rep, "rep")
// }
export const createUserProfileForEmail = async (uid, name, email, opted) => {
    try {
        const docRef = await setDoc(doc(db, 'userProfile', uid), {
            displayName: name,
            email: email,
            createdAt: serverTimestamp(),
            newsletter: opted,
        });
        console.log('New user profile created with ID:');
        return docRef;
    } catch (error) {
        console.error('Error creating user profile:', error);
        throw error;
    }
};


export const createUserProfileForProviderMethod = async (user, provider) => {
    const docRef = doc(db, "userProfile", uid);
    const { uid, displayName, email, photoURL, reloadUserInfo } = user;
    // Create a profile object with default values
    await setDoc(docRef, {
        displayName,
        email,
        photoURL,
        githubUrl: provider === "github" ? `www.github.com/${reloadUserInfo.screenName}` : null,
        createdAt: serverTimestamp(),
        newsletter: true
    });
    await fetch(`${process.env.HOSTED_SITE_URL}/email`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: email, userName: displayName }),
    })
    await setDoc(docRef, profile);
    await fetch(`${process.env.HOSTED_SITE_URL}/email`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: email, userName: name }),
    })
}

// export const fetchUserProfile = async (userId) => {

//     try {
//         const docRef = doc(db, 'userProfile', userId);
//         const docSnapshot = await getDoc(docRef);

//         if (docSnapshot.exists()) {
//             const data = docSnapshot.data();
//             return { uid: userId, ...data };
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching user profile:', error);
//         throw error;
//     }
// };
export const fetchUserProfile = async (userId) => {
    try {
        const docRef = doc(db, 'userProfile', userId);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            return { uid: userId, ...data };
        } else {
            throw new Error('User profile not found');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};


export const sendEmailToNewUser = async (email, name) => {
    await fetch(`/email`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: email, userName: name }),
    })
    console.log("sent email to", email)
}