'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

interface Showcase {
  _id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  date: string;
  category: string;
  images: string[];
  service?: { _id: string; title: string; slug: string } | null;
  isPublished: boolean;
  order: number;
}

interface ShowcaseGridProps {
  projects: Showcase[];
}

const CATEGORIES = ['All', 'New Deck', 'Resurfacing', 'Fence', 'Porch', 'Patio', 'Pergola'];

const CATEGORY_COLORS: Record<string, string> = {
  'New Deck': '#d97706',
  'Resurfacing': '#059669',
  'Fence': '#7c3aed',
  'Porch': '#0891b2',
  'Patio': '#be185d',
  'Pergola': '#ea580c',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || '#6b7280';
}

export function ShowcaseGrid({ projects }: ShowcaseGridProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--background)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                backgroundColor: activeFilter === cat ? 'var(--accent)' : 'var(--card)',
                color: activeFilter === cat ? 'var(--accent-foreground)' : 'var(--muted-foreground)',
                border: `1px solid ${activeFilter === cat ? 'var(--accent)' : 'var(--border)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const color = getCategoryColor(project.category);
              const hasImage = project.images && project.images.length > 0;

              return (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={`/deck-projects-showcase/${project.slug}/`}
                    className="group block rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
                  >
                    {/* Image or Placeholder */}
                    <div className="relative w-full" style={{ aspectRatio: '4 / 3' }}>
                      {hasImage ? (
                        <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-5xl font-bold text-white"
                          style={{ backgroundColor: color, opacity: 0.85 }}
                        >
                          {project.category[0]}
                        </div>
                      )}
                      {/* Category badge overlay */}
                      <span
                        className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: color,
                          color: '#fff',
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3
                        className="font-bold text-lg mb-2 leading-snug group-hover:underline"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {project.title}
                      </h3>
                      <div
                        className="flex items-center gap-4 text-xs mb-3"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {project.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {project.date}
                        </span>
                      </div>
                      <span
                        className="inline-flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all"
                        style={{ color: 'var(--accent)' }}
                      >
                        View Project <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg font-medium" style={{ color: 'var(--muted-foreground)' }}>
              No projects found in this category yet.
            </p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-4 text-sm font-bold underline"
              style={{ color: 'var(--accent)' }}
            >
              View all projects
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
