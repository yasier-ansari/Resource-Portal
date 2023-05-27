// 'use client';

// import Header from "@/components/Header"
// import Footer from "@/components/Footer"
// import { useContext } from "react"
// import { AuthContext } from "@/hooks/AuthContext"
// import Modal from "@/components/Modal"
// import ToastContainer from "@/components/Toaster"

// import { AuthContextProvider } from "@/hooks/AuthContext";
// export function Providers({ children }) {
//     const { isModalVisible } = useContext(AuthContext);
//     return (
//         <AuthContextProvider>
//             <div className={`min-h-[98vh] w-full relative ${isModalVisible ? "overflow-hidden" : ""}`}>
//                 {isModalVisible && <Modal />}
//                 <main className={`bg-[#fffcf8] min-h-[95%] ${isModalVisible ? "filter blur-sm backdrop-blur-sm" : ""}`}>
//                     <Header />
//                     {children}
//                     <Footer />
//                 </main>
//             </div>
//             <ToastContainer />
//         </AuthContextProvider>
//     );
// }