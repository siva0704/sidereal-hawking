'use client';

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface Particle {
    id: number;
    x: number;
    y: number;
    duration: number;
}

interface MagneticButtonProps {
    children: React.ReactNode;
    variant?: "default" | "outline" | "secondary" | "ghost";
    size?: "default" | "sm" | "lg";
    onClick?: () => void;
    className?: string; // Applied to the inner Button
    wrapperClassName?: string; // Applied to the outer wrapper
    type?: "button" | "submit" | "reset";
}

const MagneticButton = ({ children, variant = "default", size = "default", onClick, className = "", wrapperClassName = "", type = "button" }: MagneticButtonProps) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const particleIdRef = useRef(0);

    useEffect(() => {
        if (!isHovered) {
            return;
        }

        // Create initial particles with reduced intensity and higher frequency
        const initialParticles: Particle[] = [];
        for (let i = 0; i < 35; i++) {
            initialParticles.push({
                id: particleIdRef.current++,
                x: Math.random() * 40 - 20, // Reduced to 40px range for lower intensity
                y: Math.random() * 40 - 20, // Reduced to 40px range for lower intensity
                duration: 0.8 + Math.random() * 0.8, // Faster duration for higher frequency
            });
        }
        setParticles(initialParticles);

        return () => setParticles([]);
    }, [isHovered]);

    return (
        <div className={`relative inline-block magnetic-button-wrapper ${wrapperClassName}`}>
            <Button
                variant={variant}
                size={size}
                type={type}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`relative overflow-visible magnetic-button ${className}`}
            >
                <span className="relative z-10">{children}</span>

                {/* Particles Field */}
                <div
                    className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    style={{ inset: "-30%" }}
                >
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="particle absolute w-[2px] h-[2px] rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `particleFloat ${particle.duration}s infinite`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                background: "linear-gradient(135deg, #e0e0e0, #ffffff, #c0c0c0)",
                                boxShadow: "0 0 4px rgba(192, 192, 192, 0.8), 0 0 8px rgba(255, 255, 255, 0.4)",
                                // @ts-ignore
                                "--x": `${particle.x}px`,
                                "--y": `${particle.y}px`,
                            }}
                        />
                    ))}
                </div>
            </Button>

            <style jsx global>{`
        @keyframes particleFloat {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--x), var(--y));
            opacity: 0;
          }
        }
      `}</style>
        </div>
    );
};

export default MagneticButton;
