const Cloud = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 120 60" className={`absolute fill-white/60 drop-shadow-sm ${className}`} style={style}>
    <path d="M 25 50 Q 10 50 10 35 Q 10 20 25 20 Q 30 10 45 10 Q 60 10 65 20 Q 75 5 95 15 Q 110 25 110 40 Q 110 50 95 50 Z" />
  </svg>
);

const Bird = ({ className, style, delay = '0s' }: { className?: string; style?: React.CSSProperties; delay?: string }) => (
  <div className={`absolute ${className}`} style={{ ...style, width: '24px', height: '12px' }}>
    <svg viewBox="0 0 24 12" className="w-full h-full fill-none stroke-warm-brown/30 stroke-[2.5]" style={{ animation: `flap 1s ease-in-out infinite alternate ${delay}` }}>
      <path d="M 2 6 Q 6 0 12 6 Q 18 0 22 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export function SceneryBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">

      {/* Soft blurred background clouds */}
      <div
        className="absolute rounded-full bg-white/40 blur-3xl"
        style={{ width: '500px', height: '120px', top: '5%', left: '10%', animation: 'drift 80s ease-in-out infinite' }}
      />
      <div
        className="absolute rounded-full bg-white/30 blur-3xl"
        style={{ width: '400px', height: '100px', top: '8%', right: '5%', animation: 'drift 100s ease-in-out infinite reverse' }}
      />
      
      {/* Distinct SVG Clouds */}
      <Cloud style={{ width: '150px', top: '15%', left: '-20%', animation: 'flyRight 120s linear infinite' }} />
      <Cloud style={{ width: '100px', top: '8%', left: '-10%', animation: 'flyRight 90s linear infinite 15s', opacity: 0.8 }} />
      <Cloud style={{ width: '180px', top: '22%', right: '-30%', animation: 'flyLeft 150s linear infinite 5s', opacity: 0.7 }} />
      <Cloud style={{ width: '120px', top: '12%', right: '-15%', animation: 'flyLeft 110s linear infinite 30s', opacity: 0.9 }} />

      {/* Flying Birds */}
      {/* Flock 1 */}
      <div style={{ position: 'absolute', top: '25%', left: 0, animation: 'flyRight 45s linear infinite' }}>
        <Bird style={{ top: 0, left: 0 }} delay="0s" />
        <Bird style={{ top: '15px', left: '-20px' }} delay="0.2s" />
        <Bird style={{ top: '-10px', left: '-40px' }} delay="0.4s" />
      </div>
      
      {/* Flock 2 */}
      <div style={{ position: 'absolute', top: '18%', right: 0, animation: 'flyLeft 55s linear infinite 20s' }}>
        <Bird style={{ top: 0, left: 0 }} delay="0.1s" />
        <Bird style={{ top: '20px', left: '25px' }} delay="0.3s" />
      </div>

      {/* Flock 3 */}
      <div style={{ position: 'absolute', top: '35%', left: 0, animation: 'flyRight 60s linear infinite 35s' }}>
        <Bird style={{ top: 0, left: 0 }} delay="0s" />
        <Bird style={{ top: '12px', left: '-15px' }} delay="0.5s" />
        <Bird style={{ top: '24px', left: '-30px' }} delay="0.2s" />
        <Bird style={{ top: '5px', left: '-45px' }} delay="0.7s" />
      </div>

      {/* Mountains & Hills SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '65%' }}
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="farMtn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7BA098" />
            <stop offset="100%" stopColor="#8FB8A8" />
          </linearGradient>
          <linearGradient id="midMtn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6A9E70" />
            <stop offset="100%" stopColor="#7CB87A" />
          </linearGradient>
          <linearGradient id="nearHill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8ABF6A" />
            <stop offset="100%" stopColor="#9ACD80" />
          </linearGradient>
          <linearGradient id="closeHill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9CCF7A" />
            <stop offset="100%" stopColor="#B8D89A" />
          </linearGradient>
          <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B8D89A" />
            <stop offset="100%" stopColor="#D4E4B8" />
          </linearGradient>
        </defs>

        <path d="M0 300 Q 120 140, 250 200 Q 350 100, 480 220 Q 550 80, 700 200 Q 800 120, 900 180 Q 1000 60, 1150 200 Q 1250 130, 1350 190 Q 1400 160, 1440 200 L1440 600 L0 600Z" fill="url(#farMtn)" opacity="0.5" />
        <path d="M0 350 Q 100 220, 200 280 Q 320 180, 450 300 Q 520 200, 650 280 Q 750 160, 900 260 Q 1000 180, 1100 260 Q 1200 200, 1300 280 Q 1380 240, 1440 260 L1440 600 L0 600Z" fill="url(#midMtn)" opacity="0.55" />
        <path d="M0 420 Q 180 340, 360 400 Q 540 320, 720 380 Q 900 300, 1080 380 Q 1260 340, 1440 370 L1440 600 L0 600Z" fill="url(#nearHill)" opacity="0.6" />
        <path d="M0 480 Q 200 420, 400 460 Q 600 400, 800 450 Q 1000 410, 1200 450 Q 1350 430, 1440 440 L1440 600 L0 600Z" fill="url(#closeHill)" opacity="0.55" />
        <path d="M0 520 Q 360 490, 720 510 Q 1080 490, 1440 510 L1440 600 L0 600Z" fill="url(#ground)" opacity="0.4" />
      </svg>

      {/* Warm ambient light orbs */}
      <div className="absolute rounded-full bg-soft-gold/15 blur-3xl" style={{ width: '300px', height: '300px', top: '25%', left: '15%', animation: 'drift 50s ease-in-out infinite' }} />
      <div className="absolute rounded-full bg-white/10 blur-3xl" style={{ width: '250px', height: '250px', top: '15%', right: '20%', animation: 'drift 60s ease-in-out infinite reverse' }} />
    </div>
  );
}
