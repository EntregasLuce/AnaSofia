import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useCloudinaryTagPhotos } from '../utils/cloudinary';

export const PhotoGallery: React.FC = () => {
  const photos = useCloudinaryTagPhotos();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Safe active photo calculation ensuring no out-of-bounds
  const safeIndex = photos.length > 0 ? activeIndex % photos.length : 0;
  const activePhoto = photos[safeIndex] || null;

  const handleSelectPhoto = (index: number) => {
    setActiveIndex(index);
    if (thumbnailsRef.current) {
      const child = thumbnailsRef.current.children[index] as HTMLElement;
      if (child) {
        child.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (photos.length === 0) return;
    const nextIdx = (safeIndex - 1 + photos.length) % photos.length;
    handleSelectPhoto(nextIdx);
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (photos.length === 0) return;
    const nextIdx = (safeIndex + 1) % photos.length;
    handleSelectPhoto(nextIdx);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartXRef.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  if (!activePhoto) return null;

  return (
    <section className="px-5 py-4 text-center">
      <div className="inline-flex items-center gap-1.5 text-rapunzel-gold text-xs font-royal tracking-[0.3em] uppercase mb-1">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Galería Mágica</span>
        <Sparkles className="w-3.5 h-3.5" />
      </div>

      <h3 className="font-script text-3xl sm:text-4xl text-rapunzel-softLila mb-3">
        Recuerdos Inolvidables
      </h3>

      {/* Main Single-Screen Gallery Card: In-place carousel only, no expanded modal */}
      <div className="max-w-md mx-auto bg-rapunzel-purple/20 p-3 sm:p-4 rounded-3xl border border-rapunzel-gold/30 shadow-[0_4px_25px_rgba(42,13,54,0.4)] backdrop-blur-sm">
        
        {/* Main Photo Showcase Viewport with navigation arrows */}
        <div
          className="relative w-full h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-rapunzel-card border border-rapunzel-gold/30 shadow-lg select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            key={activePhoto.public_id}
            src={activePhoto.url}
            alt={activePhoto.caption || 'Foto Ana Sofía'}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Scrim Overlay with Photo Counter & Caption */}
          <div className="absolute inset-0 bg-gradient-to-t from-rapunzel-dark/85 via-transparent to-rapunzel-dark/30 pointer-events-none flex flex-col justify-between p-3.5">
            <div className="flex justify-between items-center">
              <span className="px-2.5 py-1 rounded-full bg-rapunzel-dark/80 border border-rapunzel-gold/40 text-[10px] font-royal text-rapunzel-goldLight">
                {safeIndex + 1} de {photos.length}
              </span>
            </div>

            <p className="font-serif italic text-xs sm:text-sm text-rapunzel-softLila drop-shadow line-clamp-1 text-center">
              {activePhoto.caption}
            </p>
          </div>

          {/* Prev Arrow Button */}
          <button
            onClick={handlePrev}
            aria-label="Foto anterior"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-rapunzel-dark/80 hover:bg-rapunzel-purple border border-rapunzel-gold/50 text-rapunzel-goldLight flex items-center justify-center transition-transform active:scale-90 shadow-md z-10 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            aria-label="Foto siguiente"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-rapunzel-dark/80 hover:bg-rapunzel-purple border border-rapunzel-gold/50 text-rapunzel-goldLight flex items-center justify-center transition-transform active:scale-90 shadow-md z-10 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Thumbnail Strip directly below main photo */}
        <div className="mt-3">
          <div
            ref={thumbnailsRef}
            className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {photos.map((photo, idx) => {
              const isSelected = safeIndex === idx;
              return (
                <button
                  key={photo.public_id}
                  onClick={() => handleSelectPhoto(idx)}
                  aria-label={`Ver foto ${idx + 1}`}
                  className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden transition-all duration-200 border-2 cursor-pointer ${
                    isSelected
                      ? 'border-rapunzel-gold scale-105 shadow-[0_0_12px_rgba(223,183,67,0.7)] ring-2 ring-amber-300/40'
                      : 'border-rapunzel-gold/20 opacity-60 hover:opacity-100 hover:border-rapunzel-gold/60'
                  }`}
                >
                  <img
                    src={photo.thumb}
                    alt={`Miniatura ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-rapunzel-gold/15 pointer-events-none" />
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-rapunzel-softLila/60 font-serif italic mt-1.5">
            Toca o desliza para navegar por los {photos.length} recuerdos
          </p>
        </div>
      </div>

      <div className="w-full central-divider" />
    </section>
  );
};
