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
import { LuEye, LuEyeOff, LuUserCog } from "react-icons/lu";
import Link from "next/link";

const ChangePassword = ({ updateLoad, setUpdateLoad }) => {
    const { userInfo, setUserInfo, authReady } = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const router = useRouter();
    const [type1, setType1] = useState(false)
    const [type2, setType2] = useState(false)
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    })
    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.password) {
            newErrors.password = 'New Password is required';
            valid = false;
        } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/.test(formData.password)) {
            newErrors.password =
                'Password must be at least 6 characters long and should contain {aA-zZ,0-9}';
            valid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Password Mismatched'
            valid = false
        }
        setErrors(newErrors);
        return valid;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setUpdateLoad(true);
            //work

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
    const changeType = (id) => {
        id === 1 ? setType1(!type1) : setType2(!type2)
    }

    return (
        <form class="flex flex-col md:basis-[60%] justify-start self-start items-start gap-4 mx-auto pt-10 pb-16 px-4 sm:px-6 md:px-0 w-full md:h-[80vh] md:w-[40vw] lg:w-[40vw]  overflow-hidden ">
            <div className="" >
                <h3 className="font-semibold text-start text-xl  md:text-2xl lg:text-3xl " >Password</h3>
                <p>Change or Reset your Password </p>
            </div>
            <div className="py-3 space-y-4 w-[90%] sm:w-[80%] md:w-full ">
                <div className="text-base  flex flex-col items-start w-full max-w-lg relative ">
                    <label className="text-gray-500  text-sm  pl-1 " htmlFor="name">New Password: <span className="text-red-500" >*</span> </label>
                    <input
                        type={!type1 ? "password" : "text"}
                        id="password"
                        name="password"
                        value={formData?.password}
                        onChange={handleChange}
                        required
                        className="w-full max-w-lg lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100/20 border border-gray-400 outline-none focus:border-gray-600 placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3"
                    />
                    {errors.password && <p className="text-orange-500 text-start text-sm ml-2 font-light ">{errors.password}</p>}
                    <button onClick={(e) => changeType(1)} class="absolute bottom-2 right-2  h-6 w-6 bg-gray-200 border rounded-lg p-1">
                        {
                            !type1 ? <LuEyeOff className="h-full w-full " /> : <LuEye className="h-full w-full " />
                        }
                    </button>
                </div>

                <div className="text-base  flex flex-col items-start w-full max-w-lg relative ">
                    <label className="text-gray-500  text-sm  pl-1 " htmlFor="email">Confirm Password: <span className="text-red-500" >*</span> </label>
                    <input
                        type={!type2 ? "password" : "text"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData?.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full max-w-lg lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100/20 border border-gray-400 outline-none focus:border-gray-600 placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3"
                    />
                    {errors.confirmPassword && <p className="text-orange-500 text-start text-sm ml-2 font-light ">{errors.confirmPassword}</p>}
                    <button onClick={(e) => changeType(2)} class="absolute bottom-2 right-2  h-6 w-6 bg-gray-200 border rounded-lg p-1">
                        {
                            !type2 ? <LuEyeOff className="w-full h-full" /> : <LuEye className="w-full h-full" />
                        }
                    </button>
                </div>
            </div>
            <button type="submit" onClick={handleSubmit} className="w-[90%] sm:w-[80%]  text-base p-2 font-normal max-w-lg flex md:w-full  bg-[#320760] text-white  items-center  rounded-xl px-4 md:px-6 py-2 flex-col gap-2" >
                Change Password
            </button>

        </form>
    );
}

export default ChangePassword;