'use client'
import Image from "next/image"
import Img from '@/public/images/thinking-bad.png'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from "react-icons/fa"
import { TbSeparator } from "react-icons/tb"
import { useContext, useEffect, useState } from "react"
import { useSession } from "@/hooks/useSession"
import Link from "next/link"
import { AuthContext } from "@/hooks/AuthContext"
import { useRouter, redirect } from "next/navigation"
import { toast } from 'react-toastify';

const UserAuth = ({ authWork }) => {
    const [authType, setAuthType] = useState(authWork)
    const { createUserWithEmail, loginUserWithEmail, createUserWithGithub, createUserWithGoogle, loginUserWithGithub, loginUserWithGoogle } = useSession()
    const { authReady, userInfo } = useContext(AuthContext);
    const router = useRouter();
    const [form, setForm] = useState({
        email: '',
        password: '',
        name: '',
        opted: true
    })
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (authType === 'Register') {
            if (!form.name) {
                newErrors.name = 'Name is required';
                valid = false;
            } else {
                newErrors.name = '';
            }
        }

        if (!form.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        } else {
            newErrors.email = '';
        }

        if (!form.password) {
            newErrors.password = 'Password is required';
            valid = false;
        } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/.test(form.password)) {
            newErrors.password =
                'Password must be at least 6 characters long and should contain {aA-zZ,0-9}';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };
    const submitHandler = async (e) => {
        if (authType === "Register") {
            await register(e)
        } else {
            await loginWithEmail(e);
        }
    }
    const googleHandler = async (e) => {
        if (authType === "Register") {
            await registerGoogle(e);
            console.log("register google ")
        } else {
            await loginGoogle(e);
            console.log("login google ")
        }
    }
    const githubHandler = async (e) => {
        if (authType === "Register") {
            await registerGithub(e)
            console.log("register google ")
        } else {
            await loginGithub(e);
            console.log("login google ")
        }
    }


    const register = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await createUserWithEmail(form.name, form.email, form.password, form.opted);
                setForm({
                    email: '',
                    password: '',
                    name: '',
                    opted: true
                });
            } catch (error) {
                if (error.code === 'auth/email-already-in-use') {
                    setErrors({ email: 'Email is already taken' });
                } else {
                    toast(`${error.message}`, { hideProgressBar: true, autoClose: 2000, type: 'error', });
                }
            }
        }
    };

    const loginWithEmail = async (e) => {
        e.preventDefault()
        if (validateForm()) {
            await loginUserWithEmail(form.email, form.password, setErrors)
            setForm({
                email: '',
                password: '',
                name: '',
                opted: true
            })
        }
    }
    const registerGoogle = async (e) => {
        e.preventDefault()
        await createUserWithGoogle()
        setForm({
            email: '',
            password: '',
            name: '',
            opted: true
        })
    }
    const loginGoogle = async (e) => {
        e.preventDefault()
        await loginUserWithGoogle()
        setForm({
            email: '',
            password: '',
            name: '',
            opted: true
        })
    }
    const registerGithub = async (e) => {
        e.preventDefault()
        await createUserWithGithub()
        setForm({
            email: '',
            password: '',
            name: '',
            opted: true
        })

    }
    const loginGithub = async (e) => {
        e.preventDefault()
        await loginUserWithGithub()
        setForm({
            email: '',
            password: '',
            name: '',
            opted: true
        })
    }
    useEffect(() => {
        if (authReady) {
            if (!userInfo) {
                console.log("persist")
            } else {
                redirect('/')
            }
        }
    }, [authReady]);
    return (
        <div className="w-full h-full flex items-center justify-center mx-auto text-gray-800/90  " >
            {
                authReady ?
                    <div class="flex flex-col items-center max-w-4xl max-h-4xl pt-10 pb-20 flex-grow bg-white rounded-xl space-y-4 md:space-y-8 xl:space-y-10 ">
                        <div class="flex flex-col space-y-2">
                            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold " >{authType}</h2>
                            <h6 className="text-base md:text-lg" >{
                                authType === "Register" ? "Begin your Super fast learning right here" : "Login to continue your learning track"
                            }</h6>
                        </div>
                        <div class="flex flex-col w-[80%] sm:w-[65%] md:w-[50%] lg:w-[45%] mx-auto space-y-3 max-w-[400px] items-center">
                            <button onClick={(e) => githubHandler(e)} className="w-full  flex space-x-3 border rounded-lg px-3 py-2  md:px-6 lg:px-8  border-gray-500 items-center justify-center " >
                                <p><FcGoogle className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:w-7 xl:h-7 " /></p>
                                <p>{authType} with Google</p>
                            </button>
                            <button onClick={(e) => googleHandler(e)} className="w-full  flex space-x-3 border rounded-lg px-3 py-2  md:px-6 lg:px-8  border-gray-500 items-center justify-center " >
                                <p><FaGithub className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:w-7 xl:h-7 " /></p>
                                <p>{authType} with Google</p>
                            </button>
                        </div>
                        <div className="bg-purple-800/20 w-[70%]  sm:w-[55%] md:w-[40%] lg:w-[35%] h-[2px] rounded-xl" ></div>
                        <form className="flex flex-col w-[80%] sm:w-[65%] md:w-[50%] lg:w-[45%] mx-auto max-w-[400px] space-y-3 items-center">
                            {authType === 'Register' && (
                                <div className="text-base md:text-lg w-full">
                                    <input
                                        type="text"
                                        name="name"
                                        required={true}
                                        placeholder="Name"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:border-black placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3"
                                    />
                                    {errors.name && <p className="text-orange-500 text-start text-sm md:text-base ml-2 font-light ">{errors.name}</p>}
                                </div>
                            )}

                            <div className="text-base md:text-lg w-full">
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:border-black placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3"
                                />
                                {errors.email && <p className="text-orange-500 text-start text-sm md:text-base ml-2 font-light ">{errors.email}</p>}
                            </div>

                            <div className="text-base md:text-lg w-full">
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full lg:px-4 placeholder:font-extralight font-normal h-10 bg-stone-100 border border-gray-400 outline-none focus:border-black placeholder:text-gray-400 text-gray-800 rounded-lg p-2 md:px-3"
                                />
                                {errors.password && <p className="text-orange-500 text-start text-sm md:text-base ml-2 font-light ">{errors.password}</p>}
                            </div>

                            {authType === 'Register' && (
                                <div className="text-sm md:text-base w-full items-center flex space-x-3">
                                    <input
                                        checked={form.opted}
                                        onChange={(e) =>
                                            setForm((form) => ({
                                                ...form,
                                                opted: !form.opted,
                                            }))
                                        }
                                        name="opted"
                                        type="checkbox"
                                        id="opted"
                                        className="form-checkbox text-blue-500"
                                    />
                                    <label htmlFor="opted" className="font-light text-sm text-start text-gray-600">
                                        get latest tech info and Re;po update
                                    </label>
                                </div>
                            )}

                            <div className="text-base md:text-lg p-2 font-normal w-full">
                                <button
                                    type="submit"
                                    onClick={submitHandler}
                                    className="bg-gradient-to-tr from-purple-500 via-violet-500 to-purple-600 px-3 py-2 md:px-6 lg:px-8 rounded-lg text-white shadow-lg"
                                >
                                    {authType} with Email
                                </button>
                            </div>

                            <div className=" text-sm  font-normal w-full -mt-2 flex justify-center space-x-2 items-center">
                                {authType === 'Register' ? (
                                    <>
                                        <span>Already have an account‎?</span>
                                        <Link href="/login" className="hover:font-medium text-purple-700">
                                            Login
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <span>New to Re;po‎?</span>
                                        <Link href="/register" className="hover:font-medium text-purple-700">
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </form>
                    </div> :
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-75 bg-gray-500 z-50">
                        <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg">
                            <h2 className="text-lg font-semibold">Loading</h2>
                            <div className="animate-spin rounded-full h-4 w-4 border-[2.2px] border-r-none border-r-white border-violet-500"></div>
                        </div>
                    </div >
            }
        </div>
    )
}

export default UserAuth