'use client';

import { useRef } from 'react';
import AnimatedCounter from './AnimatedCounter';
import ParticleBackground from './ParticleBackground';
import { getContainerPaddingClasses, getSectionSpacingClasses } from '@/lib/breakpoints';
import RevealText from './ui/RevealText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticWrapper from './ui/MagneticWrapper';
import MagneticButton from './ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    { value: 500, suffix: '+', label: 'Projects Completed', delay: 0 },
    { value: 15, suffix: '+', label: 'Years of Experience', delay: 200 },
    { value: 100, suffix: '%', label: 'Client Satisfaction', delay: 400 },
    { value: 50, suffix: '+', label: 'Expert Team Members', delay: 600 },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Our Mission',
      description:
        'To deliver precision-built spaces with transparent processes and uncompromised engineering quality.',
    },
    {
      icon: '👁️',
      title: 'Our Vision',
      description:
        'To redefine construction with disciplined execution, ethical practices, and long-term structural reliability.',
    },
    {
      icon: '⭐',
      title: 'Specialties',
      description:
        'Luxury Homes, Commercial Complexes, Industrial Facilities, Renovation & Remodeling, Turnkey Civil Works.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`min-h-screen bg-white text-black relative overflow-hidden ${getSectionSpacingClasses()}`}
    >
      {/* Particle Background */}
      <ParticleBackground count={30} color="#D4AF37" maxSize={2} speed={0.3} />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_24%,#D4AF37_25%,#D4AF37_26%,transparent_27%,transparent_74%,#D4AF37_75%,#D4AF37_76%,transparent_77%,transparent)] bg-[length:50px_50px]"></div>
      </div>

      <div className={`container mx-auto relative z-10 ${getContainerPaddingClasses()}`}>
        {/* Section Header */}
        <div className="text-center mb-24 md:mb-32">
          <div className="mb-8">
            <RevealText tag="span" className="text-gold text-sm md:text-base tracking-[0.4em] font-bold uppercase">
              WHO WE ARE
            </RevealText>
          </div>
          <RevealText tag="h2" delay={0.2} className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-light text-black leading-tight max-w-5xl mx-auto px-4 tracking-tight">
            We are the <span className="font-serif italic text-gold">architects of permanence</span>. In a world of fleeting trends, we build spaces that stand the test of time.
          </RevealText>
          <div className="mt-12 max-w-3xl mx-auto">
            <RevealText tag="p" delay={0.4} className="text-xl text-gray-500 font-light leading-relaxed">
              LuxeBuild bridges the gap between raw engineering reliability and exquisite luxury design.
            </RevealText>
          </div>
        </div>

        {/* Company Story - Removed as per reference style, text is now in header */}
        {/* <div className="max-w-4xl mx-auto mb-16 md:mb-20"> ... </div> */}

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-16 md:mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-6 bg-gradient-to-br from-black to-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2000} />
              <div className="text-gray-300 mt-2 md:mt-3 text-xs sm:text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <MagneticWrapper className="h-full">
            <div className="bg-white p-8 md:p-10 rounded-none shadow-none border-l-2 border-gold/20 hover:border-gold transition-colors duration-500 group h-full">
              <div className="text-4xl mb-6 text-gold">
                🎯
              </div>
              <h3 className="text-xl font-bold mb-4 text-black uppercase tracking-wider">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver precision-built spaces with transparent processes and uncompromised engineering quality.
              </p>
            </div>
          </MagneticWrapper>

          <MagneticWrapper className="h-full">
            <div className="bg-white p-8 md:p-10 rounded-none shadow-none border-l-2 border-gold/20 hover:border-gold transition-colors duration-500 group h-full">
              <div className="text-4xl mb-6 text-gold">
                👁️
              </div>
              <h3 className="text-xl font-bold mb-4 text-black uppercase tracking-wider">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To redefine construction with disciplined execution, ethical practices, and long-term structural reliability.
              </p>
            </div>
          </MagneticWrapper>

          <MagneticWrapper className="h-full">
            <div className="bg-white p-8 md:p-10 rounded-none shadow-none border-l-2 border-gold/20 hover:border-gold transition-colors duration-500 group h-full">
              <div className="text-4xl mb-6 text-gold">
                ⭐
              </div>
              <h3 className="text-xl font-bold mb-4 text-black uppercase tracking-wider">
                Specialties
              </h3>
              <ul className="text-gray-600 leading-relaxed space-y-2">
                <li>Luxury Homes</li>
                <li>Commercial Complexes</li>
                <li>Industrial Facilities</li>
                <li>Renovation & Remodeling</li>
                <li>Turnkey Civil Works</li>
              </ul>
            </div>
          </MagneticWrapper>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16 px-4">
          <p className="text-gray-600 mb-4 md:mb-6 text-base sm:text-lg">
            Ready to start your construction project with a trusted partner?
          </p>
          <MagneticButton
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gold text-black font-bold rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-gold/50 text-sm sm:text-base border-none"
          >
            Let's Build Together
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
