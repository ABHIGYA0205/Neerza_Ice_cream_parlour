'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const icons = ['🍦', '🍧', '🍨', '🍫', '🥤'];

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Top right blob */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-[10%] -right-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-primary/5 blur-3xl"
      />

      {/* Center left blob */}
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-[30%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-accent/5 blur-3xl"
      />

      {/* Bottom right blob */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] max-w-[550px] max-h-[550px] rounded-full bg-sky/5 blur-3xl"
      />

      {/* Falling Ice Creams */}
      {mounted && Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            y: -100,
            x: `${Math.random() * 100}vw`,
            rotate: Math.random() * 360,
            opacity: 0
          }}
          animate={{
            y: '100vh',
            rotate: Math.random() * 360 + 360,
            opacity: [0, 0.4, 0.4, 0]
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 20
          }}
          className="absolute text-3xl md:text-5xl opacity-40 mix-blend-multiply"
        >
          {icons[Math.floor(Math.random() * icons.length)]}
        </motion.div>
      ))}
    </div>
  );
}
