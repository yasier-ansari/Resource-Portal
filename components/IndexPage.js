'use client'

import CardLoading from "@/components/CardLoading";
// import { Outfit } from "@next/font/google"
import { Suspense, useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { BiSearchAlt } from 'react-icons/bi'
import { HiNoSymbol } from 'react-icons/hi2';
import Link from "next/link";
import Image from "next/image";
import { db } from '@/util/firebase/config'
import Img from '@/public/blo.jpg'
import Footer from "./Footer";

const IndexPage = () => {
    const [data, setData] = useState();
    const [filterData, setFilterData] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterTag, setFilterTag] = useState("");
    const [filterLang, setFilterLang] = useState();
    const [searching, setSearching] = useState(false);
    const mTags = [
        'Web Dev', 'Mobile Dev', 'DevOps', 'DS-ML', 'Game Dev', 'Course Platform', 'DSA', 'Coding', 'Informative'
    ];
    const lang = ['English', 'Hindi', 'Japanese', 'Arabic']
    let docRef = collection(db, "AltData");




    useEffect(() => {
        const CACHE_KEY = "AltData";
        const MAX_CACHE_AGE = 60 * 60 * 1000; // 1 hour in milliseconds

        const getCache = () => {
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (!cachedData) {
                console.log("no cache found")
                return null;
            }
            const { data, timestamp } = JSON.parse(cachedData);
            const age = new Date().getTime() - timestamp;
            if (age > MAX_CACHE_AGE) {
                console.log("cache removed");
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
            console.log("cache found");
            return { data, timestamp };
        };

        const setCache = (data) => {
            const timestamp = new Date().getTime();
            localStorage.setItem(CACHE_KEY, JSON.stringify({ "data": data, "timestamp": timestamp }));
        };

        const getDocument = async () => {
            try {
                const cachedData = getCache();
                // check if the cached data is less than an hour old
                if (cachedData && cachedData?.timestamp && (new Date().getTime() - cachedData?.timestamp) < 3600000) {
                    console.log("Using cached data");
                    setData(cachedData.data);
                    setFilterData(cachedData.data);
                    setFilterLang("English");
                    setFilterTag();
                    return;
                } else {
                    const raw = await getDocs(docRef);
                    const res = raw.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    console.log("fetching data");
                    setCache(res);
                    setData(res);
                    setFilterData(res);
                    setFilterLang("English");
                    setFilterTag();
                }

            } catch (e) {
                console.log(e)
            }
        }
        getDocument();
    }, []);


    const filterSearchBymTag = (filter) => {
        if (filterTag === filter) {
            setFilterTag();
            setFilterData(data);
        } else {
            const req = data.filter(obj => obj.mainTag === filter);
            setFilterData(req);
            setFilterTag(filter);
        }

    }
    const filterByLang = (filter) => {
        console.log(filter)
        const req = data.filter(obj => obj.language === filter);
        setFilterLang(filter);
        setFilterData(req);
        console.log(req);
    }
    const reset = () => {
        setFilterData();
        setFilterTag();
        setFilterLang("English");
        setTimeout(() => {
            setFilterData(data)
        }, 600);
    }
    const searchHandler = async (value) => {
        // setFilterData();
        setSearching(true);
        const text = value.toLowerCase();
        console.log(text);
        console.log(filterData);

        setSearchQuery(value);
        setTimeout(() => {
            let res;
            if (value.length !== 0) {
                if (filterData) {
                    res = filterData.filter(obj =>
                        obj.title.toLowerCase().includes(text.toLowerCase()) ||
                        obj.mainTag.toLowerCase().includes(text.toLowerCase()) ||
                        obj.description.toLowerCase().includes(text.toLowerCase()) ||
                        obj.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase()))
                    );
                    console.log(res);
                    setFilterData(res);
                } else {
                    res = data.filter(obj =>
                        obj.title.toLowerCase().includes(text.toLowerCase()) ||
                        obj.mainTag.toLowerCase().includes(text.toLowerCase()) ||
                        obj.description.toLowerCase().includes(text.toLowerCase()) ||
                        obj.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase()))
                    );
                    console.log(res);
                    if (res || res.length !== 0) {
                        setFilterData(res);
                    }
                    else {
                        setFilterData(data);
                    }

                }
            }
            else {
                setFilterData(data);
                setSearchQuery();
            }

            setSearching(false);

            // console.log(res);
        }, 1000);
    }
    return (
        <>
            <>
                <div className="min-h-[70vh]" >
                    <div className="px-4 sm:px-10 md:px-20 lg:px-32 mb-12 md:mb-16 lg:mb-0 mt-12 mx-auto text-center flex align-vertical content-start items-center justiy-center flex-col space-y-8 " >
                        <div className=" text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold max-w-4xl " >
                            Find the <span className=" font-black bg-gradient-to-tr from-purple-500 to-sky-700 via-violet-800 bg-clip-text text-transparent " >right</span> resources
                            to elevate your <span className="font-black text-[#fa8247]" >skills</span>
                        </div>
                        <div className="pt-4 font-[450] text-base md:text-lg lg:text-xl max-w-3xl " >
                            {/* Want to learn new tech ? but dont know where to start ? surf through our curated list to get started */}
                            {/* Embark on your tech learning journey with confidence and efficiency using ExploreTech. Say goodbye to endless searching and welcome a curated collection of the best resources, empowering you to learn, grow, and stay ahead in the rapidly evolving tech world. Start your exploration today and unlock a world of technical knowledge at your fingertips. */}
                            Begin your tech learning journey with confidence and efficiency. <span className="bg-purple-600 px-2 py-[3px] rounded-xl font-bold text-white " >re;po</span> provides curated resources to empower your growth and keep you ahead in the tech world.
                        </div>
                        <div className="flex space-x-6 w-max items-center  font-medium ">
                            <div className="bg-rose-100 flex rounded-lg  relative" >
                                <BiSearchAlt className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 absolute left-2 top-2 z-10 " />
                                <input className="w-full bg-white border-t-[1.3px] border-l-[1.3px] border-r-[1.3px] border-b-[1.3px] focus:border-r-[2.5px] focus:border-b-[2.5px]  border-green-800 duration-75 transition-all ease-in-out drop-shadow-lg shadow-sm py-1 md:py-2 outline-none pl-10 rounded-lg " value={searchQuery} onChange={(e) => searchHandler(e.target.value)} />
                            </div>
                            <button className="bg-[#1ca43e] text-white rounded-lg py-2 px-3 md:px-4" >search</button>
                        </div>
                        <div className="flex w-full pt-6 max-w-5xl mx-auto flex-wrap gap-2 justify-center">
                            {
                                mTags.map((el, k) => (
                                    <button onClick={() => filterSearchBymTag(el)} key={k} className={` text-sm px-2 py-1 sm:px-4 md:px-5 font-semibold  border-2  rounded-xl ${filterTag === el ? ' bg-orange-400 text-white ring-2 ring-orange-400  ' : 'text-black bg-[#f8ab851f] border-[#f8ab85] '} `} >
                                        {el}
                                    </button>
                                ))
                            }
                        </div>
                        <div className="flex justify-center items-center mx-auto space-x-8 md:space-x-10 pb-6 ">
                            <select onChange={(e) => filterByLang(e.target.value)} value={filterLang} className=" text-black bg-white/80 rounded-md h-full w-full px-1 md:px-2 lg:px-3 py-1 md:py-2 outline-transparent border-[1.5px] shadow-lg focus:shadow-xl focus:shadow-orange-300/40 border-green-500/50 " >
                                {
                                    lang.map((langs, key) => {
                                        return (<option value={langs} key={key} >{langs}</option>)
                                    }
                                    )
                                }
                            </select>
                            <button onClick={reset} className="flex space-x-2 bg-[#117b2b] px-2 py-1 md:px-3 rounded-lg text-white items-center justify-center">
                                <p>Reset</p> <HiNoSymbol className="text-white fill-white stroke-[1.1px] stroke-white" />
                            </button>
                        </div>
                    </div>
                    <div className="flex relative py-12 ">
                        <Suspense fallback={<CardLoading />} >
                            <div className="transition-all ease-linear pb-12 px-4 sm:px-5 lg:px-0 container mx-auto grid grid-cols md:grid-cols-2 lg:grid-cols-3 items-center place-content-center gap-6 relative justify-items-center align-items-center"
                            >
                                {
                                    !searching ? (
                                        filterData?.length !== 0 ? (
                                            filterData?.map((obj) => {
                                                return (
                                                    <div key={obj.id} className=" flex flex-col group hover:border-green-500 hover:border-2 hover:scale-105 transition-all ease-linear bg-white rounded-2xl border-2 space-y-4 border-black/5 shadow-md w-[20rem] xl:w-[22rem] h-72 md:h-[20rem] lg:h-[22rem]   ">
                                                        <Link href={`/info/${encodeURIComponent(obj.title)}`} className=" h-[60%] overflow-hidden p-2 md:p-3 lg:p-4 pb-0 md:pb-0 lg:pb-0 " >
                                                            <div className="h-full overflow-hidden group-hover:drop-shadow-sm shadow-black drop-shadow-md w-full rounded-[1.1rem] relative  " >
                                                                <Image src={Img} fill alt='non' className="group-hover:shadow-md shadow-black drop-shadow-md group-hover:scale-105 transition-all ease-in " sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw" />
                                                            </div>
                                                        </Link>
                                                        <div className=" h-[40%] flex justify-start text-start flex-col  px-3 md:px-4 lg:px-5 " >
                                                            <div className="flex justify-between font-bold text-lg md:text-xl" >
                                                                <Link href={`/info/${obj.title}`}>{obj.title} <sup className="font-medium text-xs " >{obj.language.slice(0, 2).toLowerCase()}</sup> </Link>
                                                                <p className="px-2 border-[#f8ab85] border-2 bg-[#f8ab8541] w-max rounded-xl h-max text-xs font-semibold text-black/70 " >
                                                                    {obj.mainTag}
                                                                </p>
                                                            </div>
                                                            <p className="text-base lg:text-[1.01rem]" >{obj.subTitle}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        ) : (
                                            <div className="flex h-[50vh] col-span-1 md:col-span-2 lg:col-span-3 mx-auto max-w-5xl " >
                                                Info Not Found
                                            </div>
                                        )
                                    ) : (
                                        <>
                                            <CardLoading key={1} />
                                            <CardLoading key={2} />
                                            <CardLoading key={3} />
                                        </>
                                    )
                                }
                            </div>
                        </Suspense>
                    </div>
                </div>
            </>
            <Footer />
        </>
    )
}

export default IndexPage