'use client'

import { FiYoutube, FiGithub, FiTwitter, FiInstagram, FiFacebook } from 'react-icons/fi';
import { RiPatreonLine } from 'react-icons/ri'
import { SiLinktree, SiBuymeacoffee } from 'react-icons/si'
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import { FaMediumM, FaLinkedinIn } from 'react-icons/fa';

const LogoRender = ({ link, k }) => {
    const el = link.toLowerCase().split(".")[1];
    const lnk = ['youtube', 'github', 'instagram', 'facebook', 'patreon', 'linktr', 'twitter', 'buymeacoffee'];
    return (
        <a className="bg-black/60 p-2 text-white rounded-full" href={link} key={k} >
            {lnk.includes(el) ? (
                <>
                    {el === 'youtube' && <FiYoutube className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />}
                    {el === 'facebook' && <FiFacebook className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />}
                    {el === 'buymeacoffee' && <SiBuymeacoffee className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />}
                    {el === 'twitter' && <FiTwitter className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />}
                    {el === 'github' && <FiGithub className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />}
                    {el === 'instagram' && <FiInstagram className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />}
                    {el === 'linkedin' && <FaLinkedinIn className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />}
                    {el === 'patreon' && <RiPatreonLine className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />}
                    {(el === 'hashnode' || el === 'medium') && <FaMediumM className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />}
                    {(el === 'bio' || el === 'linktr') && <SiLinktree className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />}

                </>
            ) : (
                <HiOutlineGlobeAlt className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
            )}
        </a>
    );
};

export default LogoRender;