import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// YouTube IFrame API types
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: new (
        id: string,
        config: {
          width: string;
          height: string;
          videoId: string;
          playerVars: Record<string, number>;
          events: Record<string, (e: unknown) => void>;
        }
      ) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  setVolume: (volume: number) => void;
  getPlayerState: () => number;
  getCurrentTime: () => number;
  destroy: () => void;
}

const VIDEO_ID = 'ZlCUygJEgog';
const START_SEC = 10;
const END_SEC = 30;

export function SoundToggle() {
  const [soundOn, setSoundOn] = useState(true);
  const playerRef = useRef<YTPlayer | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const apiLoadedRef = useRef(false);
  const pendingPlayRef = useRef(false);
  const hasAutoStarted = useRef(false);

  // Auto-start music on first user interaction (browsers require it)
  useEffect(() => {
    const stored = localStorage.getItem('farewell-sound');
    if (stored === 'false') {
      setSoundOn(false);
      return;
    }

    const autoStart = () => {
      if (hasAutoStarted.current) return;
      hasAutoStarted.current = true;
      setSoundOn(true);
      localStorage.setItem('farewell-sound', 'true');
      // Clean up listeners
      window.removeEventListener('click', autoStart);
      window.removeEventListener('scroll', autoStart);
      window.removeEventListener('touchstart', autoStart);
      window.removeEventListener('keydown', autoStart);
    };

    window.addEventListener('click', autoStart, { once: false });
    window.addEventListener('scroll', autoStart, { once: false });
    window.addEventListener('touchstart', autoStart, { once: false });
    window.addEventListener('keydown', autoStart, { once: false });

    return () => {
      window.removeEventListener('click', autoStart);
      window.removeEventListener('scroll', autoStart);
      window.removeEventListener('touchstart', autoStart);
      window.removeEventListener('keydown', autoStart);
    };
  }, []);

  // Load YouTube IFrame API once
  useEffect(() => {
    if (apiLoadedRef.current) return;
    if (document.getElementById('yt-iframe-api')) return;
    
    const tag = document.createElement('script');
    tag.id = 'yt-iframe-api';
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    apiLoadedRef.current = true;
  }, []);

  const startLoopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (playerRef.current) {
        const time = playerRef.current.getCurrentTime();
        if (time >= END_SEC || time < START_SEC) {
          playerRef.current.seekTo(START_SEC, true);
        }
      }
    }, 500);
  }, []);

  const stopLoopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Initialize YouTube player when API is ready
  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current) return;

      // Create a container div off-screen for the player
      let container = document.getElementById('yt-bg-player-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'yt-bg-player-container';
        container.style.cssText = 'position:fixed;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;pointer-events:none;';
        document.body.appendChild(container);
        
        const playerDiv = document.createElement('div');
        playerDiv.id = 'yt-bg-player';
        container.appendChild(playerDiv);
      }

      playerRef.current = new window.YT.Player('yt-bg-player', {
        width: '1',
        height: '1',
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          start: START_SEC,
        },
        events: {
          onReady: () => {
            playerRef.current?.setVolume(35);
            if (pendingPlayRef.current) {
              playerRef.current?.seekTo(START_SEC, true);
              playerRef.current?.playVideo();
              startLoopTimer();
              pendingPlayRef.current = false;
            }
          },
          onStateChange: (event: unknown) => {
            const e = event as { data: number };
            // If video ended, loop back
            if (e.data === window.YT?.PlayerState?.ENDED) {
              playerRef.current?.seekTo(START_SEC, true);
              playerRef.current?.playVideo();
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      stopLoopTimer();
    };
  }, [startLoopTimer, stopLoopTimer]);

  // React to soundOn changes
  useEffect(() => {
    if (soundOn) {
      if (playerRef.current) {
        try {
          playerRef.current.seekTo(START_SEC, true);
          playerRef.current.playVideo();
          startLoopTimer();
        } catch {
          // Player not ready yet
          pendingPlayRef.current = true;
        }
      } else {
        pendingPlayRef.current = true;
      }
    } else {
      if (playerRef.current) {
        try {
          playerRef.current.pauseVideo();
        } catch {
          // Player not ready
        }
      }
      stopLoopTimer();
      pendingPlayRef.current = false;
    }
  }, [soundOn, startLoopTimer, stopLoopTimer]);

  const toggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    localStorage.setItem('farewell-sound', String(newState));
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
