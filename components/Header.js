'use client'

import Link from "next/link"
import Image from "next/image";
import { useContext, useState, useRef, useEffect } from "react";
import { RxCaretDown } from 'react-icons/rx'
import { FiCommand, FiGitPullRequest } from "react-icons/fi";
import { TbListDetails, TbInfoSquareRounded } from 'react-icons/tb'
import { AuthContext } from "@/hooks/AuthContext";
import { useSession } from "@/hooks/useSession";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

const Header = () => {
    const { login, session, logout } = useSession();
    const { toggleModal, loading, userInfo } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };
    function loginWithGitHub() {
        return new Promise((resolve, reject) => {
            login()
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    const handleLogout = () => {
        setDropdownOpen(false);
        logout();
        toast('Logged Out', { hideProgressBar: true, autoClose: 2000, type: 'success', });
        router.push('/');
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };
    const loginHandler = () => {
        toast.promise(loginWithGitHub, {
            pending: 'Getting your Data',
            success: ' Logged In 👌',
            error: ' Login Error 🤯'
        })
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-[#320760] text-white ">
            <div className="flex font-sat font-semibold justify-between items-center py-4 mx-auto px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl md:py-6 ">
                <Link href="/" className="text-lg md:text-xl lg:text-2xl font-extrabold ">
                    <span className="text-[#fa8247]">re;</span>
                    po
                </Link>
                <div className="flex space-x-12 items-center justify-center text-base font-semibold">
                    <div className="flex items-center text-md md:text-lg font-bold " >
                        <TbInfoSquareRounded className="mr-2 w-4 h-4 md:w-5 md:h-5 " />
                        About
                    </div>
                    <div className="flex items-center text-md md:text-lg font-bold " >
                        <FiGitPullRequest className="mr-2 w-4 h-4 md:w-5 md:h-5 " />
                        Guide
                    </div>
                    <div className="flex items-center text-md md:text-lg font-bold " >
                        <FiCommand className="mr-2 w-4 h-4 md:w-5 md:h-5 " />
                        Search
                    </div>
                    <div className="flex items-center text-md md:text-lg font-bold " >
                        <TbListDetails className="mr-2 w-4 h-4 md:w-5 md:h-5 " />
                        Media
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
                                <RxCaretDown
                                    className={` w-4 h-4 transition-all ease-linear duration-150 md:w-5 md:h-5 ${dropdownOpen ? 'rotate-180' : ''} `} />
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
                                                className="block px-4 py-2 text-sm text-rose-500"
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
                                className="hidden bg-green-600/80 text-white md:block text-base font-bold rounded-xl px-3 py-1 md:py-2 lg:px-4 border-gray-700"
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