'use client'

const CardLoading = ({ key }) => {
    return (
        <>
            <div className="w-full flex flex-col group hover:border-green-500 hover:border-2 hover:scale-105 transition-all ease-linear rounded-2xl border-2 space-y-4 border-black/40 shadow-md h-64 sm:h-72 md:h-[20rem] lg:h-[22rem]   ">
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
            </div>
        </>
    )
}

export default CardLoading