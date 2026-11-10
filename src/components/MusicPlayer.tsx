import React, { useEffect, useState } from 'react';
import { Music, Pause, Play, Sparkles } from 'lucide-react';
import { magicalAudio } from '../utils/audioSynth';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = magicalAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleToggle = async () => {
    setHasInteracted(true);
    await magicalAudio.toggle();
  };

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2">
      {/* Gentle helper pulse for first-time visitors */}
      {!hasInteracted && !isPlaying && (
        <div className="hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rapunzel-purple/90 border border-rapunzel-gold/40 text-rapunzel-goldLight text-xs backdrop-blur-md shadow-lg animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-rapunzel-gold" />
          <span>Veo en ti la luz 🎵</span>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pausar canción Veo en ti la luz' : 'Reproducir canción Veo en ti la luz'}
        title={isPlaying ? 'Pausar canción Veo en ti la luz' : 'Reproducir canción Veo en ti la luz'}
        className={`group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-90 hover:scale-105 shadow-[0_0_20px_rgba(223,183,67,0.45)] border-2 ${
          isPlaying
            ? 'bg-gradient-to-tr from-amber-500 via-rapunzel-gold to-yellow-200 border-rapunzel-goldLight text-rapunzel-dark'
            : 'bg-rapunzel-purple/90 hover:bg-rapunzel-purple border-rapunzel-gold/60 text-rapunzel-gold backdrop-blur-md'
        }`}
      >
        {/* Pulsing ring when playing */}
        {isPlaying && (
          <span className="absolute inset-0 rounded-full border-2 border-rapunzel-gold animate-ping opacity-60 pointer-events-none" />
        )}

        {/* Visual equalizer bars or Music icon */}
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-end gap-1 h-5 px-1">
              <span className="w-1 bg-rapunzel-dark rounded-full bar-anim-1" />
              <span className="w-1 bg-rapunzel-dark rounded-full bar-anim-2" />
              <span className="w-1 bg-rapunzel-dark rounded-full bar-anim-3" />
            </div>
          ) : (
            <div className="relative flex items-center justify-center">
              <Music className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />
            </div>
          )}
        </div>
      </button>
    </div>
  );
};
