import Image from "next/image"
import Link from "next/link"
import Img from '@/public/blo.jpg'

const RersourceCard = ({ obj }) => {
    return (
        <>
            <div
                key={obj.id}
                className="flex flex-col group hover:border-purple-500 hover:shadow-xl hover:shadow-purple-100 hover:border hover:scale-105 transition-all ease-linear bg-white rounded-2xl border-2 space-y-4 border-black/5 shadow-md w-[20rem] xl:w-[22rem] h-72 md:h-[20rem] lg:h-[22rem]"
            >
                <Link
                    href={`/resource/${obj.title.replace(/\s+/g, "-")}`}
                    className="h-[60%] overflow-hidden p-2 md:p-3 lg:p-4 pb-0 md:pb-0 lg:pb-0"
                >
                    <div className="h-full overflow-hidden group-hover:drop-shadow-sm shadow-black drop-shadow-md w-full rounded-[1.1rem] relative">
                        <Image
                            src={Img}
                            fill
                            alt="non"
                            className="group-hover:shadow-md shadow-black drop-shadow-md group-hover:scale-105 transition-all ease-in"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </Link>
                <div className="h-[40%] flex justify-start text-start flex-col px-3 md:px-4 lg:px-5">
                    <div className="flex justify-between font-bold text-lg md:text-xl">
                        <Link href={`/resource/${obj.title.replace(/\s+/g, "-")}`}>
                            {obj.title}{" "}
                            <sup className="font-medium text-xs">{obj.language.slice(0, 2).toLowerCase()}</sup>{" "}
                        </Link>
                        <p className="px-2 border-[#f8ab85] border-2 bg-[#f8ab8541] w-max rounded-xl h-max text-xs font-semibold text-black/70">
                            {obj.mainTag}
                        </p>
                    </div>
                    <p className="text-base lg:text-[1.01rem]">{obj.subTitle}</p>
                </div>
            </div>
        </>
    )
}

export default RersourceCard