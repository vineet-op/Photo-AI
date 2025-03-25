"use client"
import React from 'react'
import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export interface AnimatedCardProps {
    id?: string
    name: string
    description: string
    imageUrl: string
    className?: string
}
function PackCard({ id, imageUrl, name, description, className }: AnimatedCardProps) {

    const [isHovered, setIsHovered] = useState(false)



    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={className}
        >
            <Card
                className="overflow-hidden transition-all duration-300 h-full flex flex-col hover:border-blue-600 
                border-2 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="relative h-48 w-full overflow-hidden">
                    <motion.div
                        animate={{
                            scale: isHovered ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-full w-full"
                    >
                        <img
                            src={imageUrl}
                            alt={name}
                            id={id}
                            className="object-fill w-full h-full"
                        />
                    </motion.div>
                </div>
                <CardContent className="flex-grow p-6">
                    <motion.h3
                        className="text-xl font-bold mb-2"
                        animate={{
                            y: isHovered ? -2 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {name}
                    </motion.h3>
                    <motion.p
                        className="text-muted-foreground"
                        animate={{
                            opacity: isHovered ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {description}
                    </motion.p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                    <motion.div
                        animate={{
                            opacity: isHovered ? 1 : 0.7,
                            y: isHovered ? 0 : 5,
                        }}
                        transition={{ duration: 0.3 }}
                        className="text-sm text-primary font-medium"
                    >
                        Learn more →
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}

export default PackCard