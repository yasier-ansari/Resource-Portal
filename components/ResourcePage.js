'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Image from "next/image";
import Img from '@/public/blo.jpg'
import LogoRender from "./LogoRender";
import { LuHeart, LuPin, LuShare2, LuMapPin } from 'react-icons/lu'
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";


// export async function getStaticPaths() {
//     const infoCollection = collection(db, 'AltData');
//     const infoQuery = query(infoCollection);
//     const infoSnapshot = await getDocs(infoQuery);
//     const infoData = infoSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));

//     // Generate paths for each title in the collection
//     const paths = infoData.map((info) => ({
//         params: { slug: info.title },
//     }));

//     return {
//         paths,
//         fallback: false,
//     };
// }


// export async function getStaticProps({ params }) {
//     const { slug } = params;
//     let data;

//     const infoCollection = collection(db, 'AltData');
//     const infoQuery = query(infoCollection, where(`title`, `==`, slug));
//     const infoSnapshot = await getDocs(infoQuery);
//     const infoData = infoSnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//     }));
//     data = infoData;

//     return {
//         props: { data },
//         revalidate: 5400,
//     };
// }


const ResourceBlog = ({ data }) => {
    const router = useRouter();
    const [info, setInfo] = useState(data);
    const slug = router.pathname;
    const [liked, setLiked] = useState(false);
    const [copyLink, setCopyLink] = useState();
    const [marked, setMarked] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        setCopied(true);
        toast('Link Copied', { hideProgressBar: true, autoClose: 1000, type: 'success', position: 'top-center' });
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const handleLike = () => {
        if (liked === true) {
            setLiked(false);
            // logic 
            toast('Resource Unliked', { hideProgressBar: true, autoClose: 1000, type: 'error', position: 'top-center' });
        } else {
            setLiked(true);
            // logic
            toast('Resource Liked', { hideProgressBar: true, autoClose: 1000, type: 'success', position: 'top-center' });
        }
    }

    const handleBook = () => {
        if (marked === false) {
            setMarked(true);
            // logic 
            toast('Resource Added to Profile', { hideProgressBar: true, autoClose: 1000, type: 'success', position: 'top-center' });
        } else {
            setMarked(false);
            // logic
            toast('Resource Removed to Profile', { hideProgressBar: true, autoClose: 1000, type: 'error', position: 'top-center' });
        }
    }

    useEffect(() => {
        const getDataFromFire = async () => {
            if (!data) {
                const res = await getData(slug);
                setInfo(res);
            }
        }
        getDataFromFire();
        setCopyLink(window.location.href);
    }, [slug]);

    const currentInfo = info[0];

    if (!currentInfo) {
        return <div>Info not found</div>;
    }
    return (
        <>
            <div className=" text-center font-urban  mx-auto py-8 md:pt-12 max-w-[90rem] pb-12 md:pb-20 lg:pb-24 " >
                <h2 className="text-center font-cal mx-auto text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold lg:font-extrabold ">
                    {currentInfo.title}
                </h2>
                <p className="mb-4 md:mb-6 w-[80%] md:w-[70%] lg:w-[60%] mt-2 md:mt-4  lg:mt-6 mx-auto " >{currentInfo.subTitle}</p>
                <div className="flex flex-wrap mx-auto justify-center items-center space-x-8 md:space-x-10 py-4 md:py-6">
                    <button onClick={handleLike} className="border rounded-xl p-2 bg-purple-100/50 border-stone-400 " >
                        {
                            liked ? (<LuHeart className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 fill-purple-500 text-violet-400 " />) : (<LuHeart className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 " />)
                        }
                    </button>
                    <button className="border rounded-xl p-2 bg-purple-100/50 border-stone-400 " >
                        <CopyToClipboard text={copyLink} onCopy={handleCopy} >
                            <LuShare2 className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 " />
                        </CopyToClipboard >
                    </button>
                    <button onClick={handleBook} className="border rounded-xl p-2 bg-purple-100/50 border-stone-400 " >
                        {
                            marked ? (<LuPin className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 fill-purple-500 text-violet-400 " />) : (<LuPin className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 " />)
                        }
                    </button>
                </div>
                <div className="flex flex-col space-y-6 justify-center place-content-center px-4 sm:px-8 md:px-20 lg:px-32 mb-12 md:mb-16 lg:mb-0 mx-auto ">
                    {/* <div className="h-48 sm:h-56 md:h-64 lg:h-80  w-[90%] sm:w-[80%] md:w-[70%] lg:w-[55%] mx-auto rounded-[1.1rem] relative py-0 mt-0 " >
                        <Image src={Img} fill alt='non' className="rounded-[1.1rem] border-2 border-green-800/70 " sizes="(max-width: 768px) 100vw,
          (max-width: 1200px) 50vw,
          33vw" />
                    </div> */}
                    <div class="flex items-center mx-auto w-[90%] xs:w-[85%] sm:-[80%] md:w-[75%] lg:w-[70%] xl:w-[65%] ">
                        <div className="relative w-full h-full aspect-video ">
                            <Image
                                src={Img}
                                alt="Image description"
                                className="rounded-[2rem] object-cover aspect-video"
                            />
                        </div>
                    </div>
                    <div className="flex w-[90%] md:w-[70%] lg:w-[60%] mx-auto flex-wrap gap-2 justify-center " >
                        {
                            currentInfo.tags.map((el, k) => {
                                return (
                                    <>
                                        <span key={k} className="bg-orange-400 text-white shadow-lg shadow-black/25  text-sm px-2 py-1 md:px-3 font-semibold  rounded-lg ">{el}</span>
                                    </>
                                )
                            })
                        }
                    </div>
                    <p className=" px-3 prose sm:px-4 md:px-0 w-full md:w-[95%] lg:w-[90%] whitespace-pre-wrap pt-4 md:pt-6 prose mt-4 mb-6 font-medium text-base text-start lg:text-lg mx-auto">
                        {currentInfo.description}
                    </p>
                    <div className=" px-3 sm:px-4 md:px-0 text-start w-full md:w-[95%] lg:w-[90%] pt-2 md:pt-4 mx-auto font-medium text-base md:text-lg ">
                        <p className="text-gray-500 mb-2 " >Resources:</p>
                        <div className="flex flex-col space-y-3 lg:space-y-4 transition-all duration-300 ease-in  ">
                            {
                                currentInfo.resourceUrl ?
                                    (
                                        <>
                                            {
                                                Object.keys(currentInfo.resourceUrl).map((el, k) => {
                                                    return (
                                                        <a href={currentInfo.resourceUrl[el]} div key={k} className=" transition-all duration-300 ease-in flex group w-fit font-semibold items-center justify-start pl-2 " >
                                                            <p className="group-hover:translate-x-2 w-max text-purple-500 transition-all duration-300 ease-in " >{el}
                                                                <span className="block max-w-0 group-hover:max-w-full transition-all duration-300 ease-in h-[3px] bg-gradient-to-tr to-red-400 from-orange-500"></span>
                                                            </p>
                                                        </a>
                                                    )
                                                })
                                            }</>

                                    )
                                    :
                                    (
                                        <></>
                                    )
                            }
                        </div>
                    </div>
                    <div className=" px-3 sm:px-4 md:px-0 text-start w-full md:w-[95%] lg:w-[90%] pt-2 md:pt-4 mx-auto font-medium text-base md:text-lg  " >
                        <p className="text-gray-500 mb-2 " >Info:</p>
                        <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-0 justify-center md:flex-row md:justify-between md:items-start">
                            <div className="flex self-start   md:justify-center font-semibold  items-center space-x-2 md:space-x-3 ">
                                <LuMapPin className="bg-black/60 fill-white stroke-2 px-2 py-2 rounded-full h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 " />
                                <p className="text-green-900" >{currentInfo.country}</p>
                            </div>
                            <div className=" justify-between flex pt-4 sm:pt-5 md:pt-0 flex-wrap gap-2">
                                {
                                    Object.keys(currentInfo.mediaUrl).map((el, k) => {
                                        return (
                                            <>
                                                <LogoRender link={currentInfo.mediaUrl[el]} k={k} />
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default ResourceBlog;