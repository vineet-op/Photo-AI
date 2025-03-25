"use client"

import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import HeroImageGrid from './HeroImageGrid';
import { Badge } from "@/components/ui/badge";
import Appbar from './Appbar';
import { SignedIn, SignedOut, SignInButton, SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Hero = () => {

    const router = useRouter()

    return (
        <div>
            <Appbar />
            <section className="max-h-screen relative hero-gradient px-6 md:px-12 lg:px-24">
                <div className="max-w-7xl mx-auto pt-9 md:pt-32 md:pb-24 flex flex-col lg:flex-row items-center">
                    {/* Hero Content */}
                    <div className="w-full lg:w-1/2 lg:pr-12 space-y-6 mb-16 lg:mb-0 z-10  ">
                        <div className="animate-fade-in [animation-delay:200ms]">
                            <Badge className="bg-blue-100 text-blue-700 border-none px-4 py-1 text-sm font-medium rounded-full">
                                Revolutionary AI Photo Generation
                            </Badge>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance animate-fade-in [animation-delay:400ms]">
                            Transform Your Face Into Art With <span className="text-primary">Photo AI</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 max-w-xl text-balance animate-fade-in [animation-delay:600ms]">
                            Train personalized AI models with your photos and generate stunning, creative images in any style, from any era, in any scenario.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4 animate-fade-in [animation-delay:800ms]">
                            <SignedIn>
                                <Button onClick={() => { router.push("/dashboard") }} size="lg" variant={"outline"} className="rounded-full cursor-pointer bg-blue-500 px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105">
                                    <Sparkles className="mr-2 h-5 w-5" />
                                    Dashboard
                                </Button>
                            </SignedIn>
                            <SignedOut>
                                <Button className="rounded-full cursor-pointer bg-blue-500 px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105">Signin</Button>
                            </SignedOut>
                        </div>
                    </div>

                    {/* Hero Images */}
                    <div className="w-full lg:w-1/2 z-10 animate-fade-in [animation-delay:800ms]">
                        <HeroImageGrid />
                    </div>
                </div>
            </section>
        </div >
    )
}

export default Hero