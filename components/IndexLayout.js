'use client'

import { AuthContext } from "@/hooks/AuthContext"
import React, { useContext } from 'react'
import Header from "./Header";
import Footer from "./Footer";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";
import { usePathname } from 'next/navigation'

const IndexLayout = ({ children }) => {
    const { isModalVisible } = useContext(AuthContext);
    const currentRoute = usePathname();
    const isUserPage = currentRoute.startsWith('/setting/');
    console.log(isUserPage);
    return (
        <>
            {/* <div className={`min-h-screen w-full relative ${isModalVisible ? "overflow-hidden" : ""}`}> */}
            <div className="flex flex-col w-full min-h-screen bg-[#ffffff]" >
                {/* {isModalVisible && <Modal />} */}
                {/* <main className={`bg-[#fffcf8] ${isModalVisible ? "filter blur-sm backdrop-blur-sm" : ""}`}> */}
                <Header />
                <main className="flex grow w-full justify-center mx-auto pt-8" >
                    {children}
                    {/* <Footer /> */}
                </main>
                {isUserPage && <Footer />}
                <ToastContainer />
            </div>
        </>
    )
}

export default IndexLayout