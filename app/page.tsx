'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const isDead = false; // Change this to true when needed
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set up audio
    audio.volume = 0.7;
    audio.loop = true;

    // Try to play on load
    const tryPlay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Autoplay blocked - will need user interaction
        console.log('Autoplay blocked, waiting for user interaction');
      }
    };

    // Try when audio is ready
    audio.addEventListener('canplaythrough', tryPlay);
    audio.load();

    // Play on any user interaction
    const handleInteraction = async () => {
      if (!isPlaying && audio) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      }
    };

    // Add listeners for user interaction
    window.addEventListener('click', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });
    window.addEventListener('keydown', handleInteraction, { once: true });

    return () => {
      if (audio) {
        audio.removeEventListener('canplaythrough', tryPlay);
      }
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [isPlaying]);

  return (
    <main 
      className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden cursor-pointer"
      onClick={() => {
        if (audioRef.current && !isPlaying) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
        }
      }}
    >
      {/* Audio player - hidden */}
      <audio 
        ref={audioRef} 
        src="/music.mp3" 
        loop 
        preload="auto"
        className="hidden"
        crossOrigin="anonymous"
      />
      
      {/* Christian cross in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          {/* Vertical line (longer) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gray-800 transform -translate-x-1/2"></div>
          {/* Horizontal line (shorter, positioned higher) */}
          <div className="absolute top-1/3 left-1/2 w-32 h-2 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </div>
      
      <div className="text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-wider">
          am i dead?
        </h1>
        <div className="text-9xl md:text-[12rem] font-bold">
          {isDead ? (
            <span className="text-red-600 animate-pulse">yes</span>
          ) : (
            <span className="text-white">no</span>
          )}
        </div>
      </div>
    </main>
  );
}

