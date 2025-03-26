"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ImageCardProps {
    src: string
    alt?: string
    className?: string
}

export default function ImageCard({ src, alt, className }: ImageCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("relative overflow-hidden rounded-lg", className)}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Card className="border-0 p-0 overflow-hidden bg-transparent w-full h-full mt-10">
                <motion.div
                    className="w-96 h-96"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.img
                        src={src || "/placeholder.svg?height=400&width=600"}
                        alt={alt}
                        className="w-full h-full object-cover"
                        initial={{ filter: "brightness(1)" }}
                        animate={{ filter: isHovered ? "brightness(1.1)" : "brightness(1)" }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className="absolute inset-0 bg-black/0"
                        animate={{ backgroundColor: isHovered ? "rgba(0, 0, 0, 0.1)" : "rgba(0, 0, 0, 0)" }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            </Card>
        </motion.div>
    )
}

