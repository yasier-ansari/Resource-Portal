'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Media() {
    const router = useRouter();

    useEffect(() => {
        router.push('/media/video');
    }, []);

    return null;
}


