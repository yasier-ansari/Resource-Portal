import Compare from "../Compare"
const MainSection = () => {
    return (
        <div className=" bg-gradient-radial from-purple-100/60 to-[#ffffff]  pt-12 md:pt-16 lg:pt-20 xl:pt-28 w-full  mx-auto text-center flex align-vertical content-start items-center justiy-center flex-col space-y-8 " >
            <div className="  text-center -tracking-[0.07rem] w-full text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[84px] 2xl:text-8xl font-bold max-w-5xl xl:max-w-6xl " >
                Find the <span className=" font-bold bg-gradient-to-t from-purple-400  via-violet-600 to-violet-400 bg-clip-text text-transparent " >right</span> resources
                to elevate your <span className="font-bold bg-gradient-to-b bg-clip-text text-transparent from-orange-300 to-red-400 via-rose-500  " >skill</span>
            </div>
            <div className="  pt-4 font-normal text-[0.9rem] xs:text-base md:text-lg lg:text-xl max-w-3xl " >
                {/* Want to learn new tech ? but dont know where to start ? surf through our curated list to get started */}
                {/* Embark on your tech learning journey with confidence and efficiency using ExploreTech. Say goodbye to endless searching and welcome a curated collection of the best resources, empowering you to learn, grow, and stay ahead in the rapidly evolving tech world. Start your exploration today and unlock a world of technical knowledge at your fingertips. */}
                Begin your tech learning journey with confidence and efficiency. Re-po provides curated resources to empower your growth and keep you ahead in the tech world.
            </div>
            <div>
                <div className="flex items-center justify-center px-6 md:px-8 lg:px-10 " >
                    <button className=" bg-gradient-to-r from-stone-600 to-black/80 px-3 md:px-5 xl:px-6 py-2 md:py-3 text-white font-medium text-base sm:text-lg md:text-xl rounded-2xl border  " >
                        Start Learning
                    </button>
                </div>
            </div>
            <Compare />
        </div>)
}

export default MainSection