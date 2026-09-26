import { motion } from 'framer-motion';

export function TreeSVG() {
  return (
    <svg
      viewBox="0 0 800 700"
      className="w-full h-full"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="trunkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5A3E2A" />
          <stop offset="30%" stopColor="#6B4A34" />
          <stop offset="70%" stopColor="#8A5E42" />
          <stop offset="100%" stopColor="#5A3E2A" />
        </linearGradient>
        <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6B4A34" />
          <stop offset="50%" stopColor="#8A5E42" />
          <stop offset="100%" stopColor="#6B4A34" />
        </linearGradient>
        <radialGradient id="canopyGlow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#9CAF88" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#9CAF88" stopOpacity="0" />
        </radialGradient>

      </defs>

      {/* Canopy glow */}
      <ellipse cx="400" cy="280" rx="320" ry="240" fill="url(#canopyGlow)" />

      {/* Trunk */}
      <motion.path
        d="M 380 700 Q 385 600 390 520 Q 392 440 396 360 Q 398 300 400 250"
        stroke="url(#trunkGradient)"
        strokeWidth="36"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      <motion.path
        d="M 420 700 Q 415 600 410 520 Q 408 440 404 360 Q 402 300 400 250"
        stroke="url(#trunkGradient)"
        strokeWidth="30"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
        opacity="0.7"
      />

      {/* Major branches */}
      <motion.path
        d="M 396 380 Q 340 350 280 310 Q 230 280 180 250"
        stroke="url(#branchGradient)"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.8 }}
      />
      <motion.path
        d="M 404 360 Q 470 330 540 300 Q 590 280 630 260"
        stroke="url(#branchGradient)"
        strokeWidth="18"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.9 }}
      />
      <motion.path
        d="M 398 320 Q 360 280 310 230 Q 270 190 240 150"
        stroke="url(#branchGradient)"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1.1 }}
      />
      <motion.path
        d="M 402 300 Q 440 260 500 220 Q 550 190 580 160"
        stroke="url(#branchGradient)"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1.2 }}
      />
      <motion.path
        d="M 400 260 Q 400 200 400 140"
        stroke="url(#branchGradient)"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1.3 }}
      />

      {/* Smaller sub-branches */}
      <motion.path
        d="M 280 310 Q 250 280 220 260"
        stroke="#6B4A34"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1.4 }}
        opacity="0.8"
      />
      <motion.path
        d="M 540 300 Q 570 270 600 250"
        stroke="#6B4A34"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1.4 }}
        opacity="0.8"
      />
      <motion.path
        d="M 310 230 Q 280 200 260 180"
        stroke="#6B4A34"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 1.5 }}
        opacity="0.8"
      />
      <motion.path
        d="M 500 220 Q 530 190 550 170"
        stroke="#6B4A34"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 1.5 }}
        opacity="0.8"
      />

      {/* Ground / roots */}
      <motion.path
        d="M 300 695 Q 350 680 400 690 Q 450 700 500 695"
        stroke="#5A3E2A"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      />
      <motion.path
        d="M 340 700 Q 370 685 390 695"
        stroke="#5A3E2A"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.8, delay: 1.7 }}
      />
      <motion.path
        d="M 430 700 Q 460 685 480 695"
        stroke="#5A3E2A"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.8, delay: 1.7 }}
      />

      {/* Grass tufts at base */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 0.8, delay: 1.8 }}
      >
        {Array.from({ length: 20 }).map((_, i) => {
          const x = 250 + i * 15 + Math.sin(i) * 5;
          const h = 8 + Math.sin(i * 3) * 4;
          return (
            <path
              key={i}
              d={`M ${x} 700 Q ${x + 3} ${700 - h} ${x + 6} 700`}
              stroke="#7C9070"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
          );
        })}
      </motion.g>
    </svg>
  );
}
