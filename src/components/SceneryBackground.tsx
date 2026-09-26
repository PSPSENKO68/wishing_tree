export function SceneryBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #87CEEB 0%, #B0D4E8 20%, #C9E0EE 35%, #E0EBD8 50%, #E8DFCA 65%, #F2E8D5 80%, #FDF6EC 100%)',
        }}
      />

      {/* Soft clouds */}
      <div
        className="absolute rounded-full bg-white/40 blur-3xl"
        style={{
          width: '500px',
          height: '120px',
          top: '5%',
          left: '10%',
          animation: 'drift 80s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full bg-white/30 blur-3xl"
        style={{
          width: '400px',
          height: '100px',
          top: '8%',
          right: '5%',
          animation: 'drift 100s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute rounded-full bg-white/25 blur-3xl"
        style={{
          width: '350px',
          height: '90px',
          top: '12%',
          left: '40%',
          animation: 'drift 70s ease-in-out infinite',
        }}
      />

      {/* Mountains & Hills SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        style={{ height: '65%' }}
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Far mountain gradient */}
          <linearGradient id="farMtn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7BA098" />
            <stop offset="100%" stopColor="#8FB8A8" />
          </linearGradient>
          {/* Mid mountain gradient */}
          <linearGradient id="midMtn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6A9E70" />
            <stop offset="100%" stopColor="#7CB87A" />
          </linearGradient>
          {/* Near hill gradient */}
          <linearGradient id="nearHill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8ABF6A" />
            <stop offset="100%" stopColor="#9ACD80" />
          </linearGradient>
          {/* Closest hill */}
          <linearGradient id="closeHill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9CCF7A" />
            <stop offset="100%" stopColor="#B8D89A" />
          </linearGradient>
          {/* Ground */}
          <linearGradient id="ground" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B8D89A" />
            <stop offset="100%" stopColor="#D4E4B8" />
          </linearGradient>
        </defs>

        {/* Far mountains (misty blue-green) */}
        <path
          d="M0 300 Q 120 140, 250 200 Q 350 100, 480 220 Q 550 80, 700 200 Q 800 120, 900 180 Q 1000 60, 1150 200 Q 1250 130, 1350 190 Q 1400 160, 1440 200 L1440 600 L0 600Z"
          fill="url(#farMtn)"
          opacity="0.5"
        />

        {/* Mid mountains (deeper green) */}
        <path
          d="M0 350 Q 100 220, 200 280 Q 320 180, 450 300 Q 520 200, 650 280 Q 750 160, 900 260 Q 1000 180, 1100 260 Q 1200 200, 1300 280 Q 1380 240, 1440 260 L1440 600 L0 600Z"
          fill="url(#midMtn)"
          opacity="0.55"
        />

        {/* Near rolling hills (bright green) */}
        <path
          d="M0 420 Q 180 340, 360 400 Q 540 320, 720 380 Q 900 300, 1080 380 Q 1260 340, 1440 370 L1440 600 L0 600Z"
          fill="url(#nearHill)"
          opacity="0.6"
        />

        {/* Closest foreground hill */}
        <path
          d="M0 480 Q 200 420, 400 460 Q 600 400, 800 450 Q 1000 410, 1200 450 Q 1350 430, 1440 440 L1440 600 L0 600Z"
          fill="url(#closeHill)"
          opacity="0.55"
        />

        {/* Ground plane */}
        <path
          d="M0 520 Q 360 490, 720 510 Q 1080 490, 1440 510 L1440 600 L0 600Z"
          fill="url(#ground)"
          opacity="0.4"
        />
      </svg>

      {/* Warm ambient light orbs */}
      <div
        className="absolute rounded-full bg-soft-gold/15 blur-3xl"
        style={{
          width: '300px',
          height: '300px',
          top: '25%',
          left: '15%',
          animation: 'drift 50s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full bg-white/10 blur-3xl"
        style={{
          width: '250px',
          height: '250px',
          top: '15%',
          right: '20%',
          animation: 'drift 60s ease-in-out infinite reverse',
        }}
      />
    </div>
  );
}
