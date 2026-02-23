'use client';

import { useState, useRef, useEffect } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    duration: number;
}

interface MagneticWrapperProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const MagneticWrapper = ({ children, className = "", onClick }: MagneticWrapperProps) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const particleIdRef = useRef(0);

    useEffect(() => {
        if (!isHovered) {
            return;
        }

        // Create initial particles with reduced intensity and higher frequency
        const initialParticles: Particle[] = [];
        // Increased particle count for larger areas often used with this wrapper
        for (let i = 0; i < 50; i++) {
            initialParticles.push({
                id: particleIdRef.current++,
                x: Math.random() * 60 - 30, // Wider range for larger containers
                y: Math.random() * 60 - 30,
                duration: 0.8 + Math.random() * 1.2,
            });
        }
        setParticles(initialParticles);

        return () => setParticles([]);
    }, [isHovered]);

    return (
        <div
            className={`relative magnetic-wrapper group ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className="relative z-10 h-full">
                {children}
            </div>

            {/* Particles Field */}
            <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
                style={{ inset: "-10px", zIndex: 0 }}
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
                            background: "linear-gradient(135deg, #FFD700, #FDB931, #FFFFFF)", // Gold-tinted particles for cards
                            boxShadow: "0 0 4px rgba(255, 215, 0, 0.6), 0 0 8px rgba(255, 255, 255, 0.4)",
                            // @ts-ignore
                            "--x": `${particle.x}px`,
                            "--y": `${particle.y}px`,
                        }}
                    />
                ))}
            </div>

            <style jsx global>{`
        @keyframes particleFloat {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
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

export default MagneticWrapper;
