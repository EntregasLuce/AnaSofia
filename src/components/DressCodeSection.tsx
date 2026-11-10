import React from 'react';
import { Crown, Sparkles, Shirt, UserCheck } from 'lucide-react';

export const DressCodeSection: React.FC = () => {
  return (
    <section className="px-6 py-4 text-center">
      <p className="font-royal text-xs text-rapunzel-gold tracking-[0.3em] uppercase mb-1">
        Protocolo del Evento
      </p>

      <h3 className="font-script text-3xl sm:text-4xl text-rapunzel-softLila mb-5">
        Código de Vestimenta
      </h3>

      {/* Cards for Women & Men */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 max-w-sm mx-auto">
        {/* Women */}
        <div className="py-4 px-3 bg-gradient-to-b from-rapunzel-purple/30 to-rapunzel-card/50 rounded-2xl border border-rapunzel-gold/30 shadow-md backdrop-blur-sm flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-rapunzel-purple/60 border border-rapunzel-lila/40 text-rapunzel-lila flex items-center justify-center mb-2">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
            Mujeres
          </h4>
          <p className="text-xs text-rapunzel-goldLight font-semibold mt-1">
            Colores Pasteles
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-xs"
              style={{ backgroundColor: '#fde2e4' }}
              title="Rosa Pastel"
            />
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-xs"
              style={{ backgroundColor: '#e2ece9' }}
              title="Menta Pastel"
            />
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-xs"
              style={{ backgroundColor: '#d0f4de' }}
              title="Celeste Pastel"
            />
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-xs"
              style={{ backgroundColor: '#fff1e6' }}
              title="Crema Pastel"
            />
          </div>
        </div>

        {/* Men */}
        <div className="py-4 px-3 bg-gradient-to-b from-rapunzel-purple/30 to-rapunzel-card/50 rounded-2xl border border-rapunzel-gold/30 shadow-md backdrop-blur-sm flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-rapunzel-purple/60 border border-rapunzel-gold/40 text-rapunzel-gold flex items-center justify-center mb-2">
            <UserCheck className="w-5 h-5" />
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sans">
            Hombres
          </h4>
          <p className="text-xs text-rapunzel-goldLight font-semibold mt-1">
            Traje Formal
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-xs"
              style={{ backgroundColor: '#1e293b' }}
              title="Azul Marino"
            />
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-xs"
              style={{ backgroundColor: '#0f172a' }}
              title="Negro"
            />
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-xs"
              style={{ backgroundColor: '#475569' }}
              title="Gris Carbón"
            />
          </div>
        </div>
      </div>

      {/* RESERVA ESPECIAL DE COLOR: LILA EN TODAS SUS TONALIDADES */}
      <div className="relative p-5 rounded-3xl bg-gradient-to-b from-rapunzel-purple/60 via-rapunzel-card to-rapunzel-dark border-2 border-rapunzel-gold/50 shadow-[0_0_30px_rgba(223,183,67,0.25)] max-w-sm mx-auto overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-rapunzel-violet/40 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 text-rapunzel-gold mb-1">
            <Crown className="w-5 h-5 fill-rapunzel-gold/20 animate-pulse" />
            <span className="font-royal text-[11px] font-bold uppercase tracking-[0.25em]">
              Reserva Especial de Color
            </span>
            <Crown className="w-5 h-5 fill-rapunzel-gold/20 animate-pulse" />
          </div>

          <h4 className="font-royal text-xl sm:text-2xl font-black text-rapunzel-softLila gold-gradient-text gold-text-glow uppercase tracking-wider my-2">
            Lila en todas sus tonalidades
          </h4>

          {/* Color gradient swatch */}
          <div className="w-48 h-3.5 rounded-full bg-gradient-to-r from-[#e8d2e6] via-[#c084fc] via-[#b279a7] to-[#582167] shadow-inner border border-rapunzel-gold/40 my-2" />

          <p className="font-serif italic text-xs text-rapunzel-goldLight/90 mt-1 leading-relaxed max-w-xs">
            Reservado con cariño y exclusividad para el lucimiento de la quinceañera.
          </p>
        </div>
      </div>

      <div className="w-full central-divider" />
    </section>
  );
};
