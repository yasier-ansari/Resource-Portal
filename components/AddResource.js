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

const AddResource = ({ updateLoad, setUpdateLoad }) => {
    const { userInfo, setUserInfo, authReady } = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        tags: '',
        url: '',
        language: '',
        photoURL: ''
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
            //work
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
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    photoURL: reader.result,
                }));
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
        <div class="flex flex-col md:basis-[60%] justify-start self-start items-start gap-4 mx-auto pt-10 pb-16 px-4 sm:px-6 md:px-0 w-full">
            <div className="" >
                <h3 className="font-semibold text-start text-xl  md:text-2xl lg:text-3xl " >Add Resource</h3>
                <p> Contribute to the cause by submitting helpful Resources </p>
            </div>
            <div className="flex space-x-8  ">
                <div className=" ">
                    <label htmlFor="photoUrl" className=" relative cursor-pointer w-full max-w-sm ">
                        <Image
                            src={formData?.photoURL ? formData?.photoURL : Imag}
                            alt="Selected Image"
                            className=" aspect-video rounded-xl object-cover "
                            onClick={handleClick}
                            width={400}
                            height={225}
                        />
                        <div className="absolute bottom-2 right-2 bg-gray-400 rounded-[20px] p-1 ">
                            <GrFormEdit className="h-4 w-4 md:h-5 md:w-5" />
                        </div>
                    </label>
                    <input
                        id="photoUrl"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
            </div>
            <div className="py-3 space-y-4 w-[90%] sm:w-[80%] md:w-full ">
                <div className="text-base flex flex-col items-start w-full max-w-lg">
                    <label className="text-gray-500  text-sm md:text-md pl-1 " htmlFor="title">Title: <span className="text-red-500" >*</span> </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData?.title}
                        onChange={handleChange}
                        placeholder="New Resource"
                        required
                        className="w-full lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100/20 border border-gray-400 outline-none focus:border-gray-800 placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3   "
                    />
                </div>
                <div className="text-base flex flex-col items-start w-full max-w-lg " >
                    <label className="text-gray-500  text-sm md:text-md pl-1 " htmlFor="url">Resource Link: <span className="text-red-500" >*</span> </label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        placeholder="www.new-resource.com "
                        value={formData?.url}
                        onChange={handleChange}
                        required
                        className="w-full lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100/20 border border-gray-400 outline-none focus:border-gray-800 placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3  "

                    />
                </div>
                <div className="text-base flex flex-col items-start w-full max-w-lg" >
                    <label className="text-gray-500  text-sm md:text-md pl-1 " htmlFor="tags">Resource Tags: <span className="text-red-500" >*</span> </label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        placeholder="Web Dev, DevOps, javascript, ..."
                        value={formData?.tags}
                        onChange={handleChange}
                        required
                        className="w-full lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100/20 border border-gray-400 outline-none focus:border-gray-600 placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3  "

                    />
                </div>
            </div>
            <button onClick={handleSubmit} className="flex w-full  bg-[#320760] text-white  items-center text-lg md:text-xl rounded-xl px-4 md:px-6 py-1 md:py-2 flex-col gap-2" >
                Add Resource
            </button>
        </div>
    );
}

export default AddResource;