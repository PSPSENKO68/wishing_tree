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
        {/* Grass gradient */}
        <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7C9070" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#6B8055" stopOpacity="0.1" />
        </linearGradient>
        {/* Ground gradient */}
        <radialGradient id="groundGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6B8055" stopOpacity="0.15" />
          <stop offset="60%" stopColor="#9CAF88" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#9CAF88" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Canopy glow */}
      <ellipse cx="400" cy="280" rx="320" ry="240" fill="url(#canopyGlow)" />

      {/* ====== FOLIAGE CANOPY (behind branches) ====== */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.8, ease: 'easeOut' }}
        style={{ transformOrigin: '400px 280px' }}
      >
        {/* Large foliage clusters */}
        <ellipse cx="300" cy="250" rx="110" ry="80" fill="#7C9070" opacity="0.18" />
        <ellipse cx="500" cy="240" rx="120" ry="85" fill="#8FA078" opacity="0.15" />
        <ellipse cx="400" cy="200" rx="100" ry="70" fill="#6B8055" opacity="0.2" />
        <ellipse cx="240" cy="290" rx="80" ry="60" fill="#9CAF88" opacity="0.12" />
        <ellipse cx="560" cy="280" rx="85" ry="65" fill="#7C9070" opacity="0.14" />
        <ellipse cx="350" cy="170" rx="70" ry="50" fill="#A8B895" opacity="0.1" />
        <ellipse cx="460" cy="180" rx="75" ry="55" fill="#8FA078" opacity="0.12" />
        {/* Smaller leaf clusters for detail */}
        <ellipse cx="200" cy="260" rx="50" ry="40" fill="#6B8055" opacity="0.1" />
        <ellipse cx="600" cy="260" rx="55" ry="42" fill="#9CAF88" opacity="0.1" />
        <ellipse cx="320" cy="150" rx="45" ry="35" fill="#7C9070" opacity="0.08" />
        <ellipse cx="480" cy="160" rx="48" ry="38" fill="#A8B895" opacity="0.09" />
        <ellipse cx="400" cy="130" rx="40" ry="30" fill="#8FA078" opacity="0.08" />
      </motion.g>

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

      {/* ====== GROUND / ROOTS ====== */}
      {/* Ground shadow ellipse */}
      <motion.ellipse
        cx="400" cy="700" rx="200" ry="20"
        fill="url(#groundGlow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 1, delay: 1.6 }}
      />

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

      {/* ====== LUSH GRASS AT BASE ====== */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.8 }}
      >
        {/* Dense grass - left side */}
        {Array.from({ length: 35 }).map((_, i) => {
          const x = 180 + i * 12 + Math.sin(i * 2.7) * 6;
          const h = 12 + Math.sin(i * 1.8) * 8 + Math.cos(i * 3.1) * 4;
          const lean = Math.sin(i * 0.9) * 4;
          const green = ['#7C9070', '#6B8055', '#9CAF88', '#8FA078', '#5A7A4A'][i % 5];
          return (
            <path
              key={`grass-${i}`}
              d={`M ${x} 700 Q ${x + lean} ${700 - h * 0.6} ${x + lean + 2} ${700 - h}`}
              stroke={green}
              strokeWidth={1.5 + Math.random() * 1}
              fill="none"
              strokeLinecap="round"
              opacity={0.5 + Math.random() * 0.3}
            />
          );
        })}

        {/* Dense grass - right side */}
        {Array.from({ length: 35 }).map((_, i) => {
          const x = 420 + i * 12 + Math.sin(i * 2.3) * 5;
          const h = 10 + Math.cos(i * 2.1) * 7 + Math.sin(i * 1.5) * 3;
          const lean = Math.sin(i * 1.1) * 3;
          const green = ['#8FA078', '#7C9070', '#5A7A4A', '#9CAF88', '#6B8055'][i % 5];
          return (
            <path
              key={`grass2-${i}`}
              d={`M ${x} 700 Q ${x + lean} ${700 - h * 0.6} ${x + lean - 1} ${700 - h}`}
              stroke={green}
              strokeWidth={1.5 + Math.random() * 1}
              fill="none"
              strokeLinecap="round"
              opacity={0.5 + Math.random() * 0.3}
            />
          );
        })}

        {/* Small wildflowers in the grass */}
        {[
          { x: 220, y: 688, color: '#E8D44D' },
          { x: 310, y: 691, color: '#F06292' },
          { x: 470, y: 689, color: '#E8D44D' },
          { x: 550, y: 692, color: '#F06292' },
          { x: 620, y: 690, color: '#AF7AC5' },
          { x: 260, y: 693, color: '#AF7AC5' },
          { x: 380, y: 694, color: '#E8D44D' },
          { x: 510, y: 694, color: '#F06292' },
        ].map((f, i) => (
          <g key={`flower-${i}`}>
            {/* Stem */}
            <path d={`M ${f.x} 700 Q ${f.x - 1} ${f.y + 4} ${f.x} ${f.y}`} stroke="#6B8055" strokeWidth="1" fill="none" />
            {/* Petals */}
            <circle cx={f.x} cy={f.y} r="2.5" fill={f.color} opacity="0.7" />
            <circle cx={f.x} cy={f.y} r="1" fill="#fff" opacity="0.4" />
          </g>
        ))}

        {/* Small fallen leaves on the ground */}
        {[
          { x: 250, r: 20, color: '#D98E4A' },
          { x: 340, r: -15, color: '#C97E3A' },
          { x: 480, r: 35, color: '#B8966A' },
          { x: 560, r: -25, color: '#E0A060' },
          { x: 300, r: 45, color: '#9CAF88' },
          { x: 440, r: -40, color: '#7C9070' },
        ].map((l, i) => (
          <g key={`fallen-${i}`} transform={`translate(${l.x}, 698) rotate(${l.r})`} opacity="0.4">
            <path
              d="M0 -3 C 2 -2, 3 0, 0 3 C -3 0, -2 -2, 0 -3 Z"
              fill={l.color}
            />
          </g>
        ))}
      </motion.g>
    </svg>
  );
}
