import React, { useState } from 'react';
import { MessageCircle, CheckCircle, Users } from 'lucide-react';

export const RsvpSection: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [companionCount, setCompanionCount] = useState('1');

  const getWhatsAppUrl = () => {
    let text = '¡Hola! Confirmo mi asistencia a los 15 Años de Ana Sofía 🌸✨';
    if (guestName.trim()) {
      text += `\nNombre: ${guestName.trim()}`;
      text += `\nPersonas que asistirán: ${companionCount}`;
    }
    return `https://api.whatsapp.com/send?phone=573003722397&text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="rsvp-section" className="px-6 pt-2 pb-8 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mb-2 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
        <MessageCircle className="w-6 h-6 animate-pulse" />
      </div>

      <p className="font-royal text-xs text-rapunzel-gold tracking-[0.3em] uppercase mb-1">
        Pase de Entrada
      </p>

      <h3 className="font-script text-3xl sm:text-4xl text-rapunzel-softLila mb-3">
        Confirmar Asistencia
      </h3>

      <div className="p-5 rounded-3xl bg-rapunzel-purple/20 border border-rapunzel-gold/30 shadow-lg backdrop-blur-sm max-w-sm mx-auto text-left">
        <div className="mb-3">
          <label className="block text-[11px] font-royal uppercase tracking-wider text-rapunzel-goldLight mb-1">
            Tu Nombre Completo:
          </label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="Escribe tu nombre..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-rapunzel-dark/80 border border-rapunzel-gold/30 text-sm text-white placeholder-rapunzel-softLila/40 focus:outline-hidden focus:border-rapunzel-gold transition-colors"
          />
        </div>

        <div className="mb-4">
          <label className="block text-[11px] font-royal uppercase tracking-wider text-rapunzel-goldLight mb-1">
            Número de Asistentes:
          </label>
          <div className="flex items-center gap-2">
            {['1', '2', '3', '4+'].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setCompanionCount(count)}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  companionCount === count
                    ? 'bg-rapunzel-gold text-rapunzel-dark border-rapunzel-goldLight font-bold shadow-md'
                    : 'bg-rapunzel-dark/60 text-rapunzel-softLila border-rapunzel-gold/25 hover:bg-rapunzel-purple/50'
                }`}
              >
                {count} {count === '1' ? 'Persona' : 'Pers.'}
              </button>
            ))}
          </div>
        </div>

        {/* WhatsApp Button */}
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 text-white font-sans font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:shadow-green-500/25 transform active:scale-95 transition-all border border-green-300/30"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span>Confirmar por WhatsApp</span>
        </a>

        <p className="text-xs text-rapunzel-softLila/75 text-center mt-3 font-serif italic">
          Agradecemos tu confirmación con anticipación para una mejor organización.
        </p>
      </div>
    </section>
  );
};
