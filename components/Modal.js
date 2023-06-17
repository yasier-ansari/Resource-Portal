'use client'
import { AuthContext } from "@/hooks/AuthContext";
import { useContext, useEffect, useRef, useState } from "react"
import Image from 'next/image'
import { RiHome3Line } from "react-icons/ri";
import { TbInfoSquareRounded, TbListDetails } from "react-icons/tb";
import { FiGitPullRequest } from 'react-icons/fi'
const Modal = ({ type }) => {
    const { setIsModalVisible } = useContext(AuthContext);
    const dropdownRef = useRef(null);
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsModalVisible(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    if (type == "search") {
        return (
            <div className="fixed inset-0 z-50  flex justify-center items-center">
                <div ref={dropdownRef} className="flex flex-col w-[90%] sm:w-[80%] md:w-[60%] xl:w-[40%] 2xl:w-[35%] max-w-3xl rounded-lg backdrop-grayscale-75 bg-opacity-[65%] backdrop-filter backdrop-blur-lg bg-stone-300 ">
                    <div className="text-white" >
                        <input type="text" className="p-4 w-full focus:outline-none rounded-lg bg-inherit text-white placeholder:text-gray-600 " placeholder="Search for Resources, Media ...." />
                    </div>
                    <div className="w-full h-[1px] bg-stone-500 rounded-lg " ></div>
                    <div className="p-2 flex flex-col justify-start space-y-1" >
                        <div className="flex space-x-4 items-center py-1 px-3 hover:bg-gray-100/40 rounded-lg " >
                            <RiHome3Line className="h-4 w-4 lg:h-5 lg:w-5" />
                            <p>Home</p>
                        </div>
                        <div className="flex space-x-4 items-center py-1 px-3 hover:bg-gray-100/40 rounded-lg " >
                            <TbInfoSquareRounded className="h-4 w-4 lg:h-5 lg:w-5" />
                            <p>Home</p>
                        </div>
                        <div className="flex space-x-4 items-center py-1 px-3 hover:bg-gray-100/40 rounded-lg " >
                            <FiGitPullRequest className="h-4 w-4 lg:h-5 lg:w-5" />
                            <p>Home</p>
                        </div>
                        <div className="flex space-x-4 items-center py-1 px-3 hover:bg-gray-100/40 rounded-lg " >
                            <TbListDetails className="h-4 w-4 lg:h-5 lg:w-5" />
                            <p>Home</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <>
                login modal
            </>
        )
    }
}

export default Modal