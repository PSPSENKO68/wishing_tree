import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import ReactPlayer from 'react-player';

export function SoundToggle() {
  const [soundOn, setSoundOn] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('farewell-sound');
    if (stored === 'true') {
      setSoundOn(true);
      setHasInteracted(true);
    }
  }, []);

  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setHasInteracted(true);
    localStorage.setItem('farewell-sound', String(newState));
  };

  return (
    <>
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

      {/* Hidden YouTube player for Background Music */}
      {hasInteracted && (
        <div className="hidden">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ZlCUygJEgog"
            playing={soundOn}
            loop={true}
            volume={0.35}
            width="0"
            height="0"
            config={{
              youtube: {
                playerVars: { autoplay: 1 }
              }
            }}
          />
        </div>
      )}
    </>
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
