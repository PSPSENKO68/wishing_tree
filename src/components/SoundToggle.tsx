import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export function SoundToggle() {
  const [soundOn, setSoundOn] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('farewell-sound');
    if (stored === 'true') setSoundOn(true);
  }, []);

  useEffect(() => {
    if (!audio) {
      // Use a generated ambient tone via Web Audio API instead of an external file
      return;
    }
  }, [audio]);

  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    localStorage.setItem('farewell-sound', String(newState));

    if (newState) {
      playChime();
    }
  };

  const playChime = () => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
      setAudio(ctx as unknown as HTMLAudioElement);
    } catch {
      // Audio not available
    }
  };

  return (
    <button
      onClick={toggleSound}
      className="fixed top-6 right-6 z-40 w-12 h-12 rounded-full bg-cream/80 backdrop-blur-sm shadow-md hover:shadow-lg flex items-center justify-center text-warm-brown hover:text-terracotta transition-all duration-300 border border-warm-sand/50"
      aria-label={soundOn ? 'Mute sound' : 'Enable sound'}
      title={soundOn ? 'Sound on' : 'Sound off'}
    >
      {soundOn ? (
        <Volume2 className="w-5 h-5 animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5" />
      )}
    </button>
  );
}

let audioCtx: AudioContext | null = null;

export function playLeafSound() {
  const stored = localStorage.getItem('farewell-sound');
  if (stored !== 'true') return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + 0.3);
  } catch {
    // Audio not available
  }
}

export function playSuccessSound() {
  const stored = localStorage.getItem('farewell-sound');
  if (stored !== 'true') return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = audioCtx!.createOscillator();
      const gain = audioCtx!.createGain();
      osc.connect(gain);
      gain.connect(audioCtx!.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx!.currentTime + i * 0.1);
      gain.gain.setValueAtTime(0.1, audioCtx!.currentTime + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx!.currentTime + i * 0.1 + 0.4);
      osc.start(audioCtx!.currentTime + i * 0.1);
      osc.stop(audioCtx!.currentTime + i * 0.1 + 0.4);
    });
  } catch {
    // Audio not available
  }
}
