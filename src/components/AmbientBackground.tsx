export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Dappled light circles */}
      <div
        className="absolute rounded-full bg-white/20 blur-3xl"
        style={{
          width: '300px',
          height: '300px',
          top: '10%',
          left: '15%',
          animation: 'drift 50s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full bg-soft-gold/30 blur-3xl"
        style={{
          width: '250px',
          height: '250px',
          top: '30%',
          right: '10%',
          animation: 'drift 70s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute rounded-full bg-peach/20 blur-3xl"
        style={{
          width: '200px',
          height: '200px',
          bottom: '20%',
          left: '20%',
          animation: 'drift 60s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full bg-white/15 blur-3xl"
        style={{
          width: '350px',
          height: '350px',
          top: '50%',
          left: '40%',
          animation: 'drift 80s ease-in-out infinite reverse',
        }}
      />
      <div
        className="absolute rounded-full bg-soft-gold/20 blur-3xl"
        style={{
          width: '180px',
          height: '180px',
          bottom: '10%',
          right: '25%',
          animation: 'drift 55s ease-in-out infinite',
        }}
      />
    </div>
  );
}
