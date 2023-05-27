'use client'
import { AuthContext } from "@/hooks/AuthContext";
import { useContext, useEffect, useState } from "react"
import { ImCross } from 'react-icons/im';
import { GrFormEdit } from 'react-icons/gr'
import Image from 'next/image'
import { useSession } from "@/hooks/useSession";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/util/firebase/config";
import { fetchUserProfile } from "@/util/firebase/user";
// const Modal = () => {
//     const { user } = useContext(AuthContext);
//     console.log(user);
//     if (user) {
//         return (
//             <ProfileModal />
//         )
//     } else {
//         return (
//             <LoginModal />
//         )
//     }
// }

// const ProfileModal = () => {
//     const { userInfo, toggleModal, setUserInfo } = useContext(AuthContext);
//     const { logout } = useSession();
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [formData, setFormData] = useState({
//         displayName: userInfo?.displayName,
//         email: userInfo?.email,
//         githubUrl: userInfo?.githubUrl,
//         website: userInfo?.website,
//         photoURL: userInfo?.photoURL,
//         linkedin: userInfo?.linkedin,
//         twitter: userInfo?.twitter,
//         infoVisible: userInfo?.infoVisible
//     });
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         // Handle form submission
//         try {
//             const docRef = doc(db, 'userProfile', userInfo?.uid);
//             await setDoc(docRef, formData, { merge: true });
//             toggleModal();
//             setFormData({
//                 name: '',
//                 email: '',
//                 githubId: '',
//                 website: '',
//                 linkedin: '',
//                 twitter: '',
//                 infoVisible: ''
//             });
//         } catch (e) {
//             console.log(e);
//         }
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 setSelectedImage(reader.result);
//             };
//             reader.readAsDataURL(file);
//         }
//     };
//     const handleClick = () => {
//         // Logic to open file input when the image is clicked
//         // You can use a hidden file input and trigger its click event programmatically
//     };
//     const Logout = () => {
//         logout();
//         toggleModal();
//     }
//     const getData = async () => {
//         const res = await fetchUserProfile(user.uid);
//         setUserInfo(res);
//         console.log(res);
//     }
//     useEffect(() => {

//         if (!userInfo) {
//             getData();
//         }
//     }, [])
//     return (
//         <div className=" font-sat fixed inset-0 z-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
//             <div className="flex relative w-[50%] rounded-lg bg-white shadow-xl border-green-200 shadow-gray-400 border p-8">
//                 <button className="absolute top-4 right-4 " onClick={toggleModal} >
//                     <ImCross className="" />
//                 </button>
//                 <div className="flex flex-col gap-4 h-max w-full ">

//                     <div class="flex justify-start space-x-12 items-center">
//                         <div class=" pl-4 flex gap-2 ">
//                             <label htmlFor="image-input" className=" relative cursor-pointer">
//                                 <Image
//                                     src={selectedImage || userInfo?.photoURL}
//                                     alt="Selected Image"
//                                     className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
//                                     onClick={handleClick}
//                                     width={100}
//                                     height={100}
//                                 />
//                                 <div class="absolute bottom-2 right-0 bg-gray-400 rounded-[20px] p-1 ">
//                                     <GrFormEdit className="h-4 w-4 md:h-5 md:w-5" />
//                                 </div>
//                             </label>
//                             <input
//                                 id="image-input"
//                                 type="file"
//                                 accept="image/*"
//                                 className="hidden"
//                                 onChange={handleImageChange}
//                             />
//                         </div>


//                         <div className="" >
//                             <h3 className="font-bold text-xl  md:text-2xl lg:text-3xl " >Profile</h3>
//                             <p>Update your profile using below fields </p>
//                         </div>
//                     </div>
//                     <div class="flex w-full space-x-12 ">
//                         <div className="flex w-1/2 flex-col gap-2 " >
//                             <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="name">Name: <span className="text-red-500" >*</span> </label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 value={formData.displayName}
//                                 onChange={handleChange}
//                                 required
//                                 className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "
//                             />
//                         </div>
//                         <div className="flex w-1/2 flex-col gap-2 " >
//                             <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="email">Email: <span className="text-red-500" >*</span> </label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                                 className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

//                             />
//                         </div>
//                     </div>
//                     <div class="flex space-x-12 items-center">
//                         <div className="flex w-1/2 flex-col gap-2" >
//                             <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="githubId">GitHub ID: <span className="text-red-500" >*</span> </label>
//                             <input
//                                 type="text"
//                                 id="githubId"
//                                 name="githubId"
//                                 value={formData.githubUrl}
//                                 onChange={handleChange}
//                                 required
//                                 className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

//                             />
//                         </div>
//                         <div className="flex w-1/2 flex-col gap-2" >
//                             <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="linkedin">Linkedin:</label>
//                             <input
//                                 type="url"
//                                 id="linkedin"
//                                 name="linkedin"
//                                 value={formData.linkedin}
//                                 onChange={handleChange}
//                                 className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

//                             />
//                         </div>
//                     </div>
//                     <div class="flex space-x-12 items-center">
//                         <div className="flex w-1/2 flex-col gap-2" >
//                             <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="twitter">Twitter:  </label>
//                             <input
//                                 type="url"
//                                 id="twitter"
//                                 name="twitter"
//                                 value={formData.twitter}
//                                 onChange={handleChange}
//                                 className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

//                             />
//                         </div>
//                         <div className="flex w-1/2 flex-col gap-2" >
//                             <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="website">Website: </label>
//                             <input
//                                 type="url"
//                                 id="website"
//                                 name="website"
//                                 value={formData.website}
//                                 onChange={handleChange}
//                                 className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

//                             />
//                         </div>
//                     </div>
//                     <div className="flex items-center space-x-2 pl-1  ">
//                         <input checked={formData?.infoVisible} onChange={() =>
//                             setFormData((prevFormData) => ({
//                                 ...prevFormData,
//                                 infoVisible: !prevFormData.infoVisible,
//                             }))} name="infoVisible" type="checkbox" id="label2" className="form-checkbox h-4 w-4 text-blue-500" />
//                         <label htmlFor="label2" className="font-medium text-sm text-gray-600 flex items-center" > Other people can see your profile and comments  </label>
//                     </div>
//                     <div class="flex space-x-12 items-center">
//                         <button onClick={handleSubmit} className="flex bg-green-600 text-white font-semibold items-center text-lg md:text-xl rounded-xl px-4 md:px-6 py-1 md:py-2 w-1/2 flex-col gap-2" >
//                             Save
//                         </button>
//                         <button onClick={Logout} className="flex bg-orange-600 text-white font-semibold items-center text-lg md:text-xl rounded-xl px-4 md:px-6 py-1 md:py-2 w-1/2 flex-col gap-2" >
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

const Modal = () => {
    return (
        <div className="fixed inset-0 z-50 backdrop-filter backdrop-blur-sm flex justify-center items-center">
            <div className="flex w-1/2 rounded-lg bg-white p-8">
                <div className="flex flex-col gap-4 h-max w-full ">

                    {/* <div class="flex justify-start space-x-12 items-center">
                        <div class=" pl-4 flex gap-2 ">
                            <label htmlFor="image-input" className=" relative cursor-pointer">
                                <Image
                                    src={selectedImage || userInfo?.photoURL}
                                    alt="Selected Image"
                                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover"
                                    onClick={handleClick}
                                    width={100}
                                    height={100}
                                />
                                <div class="absolute bottom-2 right-0 bg-gray-400 rounded-[20px] p-1 ">
                                    <GrFormEdit className="h-4 w-4 md:h-5 md:w-5" />
                                </div>
                            </label>
                            <input
                                id="image-input"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>


                        <div className="" >
                            <h3 className="font-bold text-xl  md:text-2xl lg:text-3xl " >Profile</h3>
                            <p>Update your profile using below fields </p>
                        </div>
                    </div>
                    <div class="flex w-full space-x-12 ">
                        <div className="flex w-1/2 flex-col gap-2 " >
                            <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="name">Name: <span className="text-red-500" >*</span> </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.displayName}
                                onChange={handleChange}
                                required
                                className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "
                            />
                        </div>
                        <div className="flex w-1/2 flex-col gap-2 " >
                            <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="email">Email: <span className="text-red-500" >*</span> </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

                            />
                        </div>
                    </div>
                    <div class="flex space-x-12 items-center">
                        <div className="flex w-1/2 flex-col gap-2" >
                            <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="githubId">GitHub ID: <span className="text-red-500" >*</span> </label>
                            <input
                                type="text"
                                id="githubId"
                                name="githubId"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                required
                                className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

                            />
                        </div>
                        <div className="flex w-1/2 flex-col gap-2" >
                            <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="linkedin">Linkedin:</label>
                            <input
                                type="url"
                                id="linkedin"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={handleChange}
                                className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

                            />
                        </div>
                    </div>
                    <div class="flex space-x-12 items-center">
                        <div className="flex w-1/2 flex-col gap-2" >
                            <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="twitter">Twitter:  </label>
                            <input
                                type="url"
                                id="twitter"
                                name="twitter"
                                value={formData.twitter}
                                onChange={handleChange}
                                className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

                            />
                        </div>
                        <div className="flex w-1/2 flex-col gap-2" >
                            <label className="text-gray-500 font-semibold text-sm md:text-md pl-1 " htmlFor="website">Website: </label>
                            <input
                                type="url"
                                id="website"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="px-2 md:px-3 py-1 lg:py-2 rounded-lg shadow-lg border border-gray-400 w-full focus:outline-gray-600 focus:shadow-xl focus:shadow-gray-300 font-semibold  "

                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 pl-1  ">
                        <input checked={formData?.infoVisible} onChange={() =>
                            setFormData((prevFormData) => ({
                                ...prevFormData,
                                infoVisible: !prevFormData.infoVisible,
                            }))} name="infoVisible" type="checkbox" id="label2" className="form-checkbox h-4 w-4 text-blue-500" />
                        <label htmlFor="label2" className="font-medium text-sm text-gray-600 flex items-center" > Other people can see your profile and comments  </label>
                    </div>
                    <div class="flex space-x-12 items-center">
                        <button onClick={handleSubmit} className="flex bg-green-600 text-white font-semibold items-center text-lg md:text-xl rounded-xl px-4 md:px-6 py-1 md:py-2 w-1/2 flex-col gap-2" >
                            Save
                        </button>
                        <button onClick={Logout} className="flex bg-orange-600 text-white font-semibold items-center text-lg md:text-xl rounded-xl px-4 md:px-6 py-1 md:py-2 w-1/2 flex-col gap-2" >
                            Logout
                        </button>
                    </div> */}

                </div>
            </div>
        </div>
    );
}

export default Modal