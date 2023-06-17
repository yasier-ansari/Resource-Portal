'use client'

import Link from "next/link"
import Image from "next/image";
import { useContext, useState, useRef, useEffect } from "react";
import { FiChevronDown } from 'react-icons/fi'
import { FiCommand, FiGitPullRequest } from "react-icons/fi";
import { TbListDetails, TbInfoSquareRounded } from 'react-icons/tb'
import { AuthContext } from "@/hooks/AuthContext";
import { useSession } from "@/hooks/useSession";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const mediaDropdownRef = useRef(null);
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

    useEffect(() => {
        document.addEventListener("mousedown", (event) => handleClickOutside(event, dropdownRef, setDropdownOpen));
        // document.addEventListener("mousedown", (event) => handleClickOutside(event, mediaDropdownRef, setMediaDropdownOpen));
        return () => {
            document.removeEventListener("mousedown", (event) => handleClickOutside(event, dropdownRef, setDropdownOpen));
            // document.removeEventListener("mousedown", (event) => handleClickOutside(event, mediaDropdownRef, setMediaDropdownOpen));
        };
    }, []);
    const { login, session, logout } = useSession();
    const { toggleModal, loading, userInfo, setIsModalVisible } = useContext(AuthContext);

    const loginHandler = async () => {
        await login()
        toast(' Logged In 👌', { hideProgressBar: true, autoClose: 3000, type: 'success', })
    }


    return (
        <div className="bg-[#320760] font-sat text-white ">
            <div className="flex font- font-semibold justify-between items-center py-4 mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl md:py-6 ">
                <Link href="/" className="text-lg md:text-xl lg:text-2xl font-extrabold ">
                    <span className="text-[#fa8247]">re;</span>
                    po
                </Link>
                <div className=" flex space-x-12 items-center justify-center text-base font-semibold">
                    <Link href={'/about'} className="flex items-center text-md md:text-lg font-bold " >
                        <TbInfoSquareRounded className="mr-2 w-4 h-4 md:w-5 md:h-5 " />
                        About
                    </Link>
                    <Link href={'/guide'} className="flex items-center text-md md:text-lg font-bold " >
                        <FiGitPullRequest className="mr-2 w-4 h-4 md:w-5 md:h-5 " />
                        Guide
                    </Link>
                    <div className="flex items-center justify-between">
                        <div className="relative" ref={mediaDropdownRef}>
                            <button onClick={handleMediaDropdownToggle} className="flex items-center">
                                <TbListDetails className="mr-2 w-4 h-4 md:w-5 md:h-5" />
                                Media
                            </button>
                            {mediaDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                    <ul className="p-2">
                                        <Link href="/media?type=video" passHref>
                                            <li className="hover:bg-gray-200 rounded-lg cursor-pointer">
                                                <a className="block px-4 py-2 text-sm text-gray-700" onClick={() => setMediaDropdownOpen(false)}>
                                                    Video
                                                </a>
                                            </li>
                                        </Link>
                                        <Link href="/media?type=book" passHref>
                                            <li className="hover:bg-gray-200 rounded-lg cursor-pointer">
                                                <a className="block px-4 py-2 text-sm text-gray-700" onClick={() => setMediaDropdownOpen(false)}>
                                                    Book/PDF
                                                </a>
                                            </li>
                                        </Link>
                                        <Link href="/media?type=course" passHref>
                                            <li className="hover:bg-gray-200 rounded-lg cursor-pointer">
                                                <a className="block px-4 py-2 text-sm text-gray-700" onClick={() => setMediaDropdownOpen(false)}>
                                                    Courses
                                                </a>
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    {userInfo ? (
                        <div className="relative" ref={dropdownRef}>
                            <button onClick={handleDropdownToggle}
                                className="flex items-center "
                            >
                                <Image
                                    src={userInfo?.photoURL}
                                    width='40'
                                    height='40'
                                    alt='user image'
                                    className="rounded-full"
                                />
                                <FiChevronDown
                                    className={` w-4 h-4 transition-all ease-in duration-300 md:h-5 md:w-5 stroke-[1.5px] md:stroke-2 ${dropdownOpen ? 'rotate-180' : ''} `} />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                    <ul className="p-2">
                                        <Link href='/user/setting' className="hover:bg-gray-800 cursor-pointer">
                                            <p onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-200 rounded-lg text-gray-700" href="#">
                                                Profile
                                            </p>
                                        </Link>
                                        <li className="hover:bg-gray-200 rounded-lg cursor-pointer">
                                            <button
                                                className="block px-4 py-2 text-sm text-orange-500"
                                            // onClick={handleLogout}
                                            >
                                                Add Resources
                                            </button>
                                        </li>
                                        <li className="hover:bg-gray-200 rounded-lg cursor-pointer">
                                            <button
                                                className="block px-4 py-2 text-sm text-orange-500"
                                                onClick={handleLogout}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex space-x-3 text-base font-semibold px-3 py-[4px] lg:px-4 border-gray-700">
                            <button
                                onClick={loginHandler}
                                className="hidden bg-zinc-100 text-black md:block text-base font-bold rounded-xl px-3 py-1 md:py-2 lg:px-4 border-gray-700"
                            >
                                Log In
                            </button>
                        </div>
                    )}
                </div>
            </div >
        </div>
    );
}

export default Header