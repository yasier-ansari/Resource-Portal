'use client'

import { useState } from "react";
import { LuBraces, LuCircle, LuCircleOff } from "react-icons/lu"
import Img from '@/public/images/thinking-bad.png'
import Img2 from '@/public/images/thinking-repo.webp'
import Image from "next/image";

const Compare = () => {
    const [toggle, setToggle] = useState(true);
    return (
        <div className="pt-12 w-full flex flex-col mx-auto items-center " >
            <div className="flex w-full relative items-center px-12 mx-auto max-w-5xl " >
                <div className="absolute top-[25%] left-[10%] blur-[100px] bg-gradient-to-t to-purple-500 from-violet-400 h-[60%] w-[80%] items-center flex justify-center " ></div>
                <div className="w-full border-2  bg-white backdrop-blur-xl bg-opacity-[0.2] shadow-xl shadow-violet-200 p-3 md:p-4 rounded-lg border-gray-100 " >
                    <div className="bg-white/90 p-3 md:p-4 rounded-lg  flex flex-col items-center justify-center " >
                        <div className="flex mt-2 md:mt-0 justify-center space-x-2 p-1 border-2 border-gray-400 rounded-xl " >
                            <button onClick={() => setToggle(!toggle)} className={`text-gray-600 p-2 md:px-4 md:py-3 rounded-lg ${toggle && "bg-purple-200   "} `} >
                                <LuCircleOff className="stroke-2  " />
                            </button>
                            <button onClick={() => setToggle(!toggle)} className={`text-gray-600 p-2 md:px-4 md:py-3 rounded-lg ${!toggle && "bg-purple-200   "} `} >
                                <LuCircle className="stroke-2  " />
                            </button>
                        </div>
                        <div class="flex flex-col trasnsition-all duration-300 md:flex-row items-center justify-center md:justify-between px-4 md:px-6 lg:px-10 mt-8 mb-8 space-y-8 md:space-y-0 ">
                            <div className="h-full w-full xs:w-[90%] sm:w-[85%] md:basis-[40%] lg:basis-[40%] overflow-hidden group group-hover:drop-shadow-sm shadow-gray-200 drop-shadow-md md:w-full rounded-[1.1rem] aspect-[16/12] shadow-lg  border border-violet-200 ">
                                <Image
                                    src={toggle ? Img : Img2}
                                    width={1600}
                                    height={800}
                                    alt="non"
                                    className="group-hover:shadow-md shadow-black  drop-shadow-xl group-hover:scale-110 transition-all ease-in duration-300 "
                                />
                            </div>
                            <div className="md:basis-[50%] lg:basis-[50%] h-full w-full flex flex-col items-center md:items-start space-y-4  " >
                                <div className="text-center text-base sm:text-lg md:text-xl xl:text-2xl font-semibold " >
                                    <p className="text-center" >With Re;po</p>
                                </div>
                                <div className="text-start" >
                                    <ul>
                                        <li>point 1</li>
                                        <li>point 2</li>
                                        <li>point 3</li>
                                        <li>poiunt 4</li>
                                        <li>poiunt 5</li>
                                        <li>poiunt 6</li>
                                        <li>poiunt 7</li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="flex z-10  mt-12 max-w-2xl text-base md:text-lg lg:text-xl font-medium text-gray-800 " >
                Convinced ? start your journey with Re;po 🚀 and elevate your tech skills, Invest your precious time and energy in actually learning something useful, rather than wasting it on resources hunting.
            </div>
            <div className="flex z-10 space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 mt-6 lg:mt-8 " >
                <button className="px-3 py-2 md:px-6 md:py-3 lg:px-8 text-base md:text-lg lg:text-xl bg-gradient-to-tr font-medium from-violet-300 via-purple-500 to-purple-400 rounded-xl text-white " >Media</button>
                <button className="px-3 py-2 md:px-6 md:py-3 lg:px-8 text-base md:text-lg lg:text-xl bg-gradient-to-tr from-white via-purple-50 to-white/90 border-2 border-purple-400 text-purple-500 rounded-xl font-medium leading-7 " >Guide</button>
            </div>
        </div>




    )
}

export default Compare