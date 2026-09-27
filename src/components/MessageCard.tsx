import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Message } from '@/lib/supabase';
import { LEAF_COLORS, LEAF_LABELS } from '@/lib/supabase';
import { LeafShape } from './LeafShapes';

interface MessageCardProps {
  message: Message | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function MessageCard({ message, onClose, onNext, onPrev }: MessageCardProps) {
  if (!message) return null;

  const colors = LEAF_COLORS[message.leaf_type] || LEAF_COLORS.mint;
  const color = colors[hashStr(message.id) % colors.length];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Dimmed overlay */}
      <div className="absolute inset-0 bg-warm-brown/40 backdrop-blur-sm" />

      <motion.div
        layoutId={`leaf-${message.id}`}
        className="relative bg-cream rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-warm-sand/50"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Leaf accent header */}
        <div
          className="h-20 flex items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, ${color}40, ${color}20)`,
          }}
        >
          <div className="w-12 h-12 opacity-90">
            <LeafShape type={message.leaf_type} fill={color} className="w-full h-full" />
          </div>
          <span className="absolute top-3 right-3 text-xs font-sans text-warm-brown/50 bg-cream/60 px-2 py-1 rounded-full">
            {LEAF_LABELS[message.leaf_type]}
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-cream/80 flex items-center justify-center text-warm-brown hover:text-terracotta hover:bg-cream transition-colors shadow-sm"
          aria-label="Close message"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-xl font-600 text-warm-brown mb-1">
            {message.sender_name}
          </h3>
          <p className="text-sm text-warm-brown/50 mb-4 font-sans">{message.sender_role}</p>

          {message.photo_url && (
            <img
              src={message.photo_url}
              alt={`${message.sender_name}'s photo`}
              className="w-full max-h-64 object-cover rounded-lg shadow-md mb-4"
            />
          )}

          <p className="font-serif text-warm-brown/90 leading-relaxed text-base whitespace-pre-wrap">
            {message.message}
          </p>

          <p className="text-xs text-warm-brown/30 mt-4 font-sans text-right">
            {new Date(message.created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Navigation Buttons */}
        {(onPrev || onNext) && (
          <div className="flex justify-between items-center px-6 pb-6 pt-2 border-t border-warm-sand/30">
            <button
              onClick={(e) => { e.stopPropagation(); onPrev?.(); }}
              disabled={!onPrev}
              className={`flex items-center gap-1 text-sm font-sans font-600 transition-colors ${onPrev ? 'text-warm-brown hover:text-terracotta' : 'text-warm-brown/20'}`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext?.(); }}
              disabled={!onNext}
              className={`flex items-center gap-1 text-sm font-sans font-600 transition-colors ${onNext ? 'text-warm-brown hover:text-terracotta' : 'text-warm-brown/20'}`}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
