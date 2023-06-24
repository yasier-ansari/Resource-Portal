'use client'
import MediaPage from "@/components/MediaPage";
import { useSearchParams, redirect } from 'next/navigation'
import { useEffect } from "react";
export default function Media() {
    redirect('/media/video')
}

