'use client';

import { ReactNode, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
    children: ReactNode;
    className?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    delay?: number;
}

export default function RevealText({
    children,
    className = '',
    tag: Tag = 'div',
    delay = 0
}: RevealTextProps) {
    const textRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Split text into words/chars
        const split = new SplitType(textRef.current, { types: 'lines,words' });

        // Animate lines
        const anim = gsap.from(split.lines, {
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top 95%', // Trigger earlier
                toggleActions: 'play none none reverse',
            },
            duration: 0.6, // Faster animation
            y: 40, // Less movement
            opacity: 0,
            stagger: 0.1,
            ease: 'power3.out',
            delay: delay,
        });

        return () => {
            anim.kill();
            split.revert();
        };
    }, [children, delay]);

    return (
        <Tag ref={textRef as any} className={className}>
            {children}
        </Tag>
    );
}
