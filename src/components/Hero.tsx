import { motion } from 'framer-motion';
import { ArrowDown, Leaf } from 'lucide-react';
import type { SiteSettings } from '@/lib/supabase';

interface HeroProps {
  settings: SiteSettings | null;
  onEnter: () => void;
}

export function Hero({ settings, onEnter }: HeroProps) {
  const heroTitle = settings?.hero_title?.replace(/\[NAME\]/g, settings?.honoree_name || '[NAME]') || 'Our Flavor Tree';
  const heroSubtitle = settings?.hero_subtitle || 'Every leaf is a taste we shared.';
  const honoreeRole = settings?.honoree_role || 'Flavor Application Technologist';

  return (
    <motion.section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating decorative leaves */}
      <motion.div
        className="absolute top-20 left-[10%] opacity-30"
        animate={{ y: [0, -15, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Leaf className="w-12 h-12 text-sage" />
      </motion.div>
      <motion.div
        className="absolute top-40 right-[12%] opacity-20"
        animate={{ y: [0, 12, 0], rotate: [10, -10, 10] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Leaf className="w-16 h-16 text-amber-leaf" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-[15%] opacity-25"
        animate={{ y: [0, -10, 0], rotate: [8, -8, 8] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Leaf className="w-10 h-10 text-deep-green" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 max-w-3xl"
      >
        <p className="font-hand text-2xl text-terracotta mb-4">A heartfelt farewell for</p>

        <motion.h1
          className="font-serif text-5xl md:text-7xl font-600 text-warm-brown leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {heroTitle}
        </motion.h1>

        <motion.p
          className="font-serif text-xl md:text-2xl text-warm-brown/70 italic mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {heroSubtitle}
        </motion.p>

        <motion.p
          className="text-sm text-warm-brown/50 mb-12 tracking-wider uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {honoreeRole}
        </motion.p>

        <motion.button
          onClick={onEnter}
          className="group inline-flex items-center gap-3 bg-terracotta hover:bg-terracotta-dark text-cream font-sans font-600 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Enter the Garden
          <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-8 text-warm-brown/40"
        animate={{ y: [0, 8, 0], opacity: 1 }}
        transition={{ y: { duration: 2, repeat: Infinity }, opacity: { duration: 1, delay: 1.5 } }}
      >
        <ArrowDown className="w-6 h-6 mx-auto" />
      </motion.div>
    </motion.section>
  );
}
