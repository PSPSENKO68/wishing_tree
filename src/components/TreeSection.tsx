import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Leaf, Plus, X } from 'lucide-react';
import type { Message } from '@/lib/supabase';
import { TreeSVG } from './TreeSVG';
import { TreeLeaf } from './TreeLeaf';
import { playLeafSound } from './SoundToggle';

interface TreeSectionProps {
  messages: Message[];
  onLeafClick: (message: Message) => void;
  onAddLeaf: () => void;
}

export function TreeSection({ messages, onLeafClick, onAddLeaf }: TreeSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const showSearch = messages.length > 20;

  const { matchedIds, hasSearch } = useMemo(() => {
    if (!searchQuery.trim()) {
      return { matchedIds: new Set<string>(), hasSearch: false };
    }
    const q = searchQuery.toLowerCase();
    const matched = new Set<string>();
    messages.forEach((m) => {
      if (
        m.sender_name.toLowerCase().includes(q) ||
        m.sender_role.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      ) {
        matched.add(m.id);
      }
    });
    return { matchedIds: matched, hasSearch: true };
  }, [searchQuery, messages]);

  const handleLeafClick = (message: Message) => {
    playLeafSound();
    onLeafClick(message);
  };

  return (
    <section id="tree-section" className="relative min-h-screen pt-12 px-4 pb-32 md:pb-24">
      {/* Leaf counter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <div className="inline-flex items-center gap-2 bg-cream/80 backdrop-blur-sm px-5 py-2.5 rounded-full shadow-md border border-warm-sand/30">
          <Leaf className="w-5 h-5 text-sage" />
          <span className="font-serif text-lg text-warm-brown">
            {messages.length} {messages.length === 1 ? 'message' : 'messages'} and counting
          </span>
        </div>
      </motion.div>

      {/* Search bar */}
      {showSearch && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-warm-brown/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or message..."
              className="w-full pl-12 pr-10 py-3 rounded-full border border-warm-sand/50 bg-cream/80 backdrop-blur-sm text-warm-brown focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-brown/40 hover:text-terracotta"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Tree */}
      <div className="relative max-w-4xl mx-auto" style={{ aspectRatio: '800 / 700' }}>
        <TreeSVG />

        {/* Leaves overlay */}
        <div className="absolute inset-0" style={{ height: '71.4%' /* 500/700 */ }}>
          {messages.map((message, index) => (
            <TreeLeaf
              key={message.id}
              message={message}
              index={index}
              onClick={handleLeafClick}
              dimmed={hasSearch && !matchedIds.has(message.id)}
              highlighted={hasSearch && matchedIds.has(message.id)}
            />
          ))}
        </div>
      </div>

      {/* Floating Add button - desktop */}
      <motion.button
        onClick={onAddLeaf}
        className="hidden md:flex fixed bottom-8 right-8 z-30 items-center gap-2 bg-terracotta hover:bg-terracotta-dark text-cream font-sans font-600 px-6 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <Plus className="w-5 h-5" />
        Add Your Leaf
      </motion.button>

      {/* Sticky bottom bar - mobile */}
      <button
        onClick={onAddLeaf}
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-terracotta text-cream font-sans font-600 py-4 flex items-center justify-center gap-2 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]"
      >
        <Plus className="w-5 h-5" />
        Add Your Leaf
      </button>
    </section>
  );
}
