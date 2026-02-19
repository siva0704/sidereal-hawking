'use client';

import { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '@/lib/constants';
import { ProjectCategory } from '@/types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { getContainerPaddingClasses, getSectionSpacingClasses } from '@/lib/breakpoints';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RevealText from './ui/RevealText';

gsap.registerPlugin(ScrollTrigger);

const categories: { label: string; value: ProjectCategory | 'all' }[] = [
  { label: 'All Projects', value: 'all' },
  { label: 'Residential', value: 'residential' },
  { label: 'Commercial', value: 'commercial' },
  { label: 'Industrial', value: 'industrial' },
  { label: 'Infrastructure', value: 'infrastructure' },
];

export default function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    selectedCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === selectedCategory);

  const selectedProject = selectedProjectId
    ? PROJECTS.find((p) => p.id === selectedProjectId)
    : null;

  useEffect(() => {
    // Refresh ScrollTrigger when category changes (which changes grid content)
    // Allow a small delay for DOM to update
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      const ctx = gsap.context(() => {
        ScrollTrigger.batch(".project-card-item", {
          onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.15, overwrite: true }),
          start: "top 95%", // Trigger earlier
          once: true // Only animate once
        });
      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  return (
    <section id="projects" className={`min-h-screen bg-gray-50 ${getSectionSpacingClasses()}`}>
      <div ref={containerRef} className={`container mx-auto ${getContainerPaddingClasses()}`}>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-4 md:mb-6">
            <RevealText tag="h2" className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-black drop-shadow-sm">
              Our <span className="text-gold">Projects</span>
            </RevealText>
          </div>
          <div className="max-w-2xl mx-auto px-4">
            <RevealText tag="p" delay={0.2} className="text-gray-600 text-base sm:text-lg">
              Explore our portfolio of completed projects showcasing excellence in construction and design across various sectors.
            </RevealText>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-10 md:mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${selectedCategory === category.value
                ? 'bg-gold text-black shadow-lg scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:scale-105'
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-auto min-h-[50vh]">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`project-card-item opacity-0 translate-y-[50px] ${
                // Create masonry effect by varying heights
                index % 5 === 0 ? 'md:row-span-2' : ''
                }`}
            >
              <ProjectCard
                project={project}
                onClick={(id) => setSelectedProjectId(id)}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 md:py-20">
            <p className="text-gray-500 text-base sm:text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProjectId(null)}
        />
      )}
    </section>
  );
}
