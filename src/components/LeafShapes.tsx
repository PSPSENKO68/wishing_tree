import type { LeafType } from '@/lib/supabase';

interface LeafShapeProps {
  type: LeafType;
  fill: string;
  className?: string;
}

export function LeafShape({ type, fill, className }: LeafShapeProps) {
  switch (type) {
    case 'mint':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <path
            d="M20 4 C 28 6, 34 14, 34 22 C 34 30, 28 36, 20 36 C 12 36, 6 30, 6 22 C 6 14, 12 6, 20 4 Z M 20 6 L 20 34"
            fill={fill}
            stroke={fill}
            strokeWidth="0.5"
            opacity="0.9"
          />
          <path d="M20 8 L 14 14 M 20 12 L 12 18 M 20 16 L 11 22 M 20 20 L 12 26 M 20 24 L 14 30 M 20 8 L 26 14 M 20 12 L 28 18 M 20 16 L 29 22 M 20 20 L 28 26 M 20 24 L 26 30"
            stroke="#fff" strokeWidth="0.4" opacity="0.2" fill="none" />
        </svg>
      );
    case 'bay':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <path
            d="M20 3 C 24 8, 30 16, 30 24 C 30 32, 25 37, 20 37 C 15 37, 10 32, 10 24 C 10 16, 16 8, 20 3 Z"
            fill={fill}
            stroke={fill}
            strokeWidth="0.5"
            opacity="0.9"
          />
          <path d="M20 5 L 20 36" stroke="#fff" strokeWidth="0.5" opacity="0.25" fill="none" />
        </svg>
      );
    case 'citrus':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <path
            d="M20 6 C 14 6, 8 12, 8 20 C 8 26, 12 32, 20 36 C 28 32, 32 26, 32 20 C 32 12, 26 6, 20 6 Z M 20 6 L 20 14 M 20 20 L 20 36 M 8 20 L 32 20"
            fill={fill}
            stroke={fill}
            strokeWidth="0.5"
            opacity="0.9"
          />
          <path d="M20 14 L 14 20 M 20 14 L 26 20" stroke="#fff" strokeWidth="0.4" opacity="0.2" fill="none" />
        </svg>
      );
    case 'coffee':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <ellipse
            cx="20" cy="20" rx="14" ry="9"
            fill={fill}
            stroke={fill}
            strokeWidth="0.5"
            opacity="0.9"
            transform="rotate(-25 20 20)"
          />
          <path d="M 12 16 Q 20 12, 28 24" stroke="#fff" strokeWidth="0.8" opacity="0.25" fill="none" transform="rotate(-25 20 20)" />
        </svg>
      );
    case 'vanilla':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <path
            d="M20 4 C 23 6, 25 12, 25 20 C 25 28, 23 34, 20 36 C 17 34, 15 28, 15 20 C 15 12, 17 6, 20 4 Z"
            fill={fill}
            stroke={fill}
            strokeWidth="0.5"
            opacity="0.9"
          />
          <path d="M20 6 L 20 34" stroke="#fff" strokeWidth="0.4" opacity="0.2" fill="none" />
        </svg>
      );
    case 'basil':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <path
            d="M20 4 C 26 5, 33 11, 33 20 C 33 29, 27 35, 20 36 C 13 35, 7 29, 7 20 C 7 11, 14 5, 20 4 Z M 20 6 L 20 34 M 20 10 L 14 16 M 20 14 L 12 20 M 20 18 L 11 25 M 20 10 L 26 16 M 20 14 L 28 20 M 20 18 L 29 25"
            fill={fill}
            stroke={fill}
            strokeWidth="0.5"
            opacity="0.9"
          />
          <path d="M20 6 L 20 34 M 20 10 L 14 16 M 20 14 L 12 20 M 20 18 L 11 25 M 20 10 L 26 16 M 20 14 L 28 20 M 20 18 L 29 25"
            stroke="#fff" strokeWidth="0.3" opacity="0.15" fill="none" />
        </svg>
      );

    /* ======= FRUITS ======= */
    case 'cherry':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          {/* stem */}
          <path d="M20 6 Q 18 12, 14 18 M20 6 Q 22 12, 26 18" stroke="#4A7C59" strokeWidth="1.2" fill="none" strokeLinecap="round" />
          {/* left cherry */}
          <circle cx="14" cy="24" r="8" fill={fill} opacity="0.95" />
          <circle cx="11" cy="21" r="2" fill="#fff" opacity="0.25" />
          {/* right cherry */}
          <circle cx="26" cy="24" r="8" fill={fill} opacity="0.85" />
          <circle cx="23" cy="21" r="2" fill="#fff" opacity="0.2" />
        </svg>
      );
    case 'apple':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          {/* stem */}
          <path d="M20 5 L 20 12" stroke="#6B4A34" strokeWidth="1.5" strokeLinecap="round" />
          {/* leaf on stem */}
          <path d="M20 8 Q 25 5, 27 8" fill="#4CAF50" stroke="#388E3C" strokeWidth="0.4" />
          {/* apple body */}
          <path
            d="M20 12 C 12 12, 6 18, 6 25 C 6 33, 12 37, 20 37 C 28 37, 34 33, 34 25 C 34 18, 28 12, 20 12 Z"
            fill={fill}
            opacity="0.9"
          />
          {/* highlight */}
          <ellipse cx="14" cy="20" rx="4" ry="6" fill="#fff" opacity="0.15" transform="rotate(-20 14 20)" />
        </svg>
      );

    /* ======= FLOWERS ======= */
    case 'sunflower':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          {/* petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <ellipse
              key={angle}
              cx="20" cy="8"
              rx="3.5" ry="7"
              fill={fill}
              opacity="0.85"
              transform={`rotate(${angle} 20 20)`}
            />
          ))}
          {/* center */}
          <circle cx="20" cy="20" r="6" fill="#5D4037" />
          <circle cx="20" cy="20" r="4.5" fill="#6D4C41" />
          {/* center dots */}
          <circle cx="18" cy="18.5" r="0.8" fill="#3E2723" opacity="0.5" />
          <circle cx="21" cy="19" r="0.8" fill="#3E2723" opacity="0.5" />
          <circle cx="19.5" cy="21.5" r="0.8" fill="#3E2723" opacity="0.5" />
        </svg>
      );
    case 'rose':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          {/* outer petals */}
          <path d="M20 6 Q 30 10, 32 20 Q 30 14, 24 12 Z" fill={fill} opacity="0.7" />
          <path d="M20 6 Q 10 10, 8 20 Q 10 14, 16 12 Z" fill={fill} opacity="0.7" />
          <path d="M8 20 Q 8 30, 16 34 Q 10 28, 10 22 Z" fill={fill} opacity="0.75" />
          <path d="M32 20 Q 32 30, 24 34 Q 30 28, 30 22 Z" fill={fill} opacity="0.75" />
          <path d="M16 34 Q 20 38, 24 34 Q 22 32, 20 33 Q 18 32, 16 34 Z" fill={fill} opacity="0.8" />
          {/* inner spiral petals */}
          <path d="M20 12 Q 26 14, 27 20 Q 24 16, 20 15 Z" fill={fill} opacity="0.85" />
          <path d="M20 12 Q 14 14, 13 20 Q 16 16, 20 15 Z" fill={fill} opacity="0.85" />
          <path d="M13 20 Q 14 26, 20 28 Q 16 24, 15 20 Z" fill={fill} opacity="0.9" />
          <path d="M27 20 Q 26 26, 20 28 Q 24 24, 25 20 Z" fill={fill} opacity="0.9" />
          {/* center bud */}
          <circle cx="20" cy="20" r="4" fill={fill} opacity="0.95" />
          <circle cx="19" cy="19" r="1.5" fill="#fff" opacity="0.15" />
        </svg>
      );
    case 'tulip':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          {/* stem */}
          <path d="M20 24 L 20 38" stroke="#4A7C59" strokeWidth="1.5" strokeLinecap="round" />
          {/* small leaf */}
          <path d="M20 32 Q 26 28, 24 34" fill="#5A8F6A" stroke="none" />
          {/* petals */}
          <path d="M20 4 Q 10 10, 10 20 Q 12 24, 20 24 Z" fill={fill} opacity="0.9" />
          <path d="M20 4 Q 30 10, 30 20 Q 28 24, 20 24 Z" fill={fill} opacity="0.8" />
          <path d="M20 4 Q 16 12, 15 20 Q 17 24, 20 24 Z" fill={fill} opacity="0.95" />
          <path d="M20 4 Q 24 12, 25 20 Q 23 24, 20 24 Z" fill={fill} opacity="0.85" />
          {/* highlight */}
          <path d="M17 10 Q 18 14, 18 18" stroke="#fff" strokeWidth="0.5" opacity="0.2" fill="none" />
        </svg>
      );

    /* ======= SPECIAL ======= */
    case 'star':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <path
            d="M20 4 L 23.5 15 L 35 15 L 25.5 22 L 29 33 L 20 26 L 11 33 L 14.5 22 L 5 15 L 16.5 15 Z"
            fill={fill}
            stroke={fill}
            strokeWidth="0.3"
            opacity="0.95"
          />
          {/* inner glow */}
          <path
            d="M20 10 L 22 16 L 28 16 L 23 20 L 25 26 L 20 22 L 15 26 L 17 20 L 12 16 L 18 16 Z"
            fill="#fff"
            opacity="0.15"
          />
        </svg>
      );
    default:
      return null;
  }
}
