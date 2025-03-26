"use client"

import { BACKEND_URL } from "app/config"
import axios from "axios"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import ImageCard from "./ImageCard"


interface ImageCardProps {
    imageUrl: string
    alt?: string
    className?: string
}


export function Camera() {

    const [userImages, setUserImages] = useState<ImageCardProps[]>([])

    async function getAllImages() {
        const response = await axios.get(`${BACKEND_URL}/image/bulk`)
        setUserImages(response.data.images)
        console.log(userImages);
    }

    useEffect(() => {
        (async () => {
            getAllImages()
        })()
    }, [])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5">
            {userImages.map((image, index) => (
                <div key={index} className="w-full">
                    <ImageCard src={image.imageUrl} />
                </div>
            ))}
        </div>

    )
}