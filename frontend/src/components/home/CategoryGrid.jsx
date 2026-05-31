'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sampleCategories } from '@/data/seed';
import { categoryAPI } from '@/lib/api';

const pastelColors = [
  'from-blue-50 to-blue-100',
  'from-sky-50 to-sky-100',
  'from-cyan-50 to-cyan-100',
  'from-indigo-50 to-indigo-100',
  'from-violet-50 to-violet-100',
  'from-purple-50 to-purple-100',
  'from-blue-50 to-cyan-100',
  'from-sky-50 to-indigo-100',
  'from-cyan-50 to-blue-100',
  'from-indigo-50 to-sky-100',
  'from-violet-50 to-blue-100',
  'from-blue-50 to-violet-100',
  'from-sky-50 to-cyan-100',
];

export default function CategoryGrid({ categories }) {
  const [cats, setCats] = useState(categories?.length ? categories : sampleCategories);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await categoryAPI.getAll();
        const data = res.data.categories || res.data;
        if (data.length > 0) setCats(data);
      } catch (error) {
        console.error('Failed to load categories', error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <section id="categories" className="py-8 md:py-14 relative">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-7"
        >
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
              Shop by Category
            </h2>
            <p className="text-xs text-text-muted mt-1">Explore our wide range of dairy products</p>
          </div>
          <Link href="/products" className="text-sm text-primary font-semibold hover:underline decoration-2 underline-offset-4">
            View All →
          </Link>
        </motion.div>

        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3 md:gap-4">
          {cats.map((cat, i) => (
            <motion.div
              key={cat._id || cat.slug}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4, type: 'spring', stiffness: 200 }}
              whileHover={{ y: -6, scale: 1.05 }}
            >
              <Link
                href={`/products?category=${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex flex-col items-center gap-2 group"
                id={`category-${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden bg-gradient-to-br ${pastelColors[i % pastelColors.length]} shadow-sm group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-300 border border-white`}>
                  {cat.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={cat.image.startsWith('/uploads') ? (process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5001') + cat.image : cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <span className="text-2xl md:text-3xl flex items-center justify-center h-full">{cat.icon || '🛒'}</span>
                  )}
                </div>
                <span className="text-[11px] md:text-xs font-medium text-text-primary text-center leading-tight group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
