'use client'

import CardLoading from "@/components/CardLoading";
import { Suspense, useContext, useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { LuSearch } from 'react-icons/lu'
import { HiNoSymbol } from 'react-icons/hi2';
import { db } from '@/util/firebase/config'
import Footer from "./Footer";
import RersourceCard from "./RersourceCard";
import { AuthContext } from "@/hooks/AuthContext";
import Compare from "./Compare";


const IndexPage = () => {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { setFilterLang, filterLang, filterTag, setFilterTag } = useContext(AuthContext)
    const [searching, setSearching] = useState(false);
    const [loading, setLoading] = useState(true);
    const mTags = [
        'Web', 'Mobile', 'DevOps', 'DS/ML', 'Game', 'Cloud', 'DSA', 'Cybersecurity', 'Design', 'Web3', 'AR-VR', 'System', 'Misc'
    ]
    const lang = ['English', 'Hindi'];
    const docRef = collection(db, "AltData");


    useEffect(() => {
        setLoading(true);
        const CACHE_KEY = "AltData";
        const MAX_CACHE_AGE = 60 * 60 * 1000;
        const getCache = () => {
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (!cachedData) {
                console.log("No cache found");
                return null;
            }
            const { data, timestamp } = JSON.parse(cachedData);
            const age = new Date().getTime() - timestamp;
            if (age > MAX_CACHE_AGE) {
                console.log("Cache expired");
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
            console.log("Using cached data");
            return { data, timestamp };
        };

        const setCache = (data) => {
            const timestamp = new Date().getTime();
            localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp }));
        };

        const getDocument = async () => {
            try {
                const cachedData = getCache();
                if (cachedData) {
                    setData(cachedData.data);
                    setFilterData(cachedData.data);
                } else {
                    const snapshot = await getDocs(docRef);
                    const res = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setCache(res);
                    setData(res);
                    setFilterData(res);
                }
            } catch (error) {
                console.error(error);
            }
        };
        getDocument();
        setLoading(false);
    }, []);

    const filterSearchBymTag = (filter) => {
        if (filterTag === filter) {
            setFilterTag("");
            setFilterData(data);
        } else {
            const req = data.filter(obj => obj.mainTag === filter);
            setFilterData(req);
            setFilterTag(filter);
        }
    };

    const filterByLang = (filter) => {
        const req = data.filter(obj => obj.language === filter);
        setFilterLang(filter);
        setFilterData(req);
    };

    const reset = () => {
        setFilterData(data);
        setFilterTag("");
        setFilterLang("English");
    };

    const searchHandler = (value) => {
        setSearchQuery(value);
        setSearching(true);

        setTimeout(() => {
            let res;
            if (value.length !== 0) {
                const text = value.toLowerCase();
                if (filterData.length > 0) {
                    res = filterData.filter(obj =>
                        obj.title.toLowerCase().includes(text) ||
                        obj.mainTag.toLowerCase().includes(text) ||
                        obj.description.toLowerCase().includes(text) ||
                        obj.tags.some(tag => tag.toLowerCase().includes(text))
                    );
                } else {
                    res = data.filter(obj =>
                        obj.title.toLowerCase().includes(text) ||
                        obj.mainTag.toLowerCase().includes(text) ||
                        obj.description.toLowerCase().includes(text) ||
                        obj.tags.some(tag => tag.toLowerCase().includes(text))
                    );
                }
                setFilterData(res);
            } else {
                setFilterData(data);
            }

            setSearching(false);
        }, 1000);
    };
    return (
        <>
            <div className="min-h-[70vh] bg-[#ffffff]   " >
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
                    <div className=" flex flex-col space-y-5 xs:flex-row xs:space-x-6 xs:space-y-0 w-max items-center font-medium ">
                        <div className="bg-rose-100 flex rounded-lg items-center relative" >
                            <LuSearch className="h-4 w-4 md:h-5 md:w-5 absolute left-2 top-[10px] stroke-[1.5px] z-10 " />
                            <input className="w-full bg-white border-t-[1.3px] border-l-[1.3px] border-r-[1.3px] border-b-[1.3px] focus:border-r-[2.5px] focus:border-b-[2.5px]  border-purple-800 duration-75 transition-all ease-in-out drop-shadow-lg shadow-sm py-1 md:py-2 outline-none pl-10 rounded-lg " value={searchQuery} onChange={(e) => searchHandler(e.target.value)} />
                        </div>
                        <button className="   bg-gradient-to-tr from-purple-600 to-blue-700 text-white rounded-lg py-2 px-3 md:px-4" >search</button>
                    </div>
                    <div className=" px-6 xs:px-8 sm:px-0 flex pt-6 max-w-5xl mx-auto flex-wrap gap-2 justify-center">
                        {
                            mTags.map((el, k) => (
                                <button onClick={() => filterSearchBymTag(el)} key={k} className={` text-sm px-2 py-1 sm:px-4 md:px-5 font-semibold  border-2  rounded-xl ${filterTag === el ? ' bg-orange-400 text-white ring-2 ring-orange-400  ' : 'text-black bg-[#f8ab851f] border-[#f8ab85] '} `} >
                                    {el}
                                </button>
                            ))
                        }
                    </div>
                    <div className="flex justify-center items-center mx-auto space-x-8 md:space-x-10 pb-6 ">
                        <select onChange={(e) => filterByLang(e.target.value)} value={filterLang} className=" text-black bg-white/80 rounded-md h-full w-full px-1 md:px-2 lg:px-3 py-1 md:py-2 outline-transparent border-[1.5px] shadow-lg focus:shadow-xl " >
                            {
                                lang.map((langs, key) => {
                                    return (<option value={langs} key={key} >{langs}</option>)
                                }
                                )
                            }
                        </select>
                        <button onClick={reset} className="flex space-x-2 bg-purple-700 px-2 py-1 md:px-3 rounded-lg text-white items-center justify-center">
                            <p>Reset</p> <HiNoSymbol className="text-white fill-white stroke-[1.1px] stroke-white" />
                        </button>
                    </div>
                </div>
                <div className=" flex relative py-12">
                    {loading ? (
                        <div className="flex items-center justify-center col-span-1 md:col-span-2 mx-auto gap-4 md:gap-8 lg:gap-12 " >
                            <div className=" hidden lg:flex gap-8 ">
                                <CardLoading key={1} />
                                <CardLoading key={2} />
                                <CardLoading key={3} />
                            </div>
                            <div className=" hidden md:flex lg:hidden gap-6 ">
                                <CardLoading key={1} />
                                <CardLoading key={2} />
                            </div>
                            <div className="flex md:hidden  gap-6 ">
                                <CardLoading key={1} />
                            </div>
                        </div>
                    ) : (
                        <div className="transition-all max-w-5xl ease-linear pb-12 container mx-auto grid grid-cols sm:grid-cols-2 lg:grid-cols-3 items-center place-content-center gap-10 relative justify-center justify-items-center align-items-center">
                            {!searching ? (
                                filterData?.length !== 0 ? (
                                    filterData?.map((obj, index) => {
                                        return (
                                            <RersourceCard key={index} obj={obj} />
                                        );
                                    })
                                ) : (
                                    <div className="flex h-[50vh] col-span-1 md:col-span-2 lg:col-span-3 mx-auto max-w-5xl items-center justify-center ">
                                        Info Not Found
                                    </div>
                                )
                            ) : (
                                <>
                                    <CardLoading key={1} />
                                    <CardLoading key={2} />
                                    <CardLoading key={3} />
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default IndexPage