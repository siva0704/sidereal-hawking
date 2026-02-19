'use client';

import { useRef, useEffect } from 'react';
import { BUILDING_PHASES } from '@/lib/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/animations';

gsap.registerPlugin(ScrollTrigger);

export default function BuildingProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.process-card');

      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          start: "top top",
          end: () => "+=" + horizontalRef.current?.offsetWidth,
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="process" className="bg-black text-white relative overflow-hidden">
      {/* Mobile View (Vertical) */}
      <div className="md:hidden py-20 px-4 space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 uppercase tracking-tighter">Our <span className="text-gold">Process</span></h2>
          <p className="text-gray-400 text-lg">Step by step to perfection</p>
        </div>
        {BUILDING_PHASES.map((phase, index) => (
          <div key={phase.id} className="bg-gray-900/50 border border-gray-800 p-6 rounded-xl">
            <div className="text-gold text-4xl mb-4">{phase.icon}</div>
            <h3 className="text-2xl font-bold mb-2 text-white">{phase.title}</h3>
            <p className="text-gray-400 mb-4">{phase.description}</p>
            <ul className="space-y-2">
              {phase.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-500">
                  <span className="text-gold">✓</span> {step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Desktop View (Horizontal Scroll) */}
      <div ref={triggerRef} className="hidden md:flex h-screen items-center overflow-hidden">
        <div className="absolute top-12 left-12 z-10 w-auto">
          <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter text-white/10 uppercase">
            Process
          </h2>
          <h2 className="text-5xl md:text-7xl font-black leading-none tracking-tighter text-gold absolute top-0 left-0 bg-clip-text text-transparent bg-gradient-to-br from-gold to-white/50 opacity-100 mix-blend-overlay">
            Process
          </h2>
        </div>

        <div ref={horizontalRef} className="flex gap-20 px-[20vw] items-center h-[80vh] w-[400%]">
          {BUILDING_PHASES.map((phase, index) => (
            <div key={phase.id} className="process-card w-[600px] flex-shrink-0 bg-gray-900/80 backdrop-blur-sm border border-gray-800 p-10 rounded-2xl relative group hover:border-gold/50 transition-colors duration-500">
              <div className="absolute -top-10 -left-10 text-[10rem] font-bold text-gray-800/20">{index + 1}</div>

              <div className="relative z-10">
                <div className="text-6xl mb-6 text-gold bg-gold/10 w-24 h-24 flex items-center justify-center rounded-full">
                  {phase.icon}
                </div>

                <h3 className="text-4xl font-bold mb-4 text-white">{phase.title}</h3>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-prose">
                  {phase.description}
                </p>

                <div className="grid grid-cols-1 gap-3">
                  {phase.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
                      <div className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                      </div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
