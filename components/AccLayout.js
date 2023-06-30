"use client";
import React from "react";
import { AuthContext } from "@/hooks/AuthContext";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useSession } from "@/hooks/useSession";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/util/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { fetchUserProfile } from "@/util/firebase/user";
import Imag from "@/public/images/pfp-place.jpg";
import {
  LuFileBadge2,
  LuKey,
  LuListPlus,
  LuUserCog,
} from "react-icons/lu";
import Link from "next/link";

const AccLayout = ({ children }) => {
  const { userInfo, setUserInfo, authReady, typeOfAuth } =
    useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (authReady) {
      if (!userInfo) {
        router.push("/");
      } else {
        console.log("user wala");
      }
    }
  }, [authReady]);
  return (
    // <div class="flex h-full items-center w-full justify-center mx-auto max-w-5xl ">
    //   <div className="flex flex-col md:flex-grow md:flex-row w-full h-full xs:w-[90%] md:w-[70%] lg:w-[60%] max-w-4xl mx-auto justify-center md:px-8 items-center  md:items-start pt-4 pb-16 ">
    //     {userInfo ? (
    //       <>
    //         <div class="flex flex-col items-start justify-start w-[90%] xs:w-[80%] max-w-[200px] sm:w-[70%] md:border-r-gray-500 border-transparent md:border md:w-[35%] md:mr-8 lg:mr-10  text-[0.9rem] md:h-[60vw] max-h-[700px] pt-6 pb-auto md:pt-8 ">
    //           <div class="items-start justify-center flex flex-col w-full">
    //             <Link
    //               href="/user/profile"
    //               className={`${pathname === "/user/profile"
    //                 ? "bg-gray-200   border-r-purple-400/60   "
    //                 : ""
    //                 } border-4 flex items-center space-x-3  border-transparent max-w-[250px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
    //             >
    //               <LuUserCog className="h-4 w-4 md:w-5 md:h-5" />
    //               <span> Profile </span>
    //             </Link>
    //             {
    //               typeOfAuth === "password" &&
    //               <Link
    //                 href="/user/change-password"
    //                 className={`${pathname === "/user/change-password"
    //                   ? "bg-gray-200   border-r-purple-400/60   "
    //                   : ""
    //                   } border-4 flex items-center space-x-3 border-transparent max-w-[250px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
    //               >
    //                 <LuKey className="h-4 w-4 md:w-5 md:h-5" />
    //                 <span> Password </span>
    //               </Link>
    //             }

    //             <Link
    //               href="/user/add-resource"
    //               className={`${pathname === "/user/add-resource"
    //                 ? "bg-gray-200   border-r-purple-400/60   "
    //                 : ""
    //                 } border-4 flex items-center space-x-3 border-transparent max-w-[250px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
    //             >
    //               <LuListPlus className="h-4 w-4 md:w-5 md:h-5" />
    //               <span> Add Resource </span>
    //             </Link>
    //           </div>
    //         </div>
    //         <div className="flex flex-col md:basis-[60%] justify-center md:justify-start self-start items-center md:items-start gap-4 mx-auto pt-10 pb-16 px-4 sm:px-6 md:px-0 w-full">
    //           {children}
    //         </div>

    //       </>
    //     ) : (
    //       <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500 z-50">
    //         <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg">
    //           {
    //             pathname === "/user" ? <h2 className="text-lg ">Loading  </h2>
    //               : <h2 className="text-lg ">Loading {pathname.split('/')[2].split('-')[1]} </h2>
    //           }
    //           <div className="animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-violet-500"></div>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>
    <div class="flex items-center justify-center w-full h-full mx-auto max-w-5xl">
      <div class="flex justify-center min-h-screen items-stretch w-full h-full max-w-4xl mx-auto  flex-grow ">
        {/* {
          userInfo ? (
            <>
              <div class="flex flex-col bg-green-100 justify-start items-start h-full w-1/4 max-w-[250px] min-h-[90vh] border-transparent border-2  border-r-purple-900/30 ">
                <Link
                  href="/user/profile"
                  className={`${pathname === "/user/profile"
                    ? "bg-gray-200   border-r-purple-400/60   "
                    : ""
                    } border-4 flex items-center space-x-3  border-transparent max-w-[250px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
                >
                  <LuUserCog className="h-4 w-4 md:w-5 md:h-5" />
                  <span> Profile </span>
                </Link>
                {
                  typeOfAuth === "password" &&
                  <Link
                    href="/user/change-password"
                    className={`${pathname === "/user/change-password"
                      ? "bg-gray-200   border-r-purple-400/60   "
                      : ""
                      } border-4 flex items-center space-x-3 border-transparent max-w-[250px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
                  >
                    <LuKey className="h-4 w-4 md:w-5 md:h-5" />
                    <span> Password </span>
                  </Link>
                }

                <Link
                  href="/user/add-resource"
                  className={`${pathname === "/user/add-resource"
                    ? "bg-gray-200   border-r-purple-400/60   "
                    : ""
                    } border-4 flex items-center space-x-3 border-transparent max-w-[250px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
                >
                  <LuListPlus className="h-4 w-4 md:w-5 md:h-5" />
                  <span> Add Resource </span>
                </Link>
              </div>
              <div class="flex bg-sky-100 grow w-3/4 flex-col justify-center pl-8 py-12">
                {children}
              </div>
            </>

          ) : <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500 z-50">
            <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg">
              {
                pathname === "/user" ? <h2 className="text-lg ">Loading  </h2>
                  : <h2 className="text-lg ">Loading {pathname.split('/')[2].split('-')[1]} </h2>
              }
              <div className="animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-violet-500"></div>
            </div>
          </div>
        } */}
        <div className="w-1/4 grow flex flex-col border-transparent text-sm sm:text-[0.9rem] md:text-[0.93rem] border-r-black/10 border ">
          <Link
            href="/user/profile"
            className={`${pathname === "/user/profile"
              ? "bg-gray-100   border-r-purple-400   "
              : ""
              } border-4 flex items-center space-x-3  border-transparent max-w-[250px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
          >
            <LuUserCog className="h-4 w-4 md:w-5 md:h-5" />
            <span> Profile </span>
          </Link>
          {
            typeOfAuth === "password" &&
            <Link
              href="/user/change-password"
              className={`${pathname === "/user/change-password"
                ? "bg-gray-100   border-r-purple-400   "
                : ""
                } border-4 flex items-center space-x-3 border-transparent max-w-[250px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
            >
              <LuKey className="h-4 w-4 md:w-5 md:h-5" />
              <span> Password </span>
            </Link>
          }

          <Link
            href="/user/add-resource"
            className={`${pathname === "/user/add-resource"
              ? "bg-gray-100   border-r-purple-400   "
              : ""
              } border-4 flex items-center space-x-3 border-transparent max-w-[250px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
          >
            <LuListPlus className="h-4 w-4 md:w-5 md:h-5" />
            <span> Add Resource </span>
          </Link>
        </div>
        <div className="w-3/4 grow px-8 pt-4 pb-12 ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccLayout;
