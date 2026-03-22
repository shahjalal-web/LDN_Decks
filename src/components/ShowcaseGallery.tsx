'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ShowcaseGalleryProps {
  images: string[];
  title: string;
}

export function ShowcaseGallery({ images, title }: ShowcaseGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!images.length) return null;

  const goNext = () => setActiveIndex((i) => (i + 1) % images.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div
          className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
          style={{ aspectRatio: '16 / 9' }}
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[activeIndex]}
                alt={`${title} - image ${activeIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.2)' }}
          >
            <span
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
            >
              Click to expand
            </span>
          </div>

          {/* Nav arrows on main image */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Image counter */}
          <div
            className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
          >
            {activeIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="relative w-full rounded-lg overflow-hidden cursor-pointer transition-all duration-200"
                style={{
                  aspectRatio: '4 / 3',
                  border: i === activeIndex
                    ? '2px solid var(--accent)'
                    : '2px solid var(--border)',
                  opacity: i === activeIndex ? 1 : 0.6,
                  transform: i === activeIndex ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <Image
                  src={img}
                  alt={`${title} - thumbnail ${i + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)' }}
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              <X size={20} />
            </button>

            {/* Counter */}
            <div
              className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium z-10"
              style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
            >
              {activeIndex + 1} / {images.length}
            </div>

            {/* Prev/Next */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer z-10"
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer z-10"
                  style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Main lightbox image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="relative w-[90vw] h-[80vh] max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={images[activeIndex]}
                  alt={`${title} - image ${activeIndex + 1}`}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Bottom thumbnails in lightbox */}
            {images.length > 1 && (
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-xl max-w-[90vw] overflow-x-auto z-10"
                style={{ background: 'rgba(0,0,0,0.5)' }}
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className="relative shrink-0 w-16 h-12 rounded-md overflow-hidden cursor-pointer transition-all"
                    style={{
                      border: i === activeIndex ? '2px solid var(--accent)' : '2px solid transparent',
                      opacity: i === activeIndex ? 1 : 0.5,
                    }}
                  >
                    <Image
                      src={img}
                      alt={`thumb ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
