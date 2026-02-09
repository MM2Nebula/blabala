'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const isDead = false; // Change this to true when needed
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Auto-play music when component mounts
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.7;
          await audioRef.current.play();
        } catch (error) {
          // Autoplay might be blocked - user interaction required
          console.log('Autoplay prevented, user interaction needed');
        }
      }
    };
    
    // Try to play on mount
    playAudio();
    
    // Also try on first user interaction
    const handleInteraction = () => {
      playAudio();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
    
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Audio player - hidden */}
      <audio 
        ref={audioRef} 
        src="/music.mp3" 
        loop 
        autoPlay
        className="hidden"
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

