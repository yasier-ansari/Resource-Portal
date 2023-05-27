'use client'

import { AuthContext } from "@/hooks/AuthContext"
import React, { useContext } from 'react'
import Header from "./Header";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";

const UserLayoutContainer = ({ children }) => {
    const { isModalVisible } = useContext(AuthContext);
    return (
        <>
            <div className={`min-h-[98vh] w-full relative ${isModalVisible ? "overflow-hidden" : ""}`}>
                {isModalVisible && <Modal />}
                <main className={`bg-[#fffcf8] min-h-[95%] ${isModalVisible ? "filter blur-sm backdrop-blur-sm" : ""}`}>
                    <Header />
                    {children}
                </main>
                <ToastContainer />
            </div>
        </>
    )
}

export default UserLayoutContainer