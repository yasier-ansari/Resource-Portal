'use client'

import { AuthContext } from "@/hooks/AuthContext";
import { useContext, useEffect, useState } from "react"
import { GrFormEdit } from 'react-icons/gr'
import Image from 'next/image'
import { useSession } from "@/hooks/useSession";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/util/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchUserProfile } from "@/util/firebase/user";

const SettingClient = () => {
    const { userInfo, setUserInfo, authReady } = useContext(AuthContext);
    const { logout } = useSession();
    const [selectedImage, setSelectedImage] = useState(null);
    const [updateLoad, setUpdateLoad] = useState(null);
    const router = useRouter();
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        githubUrl: '',
        website: '',
        photoURL: '',
        linkedin: '',
        twitter: '',
        infoVisible: true
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoad(true);
        try {
            const docRef = doc(db, 'userProfile', userInfo?.uid);
            await setDoc(docRef, formData, { merge: true });
            const updateUser = await fetchUserProfile(userInfo?.uid);
            setUserInfo(updateUser);
            toast('Profile updated successfully 👌');
        } catch (e) {
            console.log(e);
        }
        setUpdateLoad(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleClick = () => {
        // Logic to open file input when the image is clicked
        // You can use a hidden file input and trigger its click event programmatically
    };
    useEffect(() => {
        if (userInfo) {
            setFormData({
                displayName: userInfo?.displayName,
                email: userInfo?.email,
                githubUrl: userInfo?.githubUrl,
                website: userInfo?.website,
                photoURL: userInfo?.photoURL,
                linkedin: userInfo?.linkedin,
                twitter: userInfo?.twitter,
                infoVisible: userInfo?.infoVisible
            });
        }
    }, [userInfo, updateLoad]);
    useEffect(() => {
        if (authReady) {
            if (!userInfo) {
                router.push('/');
            } else {
                console.log("user wala")
            }
        }
    }, [authReady]);
    return (
        <div className="flex justify-center">
            {
                !updateLoad ? (
                    <div className="flex flex-col gap-4 mx-auto pb-16 ">
                        {
                            userInfo ? (<><div className="flex space-x-8 items-center">
                                <div className=" ">
                                    <label htmlFor="image-input" className=" relative cursor-pointer">
                                        <Image
                                            src={selectedImage ? selectedImage : userInfo?.photoURL}
                                            alt="Selected Image"
                                            className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
                                            onClick={handleClick}
                                            width={100}
                                            height={100}
                                        />
                                        <div className="absolute bottom-2 right-0 bg-gray-400 rounded-[20px] p-1 ">
                                            <GrFormEdit className="h-4 w-4 md:h-5 md:w-5" />
                                        </div>
                                    </label>
                                    <input
                                        id="image-input"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>
                                <div className="" >
                                    <h3 className="font-extrabold text-xl  md:text-2xl lg:text-3xl " >Profile</h3>
                                    <p>Update your profile using below fields </p>
                                </div>
                            </div>
                                <div className="py-3 space-y-4 ">
                                    <div className="flex flex-col gap-2 w-[500px]  ">
                                        <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="name">Name: <span className="text-red-500" >*</span> </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="displayName"
                                            value={formData?.displayName}
                                            onChange={handleChange}
                                            required
                                            className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-[500px]  " >
                                        <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="email">Email: <span className="text-red-500" >*</span> </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData?.email}
                                            onChange={handleChange}
                                            required
                                            className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-[500px] " >
                                        <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="githubId">GitHub url: <span className="text-red-500" >*</span> </label>
                                        <input
                                            type="text"
                                            id="githubId"
                                            name="githubUrl"
                                            value={formData.githubUrl}
                                            onChange={handleChange}
                                            required
                                            className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-[500px] " >
                                        <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="linkedin">Linkedin:</label>
                                        <input
                                            type="url"
                                            id="linkedin"
                                            name="linkedin"
                                            value={formData.linkedin}
                                            onChange={handleChange}
                                            className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-[500px] " >
                                        <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="twitter">Twitter:  </label>
                                        <input
                                            type="url"
                                            id="twitter"
                                            name="twitter"
                                            value={formData.twitter}
                                            onChange={handleChange}
                                            className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 w-[500px] " >
                                        <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="website">Website: </label>
                                        <input
                                            type="url"
                                            id="website"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

                                        />
                                    </div>
                                    <div className="flex items-center space-x-2 pl-1  ">
                                        <input checked={formData?.infoVisible} onChange={() =>
                                            setFormData((prevFormData) => ({
                                                ...prevFormData,
                                                infoVisible: !prevFormData.infoVisible,
                                            }))} name="infoVisible" type="checkbox" id="label2" className="form-checkbox h-4 w-4 text-blue-500" />
                                        <label htmlFor="label2" className="font-medium text-sm text-gray-600 flex items-center" > Subscribe to our monthly newsletter  </label>
                                    </div>
                                </div>
                                <button onClick={handleSubmit} className="flex w-full  bg-[#320760] text-white font-semibold items-center text-lg md:text-xl rounded-xl px-4 md:px-6 py-1 md:py-2 flex-col gap-2" >
                                    Update
                                </button></>) : (
                                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500 z-50">
                                    <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg">
                                        <h2 className="text-lg font-semibold">Loading</h2>
                                        <div className="animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-violet-500"></div>
                                    </div>
                                </div >
                            )
                        }
                    </div >
                ) : (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500 z-50">
                        <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg">
                            <h2 className="text-lg font-semibold">Updating Profile</h2>
                            <div className="animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-violet-500"></div>
                        </div>
                    </div >
                )
            }
        </div>

    );
}

export default SettingClient;