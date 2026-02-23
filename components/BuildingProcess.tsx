'use client';

import { useRef, useEffect } from 'react';
import { BUILDING_PHASES } from '@/lib/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx } from 'clsx';

gsap.registerPlugin(ScrollTrigger);

export default function BuildingProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      // Line drawing animation
      // We animate the height of the fill line based on scroll
      gsap.fromTo(lineRef.current,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
          }
        }
      );

      // Phase and step animations
      const phaseElements = gsap.utils.toArray('.process-phase') as HTMLElement[];

      phaseElements.forEach((phase) => {
        const steps = phase.querySelectorAll('.process-step');

        steps.forEach((step) => {
          gsap.fromTo(step,
            {
              y: 30,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 85%',
                end: 'top 60%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="process" className="relative w-full py-40 px-4 md:px-10 bg-black overflow-hidden">

      {/* Central Line */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px -ml-px pointer-events-none z-0">
        <div className="absolute top-0 bottom-0 w-0.5 bg-gray-800 h-full"></div>
        <div ref={lineRef} className="absolute top-0 left-0 w-0.5 bg-gold h-[0%] transition-none"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-32">
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter">Our <span className="text-gold">Process</span></h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">Step-by-step perfection.</p>
        </div>

        {BUILDING_PHASES.map((phase, pIndex) => (
          <div key={phase.id} className="process-phase relative mb-40 grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Phase Info - Sticky */}
            <div className={`md:sticky md:top-40 h-fit ${pIndex % 2 !== 0 ? 'md:order-2 md:pl-20' : 'md:pr-20 md:text-right'}`}>
              <div className="relative">
                {/* Big Background Number */}
                <div className={`absolute -top-20 -z-10 text-[10rem] font-bold text-gray-800/20 leading-none ${pIndex % 2 !== 0 ? 'left-0' : 'right-0'}`}>
                  {pIndex + 1}
                </div>

                {/* Icon */}
                <div className={`text-6xl mb-6 text-gold bg-gold/10 w-24 h-24 flex items-center justify-center rounded-full ${pIndex % 2 !== 0 ? '' : 'ml-auto'}`}>
                  {phase.icon}
                </div>

                <h3 className="text-4xl font-bold mb-4 text-white">{phase.title}</h3>
                <p className="text-xl text-gray-400 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            </div>

            {/* Steps Container */}
            <div className={`space-y-6 ${pIndex % 2 !== 0 ? 'md:order-1 md:pr-20 md:text-right' : 'md:pl-20'}`}>
              {phase.steps.map((step, sIndex) => (
                <div
                  key={sIndex}
                  className={clsx(
                    "process-step relative p-6 bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl hover:border-gold/30 transition-all duration-300 group",
                  )}
                >
                  {/* Connector Line to Center */}
                  <div className={`absolute top-1/2 ${pIndex % 2 !== 0 ? '-right-[81px]' : '-left-[81px]'} w-20 h-px bg-gray-800 hidden md:block`} />
                  <div className={`absolute top-1/2 ${pIndex % 2 !== 0 ? '-right-[80px]' : '-left-[80px]'} w-2 h-2 rounded-full bg-gold hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className={`flex items-center gap-4 ${pIndex % 2 !== 0 ? 'flex-row-reverse md:justify-start' : ''}`}>
                    <div className="w-8 h-8 rounded-full border border-gold/30 flex-shrink-0 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                      <div className="w-2 h-2 bg-gold rounded-full"></div>
                    </div>
                    <span className="text-lg text-gray-300 group-hover:text-white transition-colors">{step}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
