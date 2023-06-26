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
  const [updateLoad, setUpdateLoad] = useState(null);
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
    <div class="flex h-full items-center w-full justify-center mx-auto max-w-5xl ">
      {!updateLoad ? (
        <div className="flex flex-col md:flex-row w-full h-full xs:w-[90%] md:w-[70%] lg:w-[60%] max-w-2xl mx-auto justify-center md:justify-start items-center  md:items-start pt-4 pb-16 ">
          {userInfo ? (
            <>
              <div class="flex flex-col items-center w-[90%] xs:w-[80%] sm:w-[70%]  md:basis-[30%] justify-center md:justify-start md:items-start md:self-start text-[0.9rem] h-full pt-6 md:pt-8 ">
                <Link
                  href="/user/profile"
                  className={`${pathname === "/user/profile"
                    ? "bg-gray-200   border-r-purple-400/60   "
                    : ""
                    } border-4 flex items-center space-x-3  border-transparent max-w-[270px] md:w-[200px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
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
                      } border-4 flex items-center space-x-3 border-transparent max-w-[270px] md:w-[200px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
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
                    } border-4 flex items-center space-x-3 border-transparent max-w-[270px] md:w-[200px] w-full text-start px-3 md:px-4 py-1 rounded-l-lg md:py-2 `}
                >
                  <LuListPlus className="h-4 w-4 md:w-5 md:h-5" />
                  <span> Add Resource </span>
                </Link>
              </div>
              <div className="w-1 h-full bg-gray-200 mr-4 md:mr-6 lg:mr-8 "></div>
              {children}
            </>
          ) : (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500 z-50">
              <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg">
                <h2 className="text-lg ">Loading {pathname.split('/')[2].split('-')[1]} </h2>
                <div className="animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-violet-500"></div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500 z-50">
          <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg">
            <h2 className="text-lg ">Updating {pathname.split('/')[2].split('-')[1]} </h2>
            <div className="animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-violet-500"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccLayout;
