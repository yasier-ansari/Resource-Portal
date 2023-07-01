'use client'

import { useState } from 'react'
import Image from "next/image"
import { LuMailCheck } from "react-icons/lu"
import Ima from '@/public/images/news-bg.svg'
import Im from '@/public/images/elastic-stack.png'
import { toast } from "react-toastify"

const Newsletter = () => {
    const [subscribeEmail, setSubscribeEmail] = useState('');
    const newsFuncHandler = async () => {
        toast(" Email  Out", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
        });
    }
    const newsEmailHandler = (text) => {
        setSubscribeEmail(text);
    }
    return (
        <div className="flex flex-col relative h-full w-full max-w-2xl mx-auto items-center justify-center pt-20">
            <div className="absolute top-[50%] left-[50%] translate translate-x-[-50%] translate-y-[-40%] h-full w-full">
                <Image src={Ima} width={5000} height={900} alt="newsletter" className="h-full w-full object-contain opacity-50" />
            </div>
            <div className="flex flex-col items-center justify-center pt-10 z-10 space-y-6">
                <div className="aspect-square bg-gradient-to-t from-violet-100 to-purple-100 border rounded-xl max-w-[80px] relative w-full h-full">
                    <Image src={Im} fill alt="newsletter img" />
                </div>
                <div className="w-full font-medium flex flex-col space-y-3 max-w-lg px-10 sm:px-12 md:px-0">
                    <h4 className="font-semibold  text-xl md:text-2xl lg:text-3xl  ">Newsletter!</h4>
                    <p>Our Newsletter brings you the latest tech news and repo updates straight to your email every month</p>
                </div>
            </div>
            <div className="flex mt-4 md:mt-6 justify-between lg:space-x-4 items-center  border border-gray-400 rounded-xl px-2 py-2 shadow-lg max-w-[450px] w-full h-12 lg:h-14">
                <input type="email" name="newsletter" value={subscribeEmail} onChange={(e) => newsEmailHandler(e.target.value)} className=" py-2 px-2 rounded-lg grow w-full h-full  " placeholder="your email address" />
                <div className=" items-center hidden sm:flex justify-center p-2  rounded-xl bg-violet-100 ">
                    <LuMailCheck className=" h-5 w-5  text-violet-600  " />
                </div>
            </div>
            <button onClick={newsFuncHandler} className="mt-6 text-white text-base md:text-lg px-4 md:px-6 py-2 font-semibold bg-gradient-to-tr from-violet-400 to-purple-500 rounded-lg flex items-center justify-center">Subscribe!
            </button>
        </div>
    )
}

export default Newsletter