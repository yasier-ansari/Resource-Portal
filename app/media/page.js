'use client'
import MediaPage from "@/components/MediaPage";
import { useSearchParams, redirect } from 'next/navigation'
import { useEffect } from "react";
export default function Media() {
    const searchParams = useSearchParams()
    const type = searchParams.get('type')

    let content;
    useEffect(() => {
        if (type === 'video' || type === 'course' || type === 'book') {
        } else {
            redirect('/media?type=video')
        }
    }, [])
    return (
        <MediaPage type={type} />
    );
}

