'use client'

import { AuthContext } from "@/hooks/AuthContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react"
import { GrFormEdit } from 'react-icons/gr'
import Image from 'next/image'
import { useSession } from "@/hooks/useSession";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/util/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchUserProfile } from "@/util/firebase/user";
import Imag from '@/public/images/pfp-place.jpg'
import { LuUserCog } from "react-icons/lu";
import Link from "next/link";

const SettingClient = ({ updateLoad, setUpdateLoad }) => {
    const { userInfo, setUserInfo, authReady } = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState(null);
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
    return (
        <div class="flex flex-col md:basis-[60%] justify-center md:justify-start self-start items-center md:items-start gap-4 mx-auto pt-10 pb-16 px-4 sm:px-6 md:px-0 w-full ">
            <div className="hidden md:block" >
                <h3 className="font-semibold text-start text-xl  md:text-2xl lg:text-3xl " >Profile</h3>
                <p>Update your profile using below fields </p>
            </div>
            <div className="flex space-x-8 items-start justify-start w-[90%] sm:w-[80%]  md:w-full">
                <div className=" ">
                    <label htmlFor="image-input" className=" relative cursor-pointer">
                        <Image
                            src={selectedImage ? selectedImage : (userInfo?.photoURL ? userInfo?.photoURL : Imag)}
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
            </div>
            <div className="py-3 space-y-4 w-[90%] sm:w-[80%] md:w-full ">
                <div className="text-base flex flex-col items-start w-full max-w-lg">
                    <label className="text-gray-500  text-sm md:text-md pl-1 " htmlFor="name">Name: <span className="text-red-500" >*</span> </label>
                    <input
                        type="text"
                        name="displayName"
                        id="name"
                        required
                        placeholder="Jhon Doe"
                        value={formData?.displayName}
                        onChange={handleChange}
                        className="w-full lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100/20 border border-gray-400 outline-none focus:border-gray-600 placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3"
                    />
                </div>
                <div className="text-base flex flex-col items-start w-full max-w-lg">
                    <label className="text-gray-500  text-sm md:text-md pl-1 " htmlFor="email">EMail: <span className="text-red-500" >*</span> </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData?.email}
                        onChange={handleChange}
                        required
                        className="w-full lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100/20 border border-gray-400 outline-none focus:border-gray-600 placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3"
                    />
                </div>
                <div className="text-base flex flex-col items-start w-full max-w-lg">
                    <label className="text-gray-500  text-sm md:text-md pl-1 " htmlFor="githubId">Github Url: <span className="text-red-500" >*</span> </label>
                    <input
                        type="text"
                        id="githubId"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        required
                        className="w-full lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100/20 border border-gray-400 outline-none focus:border-gray-600 placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3"
                    />
                </div>
                <div className="text-base flex flex-col items-start w-full max-w-lg">
                    <label className="text-gray-500  text-sm md:text-md pl-1 " htmlFor="twitter">Twitter username: <span className="text-red-500" >*</span> </label>
                    <input
                        type="url"
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        placeholder="@userName322"
                        className="w-full lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100/20 border border-gray-400 outline-none focus:border-gray-600 placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3"
                    />
                </div>
                <div className="text-base flex flex-col items-start w-full max-w-lg">
                    <label className="text-gray-500  text-sm md:text-md pl-1 " htmlFor="website">Website: <span className="text-red-500" >*</span> </label>
                    <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="www.mywebsite.com"
                        className="w-full lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100/20 border border-gray-400 outline-none focus:border-gray-600 placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3"
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
            <div className="text-base md:text-lg p-2 font-normal w-[90%] sm:w-[80%] md:w-full max-w-lg">
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-gradient-to-tr from-purple-500 via-violet-500 to-purple-600 px-3 py-2 md:px-6 lg:px-8 rounded-lg text-white shadow-lg w-full  "
                >
                    Update
                </button>
            </div>
        </div>
    );
}

export default SettingClient;