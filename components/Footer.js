'use client'
import Image from "next/image"
import { FiGithub, FiYoutube } from "react-icons/fi"

const Footer = () => {
    return (
        <div className="flex flex-col items-center md:pb-6 lg:pb-4 justify-center  " >
            <div className="flex relative pt-2 md:px-8 lg:px-12 lg:pb-4 h-full mx-auto ">
                <div className="absolute right-6 -top-4 lg:right-40 lg:-top-6 z-10 h-20 w-20 rounded-full border-[2px] border-black bg-white ">
                    <Image src='https://cdn.cdnlogo.com/logos/e/21/elastic-stack.svg' fill className="rounded-full rotate-[25deg] " alt="circular-logo" />
                </div>
                <div className=" bg-[#2cb04d] pb-14 pt-12 md:py-12 w-full rounded-t-xl md:rounded-xl flex flex-col space-y-12 md:space-y-0 sm:space-y-16 justify-center md:flex-row md:justify-start px-3 md:px-8 lg:px-12" >
                    <div className="flex md:basis-[35%] lg:basis-[30%] flex-col space-y-4 md:space-y-8 lg:space-y-12 sm:space-y-6 " >
                        <div className="flex flex-col -space-y-[0.07rem] text-xl md:text-2xl font-bold "  >
                            <div className=" bg-black w-max text-white px-6 md:px-8 lg:px-10 py-2 md:py-3 lg:py-4 rounded-[10rem] border-2 " >Subscribe</div>
                            <div className=" px-6 md:px-8 w-max bg-white border-2 border-black/90 lg:px-10 py-2 md:py-3 lg:py-4 rounded-[10rem] " > to our updates </div>
                        </div>
                        <div className=" w-full md:w-max" >
                            <div className="flex justify-between shadow-black/40 bg-white font-semibold border rounded-2xl  duration-75 transition-all overflow-hidden ease-in-out drop-shadow-2xl shadow-md ">
                                <label className=" flex rounded-lg  relative" >
                                    <input placeholder=" jhon@doe.mail" className="w-full placeholder:font-semibold placeholder:text-gray-500 placeholder:pl-0 bg-white  py-1 md:py-2 outline-none px-6 " />
                                </label>
                                <button className="bg-orange-500 text-white rounded-xl py-2 px-3 md:px-4 m-1" >send</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex md:basis-[65%] px-3 md:px-0 lg:basis-[70%] md:pl-4 lg:pl-16 text-white flex-col space-y-4 sm:space-y-6 text-start " >
                        <p className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl " >Re;po</p>
                        <p className="text-base md:text-lg font-semibold text-black " >
                            Ultimate resource portal for tech students, providing access to an array of valuable resources that are difficult to find elsewhere.  From DSA to Game Dev , Re;po is a magical and indispensable resource for anyone seeking to expand their tech expertise
                        </p>
                        <div className="flex flex-wrap gap-12 justify-start">
                            <FiGithub className=" bg-green-800 rounded-full p-2 lg:px-3 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
                            <FiYoutube className=" bg-green-800 rounded-full p-2 lg:px-3 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
                        </div>
                    </div>
                </div>

            </div>
            <a href="https://www.github.com/yasier-ansari/re-po" target="blank" rel="noreferrer" className=" absolute bottom-2 md:bottom-8 lg:bottom-0 lg:text-black text-white opacity-75 lg:relative  font-semibold lg:opacity-[65%] hover:opacity-[90%] items-center mx-auto   " >Made with 💖  by yasier </a>
        </div>
    )
}

export default Footer