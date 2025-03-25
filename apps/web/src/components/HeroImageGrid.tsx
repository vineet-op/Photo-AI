
import { Card } from '@/components/ui/card';

interface HeroImage {
    id: number;
    src: string;
    alt: string;
    className: string;
    animationDelay: string;
}

const HeroImageGrid = () => {

    const images: HeroImage[] = [
        {
            id: 1,
            src: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
            alt: "Original portrait photo",
            className: "col-span-1 row-span-1 rounded-xl object-cover w-full h-full",
            animationDelay: "100ms"
        },
        {
            id: 2,
            src: "https://images.unsplash.com/photo-1610276198568-eb6d0ff53e48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
            alt: "AI generated cyberpunk portrait",
            className: "col-span-1 row-span-1 rounded-xl object-cover w-full h-full",
            animationDelay: "300ms"
        },
        {
            id: 3,
            src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
            alt: "AI generated vintage portrait",
            className: "col-span-1 row-span-1 rounded-xl object-cover w-full h-full",
            animationDelay: "500ms"
        },
        {
            id: 4,
            src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
            alt: "Original portrait photo",
            className: "col-span-1 row-span-1 rounded-xl object-cover w-full h-full",
            animationDelay: "700ms"
        },
        {
            id: 6,
            src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
            alt: "Original portrait photo",
            className: "col-span-1 row-span-1 rounded-xl object-fit w-full h-ull",
            animationDelay: "900ms"
        },
    ];

    return (
        <div className="relative max-w-lg mx-auto">
            {/* Decorative Elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 z-0"></div>
            {/* Image Grid Container */}
            <div className="grid grid-cols-3 grid-rows-3 gap-3 md:gap-5 relative z-10">
                {images.map((image) => (
                    <Card
                        key={image.id}
                        className={`overflow-hidden p-0 shadow-lg glass-card animate-scale-in hover:scale-[1.03] transition-all duration-300 hover:shadow-xl ${image.id === 5 ? 'row-span-2' : ''}`}
                        style={{ animationDelay: image.animationDelay }}
                    >
                        <div className="relative w-full h-full">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className={`${image.className} animate-image-float`}
                                style={{ animationDelay: `calc(${image.animationDelay} + 200ms)` }}
                                loading="lazy"
                            />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default HeroImageGrid