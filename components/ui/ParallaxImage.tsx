'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image, { ImageProps } from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps extends Omit<ImageProps, 'className'> {
    className?: string;
    containerClassName?: string;
    speed?: number; // 0-1, where 1 is fastest
}

export default function ParallaxImage({
    className = '',
    containerClassName = '',
    speed = 0.5,
    ...props
}: ParallaxImageProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!containerRef.current || !imageRef.current) return;

        const anim = gsap.to(imageRef.current, {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
            y: `${speed * 20}%`, // Move image vertically based on speed
            ease: 'none',
        });

        return () => {
            anim.kill();
        };
    }, [speed]);

    return (
        <div ref={containerRef} className={`overflow-hidden relative ${containerClassName}`}>
            <div ref={imageRef} className={`absolute w-full h-[120%] -top-[10%] ${className}`}>
                <Image
                    {...props}
                    className="object-cover w-full h-full"
                    alt={props.alt || 'Parallax image'}
                />
            </div>
        </div>
    );
}
