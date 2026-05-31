'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { bannerAPI } from '@/lib/api';

export default function PromoBanners() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await bannerAPI.getAll(); // By default returns active
        const data = res.data.banners || res.data;
        // Map the gradient to the API data since gradient isn't in the DB schema
        const mapped = data.map(b => ({
          ...b,
          gradient: 'from-black/80 via-black/40 to-transparent',
          image: b.image
        }));
        setBanners(mapped);
      } catch (error) {
        console.error('Failed to load banners', error);
      }
    }
    fetchBanners();
  }, []);

  const next = useCallback(() => {
    if (banners.length === 0) return;
    setCurrent((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prev = () => {
    if (banners.length === 0) return;
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, banners.length]);

  if (banners.length === 0) return null;

  return (
    <section className="py-4 md:py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden group">
          {/* Slides */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[21/9] md:aspect-[3/1]"
            >
              <motion.div
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 6, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={banners[current].image}
                  alt={banners[current].title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className={`absolute inset-0 bg-gradient-to-r ${banners[current].gradient}`} />
              <div className="absolute inset-0 flex items-center px-8 md:px-14">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="max-w-lg"
                >
                  <h3 className="text-2xl md:text-5xl font-bold text-white font-[family-name:var(--font-heading)] mb-3 leading-tight tracking-tight">
                    {banners[current].title}
                  </h3>
                  <p className="text-white/90 text-sm md:text-lg mb-6 font-medium">
                    {banners[current].subtitle}
                  </p>
                  <Link
                    href={banners[current].link}
                    className="inline-flex items-center gap-2 bg-white text-primary text-sm font-bold px-6 py-3 rounded-full shadow-lg shadow-white/20 hover:scale-105 hover:bg-primary-50 hover:shadow-xl transition-all duration-300"
                  >
                    Shop Now <ChevronRight size={18} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
            aria-label="Previous banner"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
            aria-label="Next banner"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
