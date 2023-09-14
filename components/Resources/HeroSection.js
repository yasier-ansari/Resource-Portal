import React from 'react'
import Breadcrumb from "../small/Breadcrumbs"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion"

const HeroSection = ({ urlPath, Src, para }) => {
    const router = usePathname();
    const page = router.split('/');
    const [currentIndex, setCurrentIndex] = useState(0);
    const contentList = [
        {
            src: 'https://framerusercontent.com/images/ivXke7DOaYVf7BwdxzeZWA73HOM.jpg',
            title: 'Title 1',
            subtitle: 'Subtitle 1',
            tag: 'Tag 1',
        },
        {
            src: 'https://framerusercontent.com/images/eJBrXen4h2CuAtUy5yC4PcKsIlA.jpg',
            title: 'Title 2',
            subtitle: 'Subtitle 2',
            tag: 'Tag 2',
        },
        {
            src: 'https://framerusercontent.com/images/ivXke7DOaYVf7BwdxzeZWA73HOM.jpg',
            title: 'Title 1',
            subtitle: 'Subtitle 1',
            tag: 'Tag 1',
        },
        {
            src: 'https://framerusercontent.com/images/eJBrXen4h2CuAtUy5yC4PcKsIlA.jpg',
            title: 'Title 2',
            subtitle: 'Subtitle 2',
            tag: 'Tag 2',
        },
        {
            src: 'https://framerusercontent.com/images/ivXke7DOaYVf7BwdxzeZWA73HOM.jpg',
            title: 'Title 1',
            subtitle: 'Subtitle 1',
            tag: 'Tag 1',
        },
        {
            src: 'https://framerusercontent.com/images/eJBrXen4h2CuAtUy5yC4PcKsIlA.jpg',
            title: 'Title 2',
            subtitle: 'Subtitle 2',
            tag: 'Tag 2',
        },
    ];
    const { src, title, subtitle, tag } = contentList[currentIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % contentList.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [contentList.length]);

    const variants = {
        enter: (direction) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            };
        }
    };
    return (
        <AnimatePresence>
            <div className="relative mt-12 w-full mx-auto text-center flex  justiy-between h-full min-h-[400px] max-h-[650px] max-w-7xl px-10 md:px-16 lg:px-32" >
                <div className=" basis-[40%] py-12 items-start text-start justify-center flex max-x-xl flex-col " >
                    <Breadcrumb urlPath={urlPath} />
                    <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl mt-2 " >
                        <span class="font-bold bg-gradient-to-t from-purple-400  via-violet-600 to-violet-400 bg-clip-text text-transparent">Accelerate </span> your learning with <span class="font-bold bg-gradient-to-t from-orange-300 to-red-400 via-rose-500 bg-clip-text text-transparent"> {page[page.length - 1]}s </span> </h2>
                    <p className="mt-12" >
                        {para}
                    </p>
                </div>
                <div
                    key={currentIndex}
                    className="flex basis-[60%] overflow-hidden rounded-[5rem] bg-gradient-to-tl from-blue-400 via-pink-300 to-violet-300 transition-all relative items-stretch justify-center h-auto max-h-[500px]"
                >
                    <motion.img
                        key={src}
                        initial={{ x: 300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 1 }
                        }}
                        className=" object-cover aspect-[2/1] w-full h-full rounded-[5rem] "
                        src={src}
                        alt="video alt"
                    />
                    <div className={`absolute flex items-end justify-center w-full h-full  rounded-[5rem] z-40 `}>
                        <div
                            key={title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 300 },
                                opacity: { duration: 0.2 }
                            }}
                            className="flex flex-col justify-between w-full p-12 bg-gradient-to-t from-black/40 via-black/15 to-transparent h-min  text-gray-300 rounded-b-[5rem]"
                        >
                            <div
                                key={title}
                                className="flex items-center justify-between"
                            >
                                <h4
                                    key={title}
                                    className="text-lg sm:text-xl lg:text-2xl font-semibold"
                                >
                                    {title}
                                </h4>
                                <span
                                    key={tag}
                                    className="px-3 py-1 text-xs bg-purple-300/70 text-white rounded-full"
                                >
                                    {tag}
                                </span>
                            </div>
                            <div
                                key={subtitle}
                                className="flex"
                            >
                                {subtitle}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="relative w-full h-[70px] mb-[40px] flex items-center justify-center">
                <div class="down-arrow absolute w-0 -top-4 h-16 border-gray-500 border-2 rounded-[0.1rem] animate-jump  after:w-4 after:h-4 after:border-b-4 after:border-r-4 after:border-gray-500 after:rotate-45 after:top-[47px] after:content-[' '] after:absolute after:border-b-4 after:border-r-4 after:rounded-[2px] after:-left-[8px]  "></div>
            </div>
        </AnimatePresence>
    )
}

export default HeroSection