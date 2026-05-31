'use client';

import ProductCard from '@/components/products/ProductCard';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FeaturedProducts({ products, title = 'Featured Products', link }) {
  if (!products?.length) return null;

  return (
    <section className="py-6 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)]">
            {title}
          </h2>
          {link && (
            <Link href={link} className="text-sm text-primary font-semibold hover:underline decoration-2 underline-offset-4 transition-all">
              View All →
            </Link>
          )}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {products.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
