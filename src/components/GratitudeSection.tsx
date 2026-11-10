import React from 'react';
import { Heart } from 'lucide-react';

export const GratitudeSection: React.FC = () => {
  return (
    <section className="px-6 py-6 text-center">
      {/* Delicate floating heart icon */}
      <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-rapunzel-purple/40 text-rapunzel-lila mb-3 shadow-[0_0_20px_rgba(178,121,167,0.35)]">
        <Heart className="w-5 h-5 fill-rapunzel-lila/30 text-rapunzel-lila animate-pulse" />
      </div>

      <p className="font-royal text-[10px] sm:text-xs text-rapunzel-gold tracking-[0.28em] uppercase leading-none mb-2 drop-shadow-xs">
        Con Especial Agradecimiento
      </p>

      <h3 className="font-script text-4xl sm:text-5xl lg:text-6xl text-rapunzel-softLila leading-[1.15] mt-1 mb-4 lila-text-glow">
        A mi Madre y Familia
      </h3>

      {/* Completely unboxed text (no border, no card frame) with generous vertical amplitude */}
      <div className="max-w-md mx-auto px-2 py-4 sm:py-6">
        <p className="font-serif italic text-base sm:text-lg lg:text-xl text-[#fcf8f7] leading-[2.1] sm:leading-[2.3] tracking-wide text-center">
          &ldquo;A mi mamá{' '}
          <strong className="text-rapunzel-goldLight font-bold not-italic underline decoration-rapunzel-gold/60 underline-offset-4">
            Ruth Gallego
          </strong>{' '}
          y a mis familiares, por su amor incondicional, su guía constante y por brindarle a Ana Sofía
          todas las herramientas y valores para florecer y vivir esta hermosa etapa de su vida.&rdquo;
        </p>
      </div>

      <div className="w-full central-divider" />
    </section>
  );
};
