import Image from "next/image"
import Link from "next/link"
import Img from '@/public/blo.jpg'
import { LuBookmark, LuHeart } from "react-icons/lu"
import { useState } from "react"

const RersourceCard = ({ obj }) => {
    const [likedResource, setLikedResource] = useState(false);
    const [disableButton, setDisableButton] = useState(false);
    const likeHandler = () => {
        setLikedResource(!likedResource);
        setDisableButton(true);
        setTimeout(() => {
            setDisableButton(false);
        }, 1000)
    }
    return (
        <>
            <div
                key={obj.id}
                className="flex flex-col group hover:border-purple-500 hover:shadow-xl hover:shadow-purple-100 hover:border hover:scale-105 transition-all ease-linear bg-white rounded-2xl border-2 space-y-4 border-black/5 shadow-md py-2 xs:py-3 sm:py-4 min-h-[18rem] xs:min-h-[19rem] sm:min-h-[20rem] md:min-h-[21rem] lg:min-h-[22rem] xl:min-h-[23rem] will-change-auto w-auto max-w-[350px] md:max-w-[380px] lg:max-w-[450px] "
            >
                <div
                    className="h-[60%] relative overflow-hidden px-2 md:px-3 lg:px-4 pb-0 md:pb-0 lg:pb-0"
                >
                    <div className="h-full overflow-hidden group-hover:drop-shadow-sm shadow-black drop-shadow-md w-full rounded-[1.1rem] aspect-[16/10] ">

                        <Image
                            src={Img}
                            width={1600}
                            height={800}
                            alt="non"
                            className="group-hover:shadow-md shadow-black drop-shadow-md group-hover:scale-105 transition-all ease-in"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <button onClick={likeHandler} disabled={disableButton} class="flex absolute top-0 right-3 rounded-lg z-10  bg-white/90 p-2 md:p-3 ">
                        {
                            disableButton ? (
                                <div className="animate-spin  rounded-full h-4 w-4 sm:h-5 sm:w-5  border-[2.2px] border-r-none border-r-violet-500 border-violet-500/30 "></div>
                            ) : (
                                <LuHeart className={`h-3 w-3 xs:h-4 xs:w-4 md:h-5 stroke-purple-600 md:w-5 ${likedResource ? ' fill-purple-400  stroke-purple-500 ' : '  '} ${disableButton && ' cursor-not-allowed '} `} />
                            )
                        }

                    </button>
                    {/* <div class="flex items-center mx-auto w-[90%] xs:w-[85%] sm:-[80%] md:w-[75%] lg:w-[70%] xl:w-[65%] ">
                        <div className="relative w-full h-full aspect-video ">
                            <Image
                                src={Img}
                                alt="Image description"
                                className="rounded-[2rem] object-cover aspect-video"
                            />
                        </div>
                    </div> */}
                </div>
                <div className="h-[40%] flex justify-start text-start flex-col space-y-2 xs:space-y-3 md:space-y-4 px-3 md:px-4 lg:px-5">
                    <div className="flex justify-between font-bold items-center text-lg md:text-xl">
                        <Link href={`/resource/${obj.title.replace(/\s+/g, "-")}`}>
                            {obj.title}
                        </Link>
                        <p className="px-2 border-[#f8ab85] border-2 bg-[#f8ab8541] w-max rounded-lg h-max text-xs font-semibold text-black/70">
                            {obj.mainTag}
                        </p>
                    </div>
                    <p className="text-base lg:text-[1.01rem]">{obj.subTitle}</p>
                </div>
            </div >

        </>
    )
}

export default RersourceCard