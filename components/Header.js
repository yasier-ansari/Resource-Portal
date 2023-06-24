'use client'

import Link from "next/link"
import Image from "next/image";
import { useContext, useState, useRef, useEffect } from "react";
import { LuGraduationCap, LuBookOpen, LuVideo, LuInfo, LuChevronDown, LuListMinus, LuGitPullRequest, LuMenu, LuX, LuHome } from "react-icons/lu";
import { AuthContext } from "@/hooks/AuthContext";
import { useSession } from "@/hooks/useSession";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import Imag from '@/public/images/pfp-place.jpg'

const Header = () => {
    const { login, session, logout } = useSession();
    const { toggleModal, loading, userInfo, setIsModalVisible, isModalVisible, authReady } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
    const [menuBar, setMenuBar] = useState(false)
    const dropdownRef = useRef(null);
    const mediaDropdownRef = useRef(null);
    const mobileRef = useRef(null);
    const router = useRouter();

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleMediaDropdownToggle = () => {
        setMediaDropdownOpen(!mediaDropdownOpen);
    };

    const handleClickOutside = (event, ref, setOpen) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setOpen(false);
        }
    };

    const handleLogout = () => {
        setDropdownOpen(false);
        logout();
        toast('Logged Out', { hideProgressBar: true, autoClose: 2000, type: 'success', });
        router.push('/');
        // Perform logout logic here
    };
    const handleLogoutMobile = () => {
        setDropdownOpen(false);
        setMenuBar(false);
        logout();
        toast('Logged Out', { hideProgressBar: true, autoClose: 2000, type: 'success', });
        router.push('/');
    }


    useEffect(() => {
        document.addEventListener("mousedown", (event) => handleClickOutside(event, dropdownRef, setDropdownOpen));
        document.addEventListener("mousedown", (event) => handleClickOutside(event, mediaDropdownRef, setMediaDropdownOpen));
        document.addEventListener("mousedown", (event) => handleClickOutside(event, mobileRef, setMenuBar));
        return () => {
            document.removeEventListener("mousedown", (event) => handleClickOutside(event, dropdownRef, setDropdownOpen));
            document.removeEventListener("mousedown", (event) => handleClickOutside(event, mediaDropdownRef, setMediaDropdownOpen));
            document.addEventListener("mousedown", (event) => handleClickOutside(event, mobileRef, setMenuBar));
        };
    }, []);


    const loginHandler = async () => {
        await login()
        toast(' Logged In 👌', { hideProgressBar: true, autoClose: 3000, type: 'success', })
    }


    return (
        <div className="bg-gradient-to-b font-semibold from-purple-100  min-h-20 h-full text-gray-800 w-full ">
            <div className="flex justify-between items-center py-4 mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl md:py-6  w-full ">
                <Link href="/" className="text-xl  lg:text-2xl font-bold ">
                    <span className="text-[#fa8247]">re;</span>
                    po
                </Link>
                <div className="flex flex-col font-sat -space-y-8 sm:hidden" >
                    <button className="transition-all z-50 duration-150 ease-in" onClick={() => setMenuBar(!menuBar)} >
                        {
                            !menuBar && <LuMenu className="w-6 h-6 xs:w-7 xs:h-7" />

                        }
                    </button>
                    {
                        menuBar && (
                            <div className="fixed z-40 top-0 -left-0 w-full h-screen bg-white" >
                                <button className=" z-[99] absolute top-12 right-4 transition-all  duration-150 ease-in" onClick={() => setMenuBar(!menuBar)} >
                                    <LuX className="w-9 h-9 xs:w-10 xs:h-10 stroke-2 fill-gray-700 text-gray-800 border-2 rounded-lg border-slate-500 p-2 " />

                                </button>
                                <div ref={mobileRef} className=" flex sm:hidden flex-col mx-auto items-center space-y-12 justify-start pt-40 text-gray-700 px-6 -py-6 w-full h-screen  bg-gradient-radial  from-purple-100/60 via-purple-100 to-purple-200  " >
                                    <div className=" flex flex-col space-y-12 items-center justify-center text-base ">
                                        <Link href={'/'} onClick={() => setMenuBar(false)} className="flex items-center text-lg  " >
                                            <LuHome className="mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 " />
                                            Home
                                        </Link>
                                        <Link href={'/about'} onClick={() => setMenuBar(false)} className="flex items-center text-lg  " >
                                            <LuInfo className="mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 " />
                                            About
                                        </Link>
                                        <Link href={'/guide'} onClick={() => setMenuBar(false)} className="flex items-center text-lg  " >
                                            <LuGitPullRequest className="mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 " />
                                            Guide
                                        </Link>
                                        <div onClick={() => setIsModalVisible(!isModalVisible)} className="flex items-center text-lg  " >
                                            <LuGitPullRequest className="mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5 " />
                                            Search
                                        </div>
                                        <div className="flex items-center  w-full justify-between">
                                            <div className="relative w-full" ref={mediaDropdownRef}>
                                                <button onClick={handleMediaDropdownToggle} className="flex text-lg items-center ">
                                                    <LuListMinus className="mr-2 xs:mr-3 w-4 h-4 xs:w-5 xs:h-5" />
                                                    Media
                                                </button>
                                                {mediaDropdownOpen ? (
                                                    <div className="absolute z-20 -left-20 mt-2 w-60 rounded-xl  bg-white border border-gray-300 shadow-lg">
                                                        <ul className="p-2">
                                                            <Link href="/media/video">
                                                                <li className="hover:bg-gray-200 rounded-lg cursor-pointer flex items-center px-2 md:px-3 lg:px-4 ">
                                                                    <LuVideo className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
                                                                    <span className="block px-4 py-2 text-sm text-gray-700" onClick={() => { setMediaDropdownOpen(false); setMenuBar(false) }}>
                                                                        Video
                                                                    </span>
                                                                </li>
                                                            </Link>
                                                            <Link href="/media/book">
                                                                <li className="hover:bg-gray-200 rounded-lg cursor-pointer flex items-center px-2 md:px-3 lg:px-4 ">
                                                                    <LuBookOpen className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
                                                                    <span className="block px-4 py-2 text-sm text-gray-700" onClick={() => { setMediaDropdownOpen(false); setMenuBar(false) }}>
                                                                        Book/Blog
                                                                    </span>
                                                                </li>
                                                            </Link>
                                                            <Link href="/media/course">
                                                                <li className="hover:bg-gray-200 rounded-lg cursor-pointer flex items-center px-2 md:px-3 lg:px-4 ">
                                                                    <LuGraduationCap className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
                                                                    <span className="block px-4 py-2 text-sm text-gray-700" onClick={() => { setMediaDropdownOpen(false); setMenuBar(false) }}>
                                                                        Course
                                                                    </span>
                                                                </li>
                                                            </Link>
                                                        </ul>
                                                    </div>
                                                ) : <></>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col space-y-6 items-center justify-between">
                                        {
                                            authReady ? (
                                                userInfo ? (
                                                    <div className="relative" ref={dropdownRef}>
                                                        <button onClick={handleDropdownToggle}
                                                            className="flex items-center "
                                                        >
                                                            <Image
                                                                src={userInfo?.photoURL || Imag}
                                                                width='40'
                                                                height='40'
                                                                alt='user image'
                                                                className="rounded-full"
                                                            />
                                                            <LuChevronDown
                                                                className={` w-4 h-4 transition-all ease-in duration-300 md:h-5 md:w-5 stroke-[1.5px] md:stroke-2 ${dropdownOpen ? 'rotate-180' : ''} `} />
                                                        </button>
                                                        {dropdownOpen ? (
                                                            <div className="absolute left-[50%] top-10 mt-2 w-48 bg-white rounded-md shadow-lg">
                                                                <ul className="p-2 text-start">
                                                                    <Link href='/user/setting' className="hover:bg-gray-800 cursor-pointer">
                                                                        <button onClick={() => { setDropdownOpen(false); setMenuBar(false) }} className="flex w-full px-4 py-2 text-sm hover:bg-gray-200 rounded-lg text-gray-700" >
                                                                            profile
                                                                        </button>
                                                                    </Link>
                                                                    <Link href='/user/add-resource' className="hover:bg-gray-800 cursor-pointer">
                                                                        <button onClick={() => { setDropdownOpen(false); setMenuBar(false) }} className="flex px-4 py-2 text-sm hover:bg-gray-200 w-full rounded-lg text-gray-700" >
                                                                            add resource
                                                                        </button>
                                                                    </Link>
                                                                    <button onClick={handleLogoutMobile} className="flex w-full hover:bg-gray-200 rounded-lg cursor-pointer">
                                                                        <span
                                                                            className="flex w-full px-4 py-2 text-sm text-orange-500"
                                                                        >
                                                                            logout
                                                                        </span>
                                                                    </button>
                                                                </ul>
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                )
                                                    : (
                                                        <div className="flex space-x-3 text-base font-semibold px-3 py-[4px] lg:px-4 border-gray-700">
                                                            <button
                                                                onClick={loginHandler}
                                                                className=" bg-purple-200 text-gray-800/80 shadow-lg text-base font-bold rounded-xl px-5 xs:px-6 py-2 border-gray-700"
                                                            >
                                                                Log In
                                                            </button>
                                                        </div>
                                                    )
                                            ) : (
                                                <div className="flex items-center justify-center bg-white h-10 w-16 rounded-lg space-x-3 text-base  border-gray-700">
                                                    <div className="animate-spin  rounded-full h-4 w-4 sm:h-5 sm:w-5  border-[2.2px] border-r-none border-r-white border-violet-500"> ‎ </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                        )
                    }
                </div>

                <div className=" hidden sm:flex space-x-12 items-center justify-center text-base ">
                    <Link href={'/about'} className="flex items-center text-base hover:text-purple-500 md:text-lg  " >
                        <LuInfo className="mr-2 w-4 h-4 md:w-5 md:h-5 " />
                        About
                    </Link>
                    <Link href={'/guide'} className="flex items-center text-base hover:text-purple-500 md:text-lg  " >
                        <LuGitPullRequest className="mr-2 w-4 h-4 md:w-5 md:h-5 " />
                        Guide
                    </Link>
                    {/* <button onClick={() => setIsModalVisible(!isModalVisible)} className="flex items-center text-base hover:text-purple-500 md:text-lg " >
                        <LuGitPullRequest className="mr-2 w-4 h-4 md:w-5 md:h-5  " />
                        Search
                    </button> */}
                    <div className="flex items-center group  justify-between">
                        <div className="relative " >
                            <button onClick={handleMediaDropdownToggle} className="group-hover:text-purple-500 flex text-base md:text-lg items-center">
                                <LuListMinus className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                                Media
                            </button>
                            <div ref={mediaDropdownRef} className=" group-hover:block absolute hidden top-4 left-0 w-48 ">
                                <ul className="bg-white border-2  rounded-md shadow-lg mt-4 p-2">
                                    <Link href="/media/video">
                                        <li className="hover:bg-gray-200 rounded-lg cursor-pointer flex items-center px-2 md:px-3 lg:px-4 ">
                                            <LuVideo className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="block px-4 py-2 text-sm md:text-base text-gray-700" onClick={() => setMediaDropdownOpen(false)}>
                                                Video
                                            </span>
                                        </li>
                                    </Link>
                                    <Link href="/media/book">
                                        <li className="hover:bg-gray-200 rounded-lg cursor-pointer flex items-center px-2 md:px-3 lg:px-4 ">
                                            <LuBookOpen className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="block px-4 py-2 text-sm md:text-base text-gray-700" onClick={() => setMediaDropdownOpen(false)}>
                                                Book/Blog
                                            </span>
                                        </li>
                                    </Link>
                                    <Link href="/media/course">
                                        <li className="hover:bg-gray-200 rounded-lg cursor-pointer flex items-center px-2 md:px-3 lg:px-4 ">
                                            <LuGraduationCap className="text-gray-700 w-4 h-4 sm:w-5 sm:h-5" />
                                            <span className="block px-4 py-2 text-sm md:text-base text-gray-700" onClick={() => setMediaDropdownOpen(false)}>
                                                Course
                                            </span>
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden sm:flex items-center  justify-between">
                    {
                        authReady ? (
                            userInfo ? (
                                <div className="relative" ref={dropdownRef}>
                                    <button onClick={handleDropdownToggle}
                                        className="flex items-center "
                                    >
                                        <Image
                                            src={userInfo?.photoURL || Imag}
                                            width='40'
                                            height='40'
                                            alt='user image'
                                            className="rounded-full"
                                        />
                                        <LuChevronDown
                                            className={` w-4 h-4 transition-all ease-in duration-300 md:h-5 md:w-5 stroke-[1.5px] md:stroke-2 ${dropdownOpen ? 'rotate-180' : ''} `} />
                                    </button>
                                    {dropdownOpen ? (
                                        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                            <ul className="p-2 text-start border border-gray-300 rounded-xl ">
                                                <Link href='/user/setting' className="hover:bg-gray-800 cursor-pointer">
                                                    <button onClick={() => { setDropdownOpen(false); setDropdownOpen(false) }} className="flex w-full md:text-base px-4 py-2 text-sm hover:bg-gray-200 rounded-lg text-gray-700" >
                                                        profile
                                                    </button>
                                                </Link>
                                                <Link href='/user/add-resource' className="hover:bg-gray-800 cursor-pointer">
                                                    <button onClick={() => { setDropdownOpen(false); setDropdownOpen(false) }} className="flex px-4 py-2 text-sm md:text-base hover:bg-gray-200 w-full rounded-lg text-gray-700" >
                                                        add resource
                                                    </button>
                                                </Link>
                                                <button onClick={handleLogout} className="flex w-full hover:bg-gray-200 rounded-lg cursor-pointer">
                                                    <span
                                                        className="flex w-full px-4 py-2 text-sm md:text-base text-orange-500"
                                                    >
                                                        logout
                                                    </span>
                                                </button>
                                            </ul>
                                        </div>
                                    ) : null}
                                </div>
                            )
                                : (
                                    <div className="flex space-x-3 text-base font-semibold px-3 py-[4px] lg:px-4 ">
                                        <button
                                            onClick={loginHandler}
                                            className=" bg-purple-200 text-gray-800 shadow-lg border-[0.005rem] border-purple-300 shadow-stone-300 text-base font-bold rounded-xl px-3 py-1 md:py-2 lg:px-4 "
                                        >
                                            Log In
                                        </button>
                                    </div>
                                )
                        ) : (
                            <div className="flex items-center justify-center bg-white shadow-xl shadow-purple-100 border-2 h-10 w-16 rounded-lg space-x-3 text-base  border-purple-100">
                                <div className="animate-spin  rounded-full h-4 w-4 sm:h-5 sm:w-5  border-[2.2px] border-r-none border-r-white border-violet-500"> ‎ </div>
                            </div>
                        )
                    }
                </div>
            </div >
        </div>
    );
}

export default Header