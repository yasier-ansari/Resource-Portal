import Image from "next/image";
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion"

const AutoScrollDiv = ({ contentList }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { src, title, subtitle, tag } = contentList[currentIndex];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % contentList.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [contentList.length]);

    return (
        <AnimatePresence>
            <div
                key={currentIndex}
                className="flex basis-[3/5] bg-green-100 transition-all relative items-stretch justify-center h-auto max-h-[500px]"
            >
                <img
                    key={src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className=" w-full h-full rounded-[5rem] p-12 bg-red-100"
                    src={src}
                    alt="video alt"
                />
                <div className={`absolute flex items-end justify-center w-full h-full p-12 rounded-[5rem] z-40 `}>
                    <div
                        key={title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col justify-between w-full p-4 bg-gradient-to-t from-black/40 via-black/15 to-transparent h-min pt-8 text-gray-300 rounded-b-[2rem]"
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
        </AnimatePresence>
    );
};

export default AutoScrollDiv;
