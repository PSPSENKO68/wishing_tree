import { motion } from 'framer-motion';
import type { Message } from '@/lib/supabase';
import { LEAF_COLORS } from '@/lib/supabase';
import { LeafShape } from './LeafShapes';

interface TreeLeafProps {
  message: Message;
  index: number;
  onClick: (message: Message) => void;
  dimmed: boolean;
  highlighted: boolean;
}

// Deterministic pseudo-random based on string hash
function hashStr(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Canopy positions — distribute leaves around the tree canopy area
function getCanopyPosition(message: Message, index: number): { x: number; y: number; rotation: number; scale: number } {
  // Use saved position if available, otherwise compute
  if (message.position_x != null && message.position_y != null) {
    return {
      x: message.position_x * 800,
      y: message.position_y * 500,
      rotation: (hashStr(message.id) % 60) - 30,
      scale: 0.7 + (hashStr(message.id + 'scale') % 5) * 0.1,
    };
  }

  const seed = hashStr(message.id);
  // Spread leaves in elliptical canopy area
  const angle = (seed % 360) * (Math.PI / 180);
  const radius = 0.3 + ((seed >> 8) % 70) / 100; // 0.3 to 1.0
  const cx = 400; // center of tree
  const cy = 250;
  const rx = 280;
  const ry = 200;

  const x = cx + Math.cos(angle) * rx * radius;
  const y = cy + Math.sin(angle) * ry * radius;
  const rotation = (seed % 80) - 40;
  const scale = 0.65 + ((seed >> 4) % 6) * 0.08;

  return { x, y, rotation, scale };
}

export function TreeLeaf({ message, index, onClick, dimmed, highlighted }: TreeLeafProps) {
  const pos = getCanopyPosition(message, index);
  const colors = LEAF_COLORS[message.leaf_type] || LEAF_COLORS.mint;
  const color = colors[hashStr(message.id) % colors.length];

  const swayDelay = (hashStr(message.id) % 30) / 10;
  const swayDuration = 5 + (hashStr(message.id + 'dur') % 30) / 10;

  return (
    <motion.button
      layoutId={`leaf-${message.id}`}
      className="absolute cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 rounded-full"
      style={{
        left: `${(pos.x / 800) * 100}%`,
        top: `${(pos.y / 500) * 100}%`,
        width: '44px',
        height: '44px',
        zIndex: highlighted ? 30 : 10,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: dimmed ? 0.3 : (highlighted ? 1 : 0.92),
        scale: pos.scale,
        filter: highlighted ? 'brightness(1.3) drop-shadow(0 0 12px rgba(224, 122, 63, 0.6))' : 'brightness(1)',
      }}
      transition={{
        opacity: { delay: 1.8 + index * 0.05, duration: 0.5 },
        scale: { delay: 1.8 + index * 0.05, duration: 0.4, type: 'spring', bounce: 0.5 },
        filter: { duration: 0.3 },
      }}
      whileHover={{
        scale: pos.scale * 1.15,
        rotate: pos.rotation + 5,
        zIndex: 50,
      }}
      whileTap={{ scale: pos.scale * 1.1 }}
      onClick={() => onClick(message)}
      aria-label={`Message from ${message.sender_name}`}
    >
      <motion.div
        style={{
          transformOrigin: 'bottom center',
          animation: `sway ${swayDuration}s ease-in-out infinite`,
          animationDelay: `${swayDelay}s`,
        }}
      >
        <div style={{ transform: `rotate(${pos.rotation}deg)` }}>
          <LeafShape
            type={message.leaf_type}
            fill={color}
            className="w-full h-full drop-shadow-sm"
          />
        </div>
      </motion.div>
    </motion.button>
  );
}
