import React, { useState, useEffect } from 'react';
import { Clock, ChevronDown, Sparkles } from 'lucide-react';

import { useCloudinaryTagPhotos } from '../utils/cloudinary';

interface HeroSectionProps {
  onNavigateToRsvp: () => void;
  onNavigateToLocation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToRsvp,
  onNavigateToLocation,
}) => {
  const photos = useCloudinaryTagPhotos();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (photos.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % photos.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [photos.length]);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <header className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-between text-center overflow-hidden">
      {/* Background Fullscreen Crossfade Slideshow */}
      <div className="absolute inset-0 z-0 bg-[#0b0312]">
        {photos.map((img, idx) => (
          <div
            key={img.public_id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url('${img.url}')`,
              transform: currentSlide === idx ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 1.5s ease-in-out, transform 7s ease-out',
            }}
          />
        ))}

        {/* Cinematic Scrim Gradient: subtle in the upper-mid area to showcase Ana Sofia's photo */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0312]/85 via-transparent via-40% to-[#0b0312]/95 z-10" />
        <div className="absolute inset-0 bg-radial-[at_center_center] from-transparent via-transparent to-[#0b0312]/70 z-10" />
      </div>

      {/* Top Header Information: Clean & Compact */}
      <div className="relative z-20 pt-6 sm:pt-8 px-6">
        <div className="inline-flex items-center justify-center gap-2 px-3 py-1 mb-1 rounded-full bg-rapunzel-purple/40 border border-rapunzel-gold/30 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-rapunzel-gold" />
          <span className="font-sans text-[11px] tracking-[0.35em] uppercase text-rapunzel-goldLight font-medium">
            Mis 15 Años
          </span>
          <Sparkles className="w-3.5 h-3.5 text-rapunzel-gold" />
        </div>

        <h1 className="font-script text-6xl sm:text-7xl lg:text-8xl text-rapunzel-softLila my-1 lila-text-glow drop-shadow-[0_4px_20px_rgba(178,121,167,0.7)]">
          Ana Sofía
        </h1>

        <p className="font-royal text-[11px] sm:text-xs tracking-[0.3em] uppercase text-rapunzel-goldLight/90">
          Una Noche de Ensueño
        </p>
      </div>

      {/* Spacious Middle Area - lets the photoshoot carousel be admired */}
      <div className="relative z-10 flex-1 flex items-center justify-center pointer-events-none" />

      {/* Bottom Header Content: Displaced further down, Centered */}
      <div className="relative z-20 pb-5 sm:pb-7 px-5 text-center max-w-md mx-auto w-full">
        {/* Date and Time block */}
        <div className="py-1 text-center mb-2.5">
          <p className="font-royal text-xs text-rapunzel-goldLight uppercase tracking-[0.35em] mb-0.5 drop-shadow">
            Sábado
          </p>

          <h2 className="font-royal text-3xl sm:text-4xl font-black text-rapunzel-gold gold-gradient-text gold-text-glow leading-tight tracking-wide">
            12 • DICIEMBRE • 2026
          </h2>

          <div className="mt-1.5 inline-flex items-center justify-center gap-2 px-4 py-1 rounded-full bg-rapunzel-card/80 border border-rapunzel-gold/40 backdrop-blur-md shadow-md">
            <Clock className="w-3.5 h-3.5 text-rapunzel-gold" />
            <span className="font-royal text-base sm:text-lg font-bold text-white tracking-widest">
              7:00 PM
            </span>
          </div>
        </div>

        {/* Cita */}
        <p className="font-serif italic text-xs sm:text-sm text-rapunzel-softLila/95 text-center leading-relaxed max-w-xs mx-auto mb-4 drop-shadow">
          &ldquo;Hoy dejo atrás mi niñez para comenzar un nuevo capítulo, rodeada del amor de quienes más quiero.&rdquo;
        </p>

        {/* Quick action buttons */}
        <div className="flex items-center justify-center gap-2.5 mb-3">
          <button
            onClick={onNavigateToRsvp}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-rapunzel-gold via-amber-300 to-rapunzel-gold text-rapunzel-dark font-sans font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            Confirmar
          </button>
          <button
            onClick={onNavigateToLocation}
            className="flex-1 py-3 px-4 rounded-xl bg-rapunzel-purple/70 hover:bg-rapunzel-purple border border-rapunzel-gold/40 text-rapunzel-goldLight font-sans font-semibold text-xs uppercase tracking-wider backdrop-blur-md active:scale-95 transition-all"
          >
            Ver Ubicación
          </button>
        </div>

        {/* Slideshow indicator dots */}
        <div className="flex justify-center items-center gap-2 mb-2">
          {photos.map((img, idx) => (
            <button
              key={img.public_id}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Ir a foto ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 bg-rapunzel-gold' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Subtle scroll down indicator */}
        <button
          onClick={scrollToNextSection}
          className="inline-flex items-center gap-1 text-[11px] text-rapunzel-goldLight/70 hover:text-rapunzel-gold tracking-widest uppercase font-royal mt-1 transition-colors animate-bounce cursor-pointer"
        >
          <span>Desliza para ver más</span>
          <ChevronDown className="w-3.5 h-3.5 text-rapunzel-gold" />
        </button>
      </div>
    </header>
  );
};
