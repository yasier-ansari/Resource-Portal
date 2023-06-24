'use client'

import { LuHeart } from "react-icons/lu"

const CardLoading = ({ key }) => {
    return (
        <>
            {/* <div className="w-full flex flex-col group hover:border-green-500 hover:border-2 hover:scale-105 transition-all ease-linear rounded-2xl border-2 space-y-4 border-black/40 shadow-md h-64 sm:h-72 md:h-[20rem] lg:h-[22rem]   ">
                <div className=" h-[60%] overflow-hidden p-2 md:p-3 lg:p-4 pb-0 md:pb-0 lg:pb-0 " >
                    <div className="h-full bg-green-100 animate-pulse overflow-hidden group-hover:drop-shadow-sm shadow-black drop-shadow-md w-full rounded-[1.1rem] relative  " >
                    </div>
                </div>
                <div className=" animate-pulse h-[40%] flex justify-start text-start flex-col space-y-4 px-3 md:px-4 lg:px-5 " >
                    <div className="flex justify-between font-bold text-lg md:text-xl" >
                        <p className="font-medium w-20 md:w-28 lg:w-32  h-4 md:h-6 lg:h-7 bg-gray-200 rounded-md text-xs " ></p>
                        <p className="px-2 w-10  md:w-12 lg:w-16  h-4 bg-orange-300/80  rounded-xl text-xs font-semibold text-black/70 " >
                        </p>
                    </div>
                    <p className="text-base bg-gray-200 h-[55%]  w-[100%] rounded-lg  md py-1 lg:text-[1.01rem]" ></p>
                </div>
            </div> */}
            <div
                key={key}
                className="flex flex-col animate-pulse group hover:border-purple-500 hover:shadow-xl hover:shadow-purple-100 hover:border hover:scale-105 transition-all ease-linear bg-white rounded-2xl border-2 space-y-4 border-black/5 shadow-md py-2 xs:py-3 sm:py-4 min-h-[18rem] xs:min-h-[19rem] sm:min-h-[20rem] md:min-h-[21rem] lg:min-h-[22rem] xl:min-h-[23rem] will-change-auto w-[250px] xs:w-[270px] md:w-[300px] lg:w-[350px]  "
            >
                <div
                    className="h-[60%] relative overflow-hidden px-2 md:px-3 lg:px-4 pb-0 md:pb-0 lg:pb-0"
                >
                    <div className="h-full overflow-hidden group-hover:drop-shadow-sm shadow-black bg-purple-100/70 drop-shadow-md w-full rounded-[1.1rem] aspect-[16/10] ">
                    </div>
                    <button class="flex absolute top-0 right-3 rounded-lg z-10  bg-white/90 p-2 md:p-3 ">
                        <LuHeart className={`h-3 w-3 xs:h-4 xs:w-4 md:h-5 stroke-purple-600 md:w-5 `} />
                    </button>
                </div>
                <div className="h-[40%] flex justify-start text-start flex-col space-y-2 xs:space-y-3 md:space-y-4 px-3 md:px-4 lg:px-5">
                    <div className="flex justify-between h-4 font-bold  items-center text-lg md:text-xl">
                        <div className="bg-gray-300 h-full w-full rounded-lg basis-[60%] " >
                        </div>
                        <p className="px-2 w-full border-[#f8ab85] border-2 basis-[10%] bg-[#f8ab8541] rounded-xl h-full text-xs font-semibold text-black/70">
                        </p>
                    </div>
                    <p className=" h-full bg-gray-100 rounded-lg text-base lg:text-[1.01rem]">

                    </p>
                </div>
            </div >
        </>
    )
}

export default CardLoading