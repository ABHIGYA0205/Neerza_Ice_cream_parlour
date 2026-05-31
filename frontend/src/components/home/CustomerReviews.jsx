'use client';

import { Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const GOOGLE_PLACE_URL = 'https://share.google/wYsDSvwcdIta0wmmq';

const REVIEWS = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: 'P',
    rating: 5,
    text: 'Best place for ice cream in Mansarovar! They always have the freshest stock of Amul products. The owner is very polite and helpful.',
    time: '2 weeks ago',
  },
  {
    id: 2,
    name: 'Rahul Verma',
    avatar: 'R',
    rating: 5,
    text: 'Wide variety of chocolates and dairy products available. Very clean and hygienic parlor. Highly recommended for family visits.',
    time: '1 month ago',
  },
  {
    id: 3,
    name: 'Anjali Gupta',
    avatar: 'A',
    rating: 4,
    text: 'Great location and good collection of Amul ice creams. Sometimes it gets a bit crowded in the evenings, but service is fast.',
    time: '3 months ago',
  },
];

export default function CustomerReviews() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amul-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amul-red/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span className="font-bold text-text-primary text-lg">Google Reviews</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary font-[family-name:var(--font-heading)] mb-2">
              Loved by Mansarovar
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-xl font-bold text-text-primary">4.5</span>
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={18} className={j < 4 ? "fill-current" : "fill-current opacity-50"} />
                ))}
              </div>
              <span className="text-text-muted text-sm border-l border-border pl-2">50+ Reviews</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a
              href={GOOGLE_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 group hover:shadow-lg hover:shadow-primary/20 transition-all"
            >
              Write a Review
              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white p-6 rounded-2xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-amul-red text-white flex items-center justify-center font-bold text-lg">
                  {review.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary text-sm">{review.name}</h3>
                  <p className="text-xs text-text-muted">{review.time}</p>
                </div>
                <div className="ml-auto">
                  <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-80">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star 
                    key={j} 
                    size={16} 
                    className={j < review.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} 
                  />
                ))}
              </div>
              
              <p className="text-text-secondary text-sm leading-relaxed">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
