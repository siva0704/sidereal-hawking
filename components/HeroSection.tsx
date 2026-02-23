'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Scene3DErrorBoundary from './Scene3DErrorBoundary';
// import CursorFollower from './CursorFollower'; // Removing cursor follower for cleaner look with lenis
import { detectWebGLSupport } from '@/lib/webgl-detector';
import { detectDeviceCapabilities } from '@/lib/device-detector';
import { useReducedMotion } from '@/lib/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './ui/RevealText';
import MagneticButton from './ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// Dynamically import 3D scene to avoid SSR issues
const Hero3DScene = dynamic(() => import('./Hero3DScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="text-gold text-xl animate-pulse">Loading 3D Scene...</div>
    </div>
  ),
});

// Dynamically import 2D fallback
const Hero2DFallback = dynamic(() => import('./Hero2DFallback'), {
  ssr: false,
});

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const [use2DFallback, setUse2DFallback] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const hasWebGL = detectWebGLSupport();
    setWebGLSupported(hasWebGL);
    const deviceCaps = detectDeviceCapabilities();
    const shouldUse2D = !hasWebGL || deviceCaps.recommendedQuality === '2d-fallback';
    setUse2DFallback(shouldUse2D);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax for Background (slower)
      gsap.to(bgRef.current, {
        yPercent: 30, // Moves down slightly
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Parallax for Content (faster/opacity fade)
      gsap.to(contentRef.current, {
        yPercent: 50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [mounted, prefersReducedMotion]);

  if (!mounted) {
    return (
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        <div className="text-gold text-xl animate-pulse">Loading...</div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* 3D Scene Background */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-[120%] -top-[10%]">
        {use2DFallback ? (
          <Hero2DFallback key="2d-fallback" />
        ) : webGLSupported ? (
          <Scene3DErrorBoundary key="3d-scene">
            <Suspense fallback={null}>
              <Hero3DScene key="hero-3d-stable" />
            </Suspense>
          </Scene3DErrorBoundary>
        ) : (
          <Hero2DFallback key="2d-fallback-no-webgl" />
        )}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 z-10 pointer-events-none" />

      {/* Content Overlay */}
      <div
        ref={contentRef}
        className="relative z-20 container mx-auto px-4 text-center"
      >
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Company Logo/Name */}
          <div className="overflow-hidden">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter leading-none mb-4">
              <RevealText delay={0.2} tag="span" className="inline-block">Build With</RevealText>
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-200 to-gold tracking-tighter leading-none -mt-2 sm:-mt-4">
              <RevealText delay={0.5} tag="span" className="inline-block text-gold">Confidence</RevealText>
            </h1>
          </div>

          {/* Tagline */}
          <div className="overflow-hidden">
            <RevealText delay={0.8} tag="p" className="text-sm sm:text-base md:text-xl text-white font-medium tracking-wide">
              Premium residential & commercial construction delivered with transparent execution and engineered precision.
            </RevealText>
            <RevealText delay={1.0} tag="p" className="mt-4 text-xs sm:text-sm md:text-base text-gold font-bold tracking-[0.2em] uppercase">
              Trusted • Quality-Driven • On-Time Delivery
            </RevealText>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <MagneticButton
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              wrapperClassName="w-full sm:w-auto"
              className="px-8 py-4 bg-gold text-black font-bold rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] w-full sm:w-auto border-none"
            >
              Get Started
            </MagneticButton>

            <MagneticButton
              onClick={() => {
                const element = document.getElementById('projects');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="outline"
              wrapperClassName="w-full sm:w-auto"
              className="px-8 py-4 border-white/20 backdrop-blur-md text-white font-bold rounded-full transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 w-full sm:w-auto"
            >
              View Projects
            </MagneticButton>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-[1px] h-12 bg-white/50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
