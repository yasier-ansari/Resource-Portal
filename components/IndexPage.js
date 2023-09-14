'use client'

import CardLoading from "@/components/CardLoading";
import { useContext, useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { LuInfo, LuSearch } from 'react-icons/lu'
import { HiNoSymbol } from 'react-icons/hi2';
import { db } from '@/util/firebase/config'
import RersourceCard from "./RersourceCard";
import { AuthContext } from "@/hooks/AuthContext";
import Image from "next/image";
import Imeg from '@/public/images/curve.png'
import { toast } from "react-toastify";
import Newsletter from "./index/Newsletter";
import MainSection from "./index/MainSection";

const IndexPage = () => {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { setFilterLang, filterLang, filterTag, setFilterTag } = useContext(AuthContext)
    const [searching, setSearching] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [subscribeEmail, setSubscribeEmail] = useState('');
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
            <div className="min-h-[70vh] w-full text-center h-full  " >
                <MainSection />
                <div className="flex flex-col h-full transition-all duration-300 ease-in-out w-full bg-[#100220] relative p-6 xs:p-10 mt-20 xs:mt-28 sm:mt-12 sm:p-16 md:px-20 lg:px-32 items-center justify-center  ">
                    <div className="absolute -top-[79px] sm:-top-[111px] md:-top-[127px] lg:-top-[143px] right-0 z-10 w-20 h-20 sm:h-28 sm:w-28 md:w-32 md:h-32 lg:h-36 lg:w-36 " >
                        <div className="flex h-full w-full relative ">
                            <Image src={Imeg} fill className=" -scale-x-100  " alt="side1" />
                        </div>
                    </div>
                    <div className="absolute -top-[79px] sm:-top-[111px] md:-top-[127px] lg:-top-[143px] left-0 z-10 w-20 h-20 sm:h-28 sm:w-28 md:w-32 md:h-32 lg:h-36 lg:w-36 " >
                        <div className="flex h-full w-full relative ">
                            <Image src={Imeg} fill className="  " alt="side1" />
                        </div>
                    </div>
                    <div className="absolute -bottom-[79px] sm:-bottom-[111px] md:-bottom-[127px] lg:-bottom-[142px] right-0 z-10 w-20 h-20 sm:h-28 sm:w-28 md:w-32 md:h-32 lg:h-36 lg:w-36 " >
                        <div className="flex h-full w-full relative ">
                            <Image src={Imeg} fill className=" -rotate-180 " alt="side1" />
                        </div>
                    </div>
                    <div className="absolute -bottom-[79px] sm:-bottom-[111px] md:-bottom-[127px] lg:-bottom-[142px] left-0 z-10 w-20 h-20 sm:h-28 sm:w-28 md:w-32 md:h-32 lg:h-36 lg:w-36 " >
                        <div className="flex h-full w-full relative ">
                            <Image src={Imeg} fill className=" -scale-y-100 " alt="side1" />
                        </div>
                    </div>
                    <div className="flex flex-col space-y-8 items-center justify-center w-full mb-6 ">
                        <div className="bg-rose-100 flex rounded-xl items-center relative tems-center shadow-sm foc focus-within:shadow-lg focus-within:shadow-white/20 shadow-white/30 font-medium w-full max-w-md " >
                            <LuSearch className="h-4 w-4 md:h-5 md:w-5 absolute left-2 top-[10px] stroke-[1.5px] z-10 " />
                            <input className="w-full bg-white border border-purple-800 duration-75 transition-all ease-in-out drop-shadow-lg shadow-sm py-1 md:py-2 outline-none pl-10 rounded-lg  " value={searchQuery} onChange={(e) => searchHandler(e.target.value)} onFocus={() => setIsInputFocused(true)}
                                onBlur={() => setIsInputFocused(false)} />
                        </div>
                        {
                            !isInputFocused && <div className=" px-6 xs:px-8 sm:px-0 flex pt-6 max-w-4xl mx-auto flex-wrap gap-2 justify-center">
                                {
                                    mTags.map((el, k) => (
                                        <button onClick={() => filterSearchBymTag(el)} key={k} className={` text-sm px-2 py-1 sm:px-4 md:px-5 font-semibold  rounded-xl ${filterTag === el ? ' bg-orange-400 text-white   ' : 'text-black bg-orange-50 border-orange-400 '} `} >
                                            {el}
                                        </button>
                                    ))
                                }
                            </div>
                        }
                        {
                            !isInputFocused ? <div className="flex justify-center items-center mx-auto space-x-8 md:space-x-10 ">
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
                            </div> : <div className="flex space-x2 md:space-x-3 justify-center items-center mx-auto text-white">
                                <LuInfo />
                                <span>Focus out of search box to use filters</span>
                            </div>
                        }

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
                                    <CardLoading key={4} />
                                    <CardLoading key={5} />
                                </div>
                                <div className="flex md:hidden  gap-6 ">
                                    <CardLoading key={6} />
                                </div>
                            </div>
                        ) : (
                            <div className="transition-all max-w-5xl ease-linear pb-12 container mx-auto grid grid-cols sm:grid-cols-2 lg:grid-cols-3 items-center place-content-center place-items-center gap-10 relative justify-center justify-items-center align-items-center">
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
                                        <CardLoading key={7} />
                                        <CardLoading key={8} />
                                        <CardLoading key={9} />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <Newsletter />
            </div>
        </>
    )
}

export default IndexPage