'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { GrFormEdit } from "react-icons/gr";

export default function Media() {
    const router = useRouter();

    // useEffect(() => {
    //     const redirectTo = async () => {
    //         router.push('/user/profile')
    //     }
    //     return redirectTo;
    // }, []);

    return (
        <div class="flex flex-col justify-center md:justify-start self-start items-center md:items-start gap-4 mx-auto pt-10 pb-16 px-4 sm:px-6 md:px-0 w-full animate-pulse ">
            <div className="w-[90%] sm:w-[80%] md:w-[70%] px-5 md:px-0 flex flex-col items-center md:items-start space-y-2 md:space-y-3" >
                <h3 className="font-semibold text-start h-9 md:h-10  lg:h-12 w-full rounded-xl bg-purple-300/50  " ></h3>
                <p className="font-semibold text-start h-6 lg:h-8 w-[70%] sm:w-[80%] md:w-[90%] rounded-xl bg-gray-200 " >  </p>
            </div>
            <div className="flex flex-grow w-full h-full items-center md:items-start justify-center md:justify-start ">
                <div className=" aspect-[5/4] relative w-32 md:w-36 lg:w-40 rounded-xl bg-gray-200 ">
                    <div className="absolute bottom-2 right-2 bg-gray-300 rounded-[20px] p-1 ">
                        <GrFormEdit className="h-4 w-4 md:h-5 md:w-5" />
                    </div>
                </div>
            </div>
            <div className="py-3 space-y-4 w-[90%] sm:w-[80%] md:w-full ">
                <div className="text-base flex flex-col space-y-1 md:space-y-2 items-start w-full max-w-lg">
                    <p className="bg-purple-200/60  max-w-xs w-[45%] md:w-[40%] lg:w-[35%] rounded-lg h-4 md:h-5  " ></p>
                    <div className="bg-gray-200 w-full rounded-xl h-8 sm:h-9 md:h-10" ></div>
                </div>
                <div className="text-base flex flex-col space-y-1 md:space-y-2 items-start w-full max-w-lg">
                    <p className="bg-purple-200/60  max-w-xs w-[45%] md:w-[40%] lg:w-[35%] rounded-lg h-4 md:h-5  " ></p>
                    <div className="bg-gray-200 w-full rounded-xl h-8 sm:h-9 md:h-10" ></div>
                </div>
                <div className="text-base flex flex-col space-y-1 md:space-y-2 items-start w-full max-w-lg">
                    <p className="bg-purple-200/60  max-w-xs w-[45%] md:w-[40%] lg:w-[35%] rounded-lg h-4 md:h-5  " ></p>
                    <div className="bg-gray-200 w-full rounded-xl h-8 sm:h-9 md:h-10" ></div>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
}
