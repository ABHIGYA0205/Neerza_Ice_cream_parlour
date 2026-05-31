'use client';

import Image from 'next/image';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StoreInfo() {
  return (
    <section id="about" className="py-8 md:py-14 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-3xl font-bold text-text-primary font-[family-name:var(--font-heading)] mb-2">
            Visit Our Store
          </h2>
          <p className="text-text-secondary text-sm">
            Come visit us for the freshest Amul products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-white group"
          >
            <a
              href="https://www.google.com/maps/dir//Amul+ice+Cream+parlor+-+Mansarovar,+69%2F396,+Ward+27,+Mansarovar+Sector+6,+Mansarovar,+Jaipur,+Rajasthan+302020"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full relative"
            >
              <Image
                src="/images/map.png"
                alt="Store Location Map"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-primary text-sm font-semibold px-4 py-2 rounded-xl shadow-md"
              >
                <Navigation size={16} />
                <span>Get Directions</span>
              </motion.div>
            </a>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="flex flex-col justify-center gap-5"
          >
            <div>
              <h3 className="text-2xl font-bold text-text-primary font-[family-name:var(--font-heading)] mb-2">
                Neerza Amul Ice Cream Parlour
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Welcome to your trusted neighborhood Amul outlet! We offer a wide range of premium dairy products including ice creams, milk, butter, cheese, paneer, ghee, and more.
              </p>
            </div>

            <div className="flex flex-col gap-3 stagger-children">
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-border hover:border-primary/20 hover:shadow-md transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Address</p>
                  <p className="text-xs text-text-secondary">Shop 69/396, Madhyam Marg, Mansarovar Sector 6, Jaipur, Rajasthan 302020</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-border hover:border-primary/20 hover:shadow-md transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky to-accent flex items-center justify-center shrink-0 shadow-sm">
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Phone</p>
                  <a href="tel:+918209524367" className="text-xs text-text-secondary hover:text-primary transition-colors">+91 82095 24367</a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-border hover:border-primary/20 hover:shadow-md transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center shrink-0 shadow-sm">
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Hours</p>
                  <p className="text-xs text-text-secondary">Open Daily: 9:00 AM – 10:00 PM</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
