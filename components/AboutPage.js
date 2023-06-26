import Image from "next/image"
import Imag from '@/public/images/av5.png'
import '@/app/globals.css'
import Im from '@/public/images/diamond-grid-dark.svg'
import Imeg from '@/public/images/curve.png'
const AboutPage = () => {
    return (
        <div class="flex h-full flex-col items-center w-full justify-center mx-auto">
            <div className="flex flex-col space-y-8 md:space-y-10" >
                <div className="flex flex-col  items-center  space-y-1 mt-6" >
                    <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold md:font-bold  " > <span className="bg-gradient-to-tr from-red-300 via-orange-500 to-red-400 text-transparent bg-clip-text" >Re;</span>po</h1>
                    <h4 className="text-base md:text-lg xl:text-xl flex flex-wrap" >Resource Portal in the making</h4>
                </div>
                <div className="flex flex-col space-y-8 xs:space-y-10 sm:flex-row items-center justify-center px-10 xs:px-12 sm:px-16 lg:px-0 sm:space-x-10 max-w-2xl " >
                    <div className=" aspect-[8/6] sm:aspect-[4/5] md:aspect-[3/4] relative w-36 xs:w-40 lg:w-48 rounded-2xl flex-grow ">
                        <Image
                            src={Imag}
                            alt="tinker"
                            fill
                            className="duration-500 transition-all ease-in-out object-cover group-hover:scale-110 rounded-2xl"
                        />
                    </div>
                    <div className="flex flex-col justify-center max-w-[400px] sm:max-w-[350px] lg:max-w-md sm:w-full h-full" >
                        <p className=" font-medium text-black/40 text-base md:text-lg xl:text-xl mb-2 "  >About</p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe recusandae praesentium iusto porro, vero, minima harum temporibus incidunt expedita quidem tempore aperiam. Eveniet repudiandae libero velit aperiam laborum ut debitis.

                        </p>
                    </div>
                </div>

            </div>
            <div className="h-full w-full bg-[#100220] relative p-6 xs:p-10 mt-20 xs:mt-28 sm:mt-12 sm:p-16 md:px-20 lg:px-32 text-white flex items-center justify-center " >
                <div className="absolute -top-[79px] sm:-top-[111px] md:-top-[127px] lg:-top-[143px] right-0 z-10 w-20 h-20 sm:h-28 sm:w-28 md:w-32 md:h-32 lg:h-36 lg:w-36 " >
                    <div class="flex h-full w-full relative ">
                        <Image src={Imeg} fill className=" -scale-x-100  " alt="side1" />
                    </div>
                </div>
                <div className="absolute -top-[79px] sm:-top-[111px] md:-top-[127px] lg:-top-[143px] left-0 z-10 w-20 h-20 sm:h-28 sm:w-28 md:w-32 md:h-32 lg:h-36 lg:w-36 " >
                    <div class="flex h-full w-full relative ">
                        <Image src={Imeg} fill className="  " alt="side1" />
                    </div>
                </div>
                <div className="absolute -bottom-[79px] sm:-bottom-[111px] md:-bottom-[127px] lg:-bottom-[142px] right-0 z-10 w-20 h-20 sm:h-28 sm:w-28 md:w-32 md:h-32 lg:h-36 lg:w-36 " >
                    <div class="flex h-full w-full relative ">
                        <Image src={Imeg} fill className=" -rotate-180 " alt="side1" />
                    </div>
                </div>
                <div className="absolute -bottom-[79px] sm:-bottom-[111px] md:-bottom-[127px] lg:-bottom-[142px] left-0 z-10 w-20 h-20 sm:h-28 sm:w-28 md:w-32 md:h-32 lg:h-36 lg:w-36 " >
                    <div class="flex h-full w-full relative ">
                        <Image src={Imeg} fill className=" -scale-y-100 " alt="side1" />
                    </div>
                </div>
                <div class="flex flex-col text-start justify-center max-w-4xl px-6 xs:px-3 ">
                    <p className=" font-medium text-white/40 text-base md:text-lg xl:text-xl mb-1 "  >Plan</p>
                    <p className="text-[0.9rem] sm:text-base lg:text-lg" >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere dolorum nulla, dolore necessitatibus debitis sit voluptatum. Eum, esse aliquid debitis magni quo deleniti omnis repellendus! Unde nesciunt deleniti harum cum!
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim accusantium suscipit adipisci soluta nisi corrupti debitis repellendus! Ex nostrum fugit odio aspernatur adipisci iusto alias officia maxime vitae, incidunt deleniti?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptate cum iusto, eum accusantium aut eaque consectetur necessitatibus ipsum quisquam cumque temporibus nihil beatae, ipsam sed distinctio minima, nemo perferendis?
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage