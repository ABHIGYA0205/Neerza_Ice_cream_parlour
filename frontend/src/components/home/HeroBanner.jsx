'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Zap, ArrowRight, MessageCircle } from 'lucide-react';

function AnimatedBlob({ className, color }) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-25 blob ${className}`}
      style={{ background: color }}
    />
  );
}

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-primary-50/50 to-sky-light/50">
      {/* Animated blobs */}
      <AnimatedBlob className="w-72 h-72 -top-20 -right-20 blob" color="rgba(37, 99, 235, 0.15)" />
      <AnimatedBlob className="w-96 h-96 -bottom-40 -left-40 blob-delay-2" color="rgba(6, 182, 212, 0.12)" />
      <AnimatedBlob className="w-64 h-64 top-1/2 right-1/4 blob-delay-4" color="rgba(124, 58, 237, 0.08)" />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="flex-1 text-center md:text-left"
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-1.5 bg-primary/5 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-5 border border-primary/10"
              >
                <ShieldCheck size={14} />
                Authorized Amul Outlet
              </motion.span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary font-[family-name:var(--font-heading)] leading-[1.15] mb-5">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="block"
                >
                  Fresh Dairy &
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="text-gradient block"
                >
                  Ice Cream
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="block"
                >
                  Paradise
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-text-secondary text-sm md:text-base max-w-md mb-7 leading-relaxed mx-auto md:mx-0"
              >
                Explore premium Amul products — ice creams, milk, butter, cheese, paneer & more. Browse and order via WhatsApp for quick pickup.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85 }}
                className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start"
              >
                <Link href="/products" className="btn-primary text-center text-sm ripple inline-flex items-center justify-center gap-2">
                  <span>Browse Products</span>
                  <ArrowRight size={16} />
                </Link>
                <a href="https://wa.me/918209524367" target="_blank" rel="noopener noreferrer" className="btn-secondary text-center text-sm inline-flex items-center justify-center gap-2">
                  <MessageCircle size={16} />
                  <span>Order on WhatsApp</span>
                </a>
              </motion.div>

              {/* Trust badges — icons only, no emojis */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex items-center gap-5 mt-8 justify-center md:justify-start"
              >
                {[
                  { Icon: ShieldCheck, text: 'Authorized Amul' },
                  { Icon: Clock, text: 'Open Daily' },
                  { Icon: Zap, text: 'Fresh Stock' },
                ].map((badge, i) => (
                  <motion.div
                    key={badge.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                    className="flex items-center gap-1.5 text-xs text-text-secondary"
                  >
                    <badge.Icon size={14} className="text-primary" />
                    <span className="font-medium">{badge.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 100 }}
              className="flex-1 w-full max-w-sm md:max-w-md relative mx-auto"
            >
              <div className="w-full relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80">
                <Image
                  src="/images/amul.jpeg"
                  alt="Neerza Amul Ice Cream Parlour"
                  fill
                  sizes="(max-width: 768px) 80vw, 400px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </div>

              {/* Floating labels around image */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 bg-white rounded-xl px-3 py-2 shadow-lg border border-border/60"
              >
                <p className="text-[11px] font-bold text-text-primary">50+ Products</p>
                <p className="text-[9px] text-text-muted">In store</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-3 -left-3 bg-white rounded-xl px-3 py-2 shadow-lg border border-border/60"
              >
                <p className="text-[11px] font-bold text-primary">4.8 Rating</p>
                <p className="text-[9px] text-text-muted">on Google</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" className="w-full" preserveAspectRatio="none">
          <path d="M0,25 C360,50 720,5 1080,25 C1260,35 1380,30 1440,25 L1440,50 L0,50 Z" fill="var(--color-cream)" />
        </svg>
      </div>
    </section>
  );
}
