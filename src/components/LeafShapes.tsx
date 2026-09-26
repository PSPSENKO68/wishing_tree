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
    default:
      return null;
  }
}
