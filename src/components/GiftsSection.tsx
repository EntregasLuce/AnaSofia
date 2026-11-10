import React from 'react';
import { Mail, Gift } from 'lucide-react';

export const GiftsSection: React.FC = () => {
  return (
    <section className="px-6 py-4 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rapunzel-purple/50 border border-rapunzel-gold/30 text-rapunzel-gold mb-2 shadow-[0_0_20px_rgba(223,183,67,0.3)]">
        <Mail className="w-6 h-6 animate-pulse" />
      </div>

      <p className="font-royal text-[10px] sm:text-xs text-rapunzel-gold tracking-[0.28em] uppercase leading-none mb-2 drop-shadow-xs">
        Presentes y Muestras de Cariño
      </p>

      <h3 className="font-script text-4xl sm:text-5xl text-rapunzel-softLila leading-[1.15] mt-1 mb-4">
        Lluvia de Sobres
      </h3>

      <div className="p-5 rounded-3xl bg-rapunzel-purple/20 border border-rapunzel-gold/20 shadow-inner max-w-sm mx-auto backdrop-blur-sm">
        <p className="font-serif text-sm sm:text-base text-rapunzel-light leading-relaxed italic">
          &ldquo;El regalo más valioso para mí es tu presencia. Pero si deseas hacerme un detalle, agradecería que fuera en efectivo a través de sobre cerrado el día del evento.&rdquo;
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-rapunzel-gold text-xs font-royal tracking-widest uppercase">
          <Gift className="w-4 h-4" />
          <span>¡Muchas Gracias!</span>
          <Gift className="w-4 h-4" />
        </div>
      </div>

      <div className="w-full central-divider" />
    </section>
  );
};
