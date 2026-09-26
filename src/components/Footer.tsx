import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { SiteSettings } from '@/lib/supabase';

interface FooterProps {
  settings: SiteSettings | null;
}

export function Footer({ settings }: FooterProps) {
  const footerMessage = settings?.footer_message || 'Thank you for every flavor you brought to this team.';
  const honoreeName = settings?.honoree_name || '[NAME]';

  return (
    <footer className="relative py-20 px-6 text-center bg-gradient-to-b from-transparent to-warm-sand/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto"
      >
        <div className="flex justify-center mb-6">
          <Heart className="w-8 h-8 text-terracotta/60" fill="currentColor" />
        </div>
        <p className="font-serif text-xl md:text-2xl text-warm-brown italic leading-relaxed mb-6">
          {footerMessage}
        </p>
        <div className="w-16 h-px bg-warm-brown/20 mx-auto mb-6" />
        <p className="font-hand text-2xl text-terracotta mb-2">With love and gratitude,</p>
        <p className="font-sans text-sm text-warm-brown/60 tracking-wide">Your team &mdash; {new Date().getFullYear()}</p>
        <p className="font-sans text-xs text-warm-brown/30 mt-8">
          A living tribute for {honoreeName}
        </p>
        <a
          href="#/admin"
          className="font-sans text-xs text-warm-brown/20 hover:text-warm-brown/40 transition-colors mt-4 inline-block"
        >
          Admin
        </a>
      </motion.div>
    </footer>
  );
}
