import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface MagneticTextProps {
    children: string;
    className?: string;
    staggerDelay?: number;
    animation?: "fade" | "slide-up" | "shimmer";
}

const MagneticText = ({
    children,
    className = "",
    staggerDelay = 0.03,
    animation = "fade"
}: MagneticTextProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (textRef.current) {
            observer.observe(textRef.current);
        }

        return () => {
            if (textRef.current) {
                observer.unobserve(textRef.current);
            }
        };
    }, []);

    const getAnimationClass = (animation: string) => {
        const animationMap: { [key: string]: string } = {
            fade: "opacity-0 animate-in fade-in",
            "slide-up": "opacity-0 translate-y-4 animate-in fade-in slide-in-from-bottom-4",
            shimmer: "text-shimmer",
        };
        return animationMap[animation] || "";
    };

    const letters = children.split("");

    return (
        <div ref={textRef} className={cn("inline-flex flex-wrap", className)}>
            {letters.map((letter, index) => (
                <span
                    key={index}
                    className={cn(
                        "inline-block",
                        animation === "shimmer" ? "text-shimmer" : "",
                        isVisible && animation !== "shimmer" ? getAnimationClass(animation) : "opacity-0"
                    )}
                    style={{
                        animationDelay: isVisible ? `${index * staggerDelay}s` : "0s",
                        animationFillMode: "forwards",
                    }}
                >
                    {letter === " " ? "\u00A0" : letter}
                </span>
            ))}
        </div>
    );
};

export default MagneticText;
