import Image from "next/image"
import { SiTailwindcss } from "react-icons/si"
import { TbBrandFirebase, TbBrandReactNative } from "react-icons/tb"

const Footer = () => {
    return (
        <footer className="relative bg-gradient-to-t from-purple-100/70 ">
            <div className="flex relative h-full max-w-[80rem] w-full justify-center mx-auto text-gray-800   ">
                <div className="absolute right-6  -top-4 lg:right-40 lg:-top-6 z-10  rounded-full shadow-lg border-black bg-white ">
                    <Image src='https://cdn.cdnlogo.com/logos/e/21/elastic-stack.svg' width={50} height={50} className=" rounded-full rotate-[25deg] " alt="circular-logo" />
                </div>
                <div className=" max-w-6xl px-8 xs:px-12 sm:px-16 md:px-24 lg:px-32 py-6 md:py-8 lg:py-10 w-full flex flex-col space-y-12 md:space-y-0 sm:space-y-20 justify-between md:flex-row md:justify-between items-center " >
                    <div className=" order-3 md:order-1 flex md:basis-[35%] mt-8 sm:mt-12 md:mt-0 px-3 md:px-0  flex-col space-y-4 sm:space-y-6 text-start " >
                        <div className=" flex items-center space-x-3 md:space-x-4 font-medium text-lg sm:text-xl md:text-2xl" >
                            <Image src={'https://cdn.cdnlogo.com/logos/e/21/elastic-stack.svg'} width={30} height={30} alt="icon" />
                            <p className="font-semibold" >
                                <span className="text-orange-400" >Re;</span>po  </p>
                        </div>
                        <p className=" text-sm sm:text-base md:text-lg font-light " >
                            The ultimate tech resource portal! Discover a treasure trove of valuable resources, from DSA to Game Dev. Expand your tech expertise with us!
                        </p>
                        <div className="flex flex-wrap items-center font-medium text-violet-400 ">
                            Made with
                            <p className="relative group items-center " ><TbBrandReactNative className=" mx-[3px] h-3 w-3 md:h-4 md:w-4" />
                                <a href="www.tailwindcss.com" target="_blank" rel="noreferrer"
                                    className="group-hover:flex absolute -top-12 hidden bg-gradient-to-tr from-purple-100 rounded-lg text-gray-600 border-[5px] border-violet-100 shadow-xl to-violet-200 px-3 py-2" > Nextjs</a>
                            </p>
                            <p className="relative group items-center" >
                                <SiTailwindcss className=" mx-[3px] h-3 w-3 md:h-4 md:w-4" />
                                <a href="www.nextjs.org" target="_blank" rel="noreferrer" className="group-hover:flex absolute -left-[100%] -top-12 hidden bg-gradient-to-tr from-purple-100 rounded-lg text-gray-600 border-[5px] border-violet-100 shadow-xl to-violet-200 px-3 py-2" > Tailwindcss</a>
                            </p>
                            <p className="relative group items-center" >
                                <TbBrandFirebase className=" mx-[3px] h-3 w-3 md:h-4 md:w-4" />
                                <a href="firebase.google.com" target="_blank" rel="noreferrer" className="group-hover:flex absolute -top-12 hidden bg-gradient-to-tr from-purple-100 rounded-lg text-gray-600 border-[5px] border-violet-100 shadow-xl to-violet-200 px-3 py-2" > Firebase</a>
                            </p>
                            by ‎ <a href="https://yasier.in" target="_blank" rel="noreferrer" className=" bg-gradient-to-bl from-rose-300 via-orange-500 to-red-300/60 bg-clip-text text-transparent shadow-white" >@yasier</a>
                            {/* <FiYoutube className=" bg-zinc-200 text-black rounded-full p-2 lg:px-3 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" /> */}
                        </div>
                    </div>
                    <div className="w-[70%] order-2 text-center md:w-[2px] h-[1px] md:h-[80%] bg-stone-300/70 " ></div>
                    <div className="order-1 md:order-3 flex justify-between w-[70%]  md:basis-[45%] items-center " >
                        <div className="flex text-gray-700 items-center flex-col gap-2 text-xs md:text-base "  >
                            <p className="text-gray-400 select-none font-medium" >Media</p>
                            <p>Video</p>
                            <p>Course</p>
                            <p>Book</p>
                        </div>
                        <div className="flex text-gray-700 items-center flex-col gap-2 text-xs md:text-base "  >
                            <p className="text-gray-400 select-none font-medium" >Company</p>
                            <p>About</p>
                            <p>Guide</p>
                            <p>Term</p>
                        </div>
                        <div className="flex text-gray-700 items-center flex-col gap-2 text-xs md:text-base "  >
                            <p className="text-gray-400 select-none font-medium" >Socials</p>
                            <p>Github</p>
                            <p>Twitter</p>
                            <p>Figma</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex text-sm font-medium text-gray-500 h-full w-full items-center justify-center">
                <a className="-mt-2 py-1 mb-2 " href="https://github.com/yasier-ansari/re-po">© 2023 Re;po - Licensed under the MIT License</a>
            </div>
        </footer>
    )
}

export default Footer