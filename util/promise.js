import { db } from "./firebase/config";
import { collection, query, getDocs, where } from "firebase/firestore";

export const getData = async (slug) => {
    const conSlug = slug?.replace(/-/g, " ");
    const infoCollection = collection(db, 'AltData');
    const infoQuery = query(infoCollection, where('title', '==', conSlug));
    const infoSnapshot = await getDocs(infoQuery);
    const res = infoSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return res;
};

export const getPaths = async () => {
    const infoCollection = collection(db, 'AltData');
    const infoQuery = query(infoCollection);
    const infoSnapshot = await getDocs(infoQuery);
    const infoData = infoSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
    return infoData;
}