'use client'

import { AuthContext } from "@/hooks/AuthContext"
import React, { useContext, useEffect } from 'react'
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";
import { usePathname } from 'next/navigation'

const IndexLayout = ({ children }) => {
    const { isModalVisible } = useContext(AuthContext);
    const route = usePathname();
    const isUserRoute = route.includes('/user/');
    console.log("asda")

    return (
        <>
            {/* <div className={`min-h-screen w-full relative ${isModalVisible ? "overflow-hidden" : ""}`}> */}
            <div className="flex flex-col w-full min-h-screen bg-white" >
                {/* {isModalVisible && <Modal type={isModalVisible} />} */}
                <Header />
                {/* <main className={`bg-[#fffcf8] ${isModalVisible ? "filter blur-[1px] bg-[#ffffff90] " : ""}`}> */}
                {/* <Header /> */}
                <main className="flex grow w-[100%]  " >
                    {children}
                    {/* <Footer /> */}
                </main>
                {!isUserRoute && <Footer />}
                <ToastContainer />
            </div>
        </>
    )
}

export default IndexLayout