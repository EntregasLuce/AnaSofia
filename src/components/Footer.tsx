import React from 'react';
import { Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-8 px-6 bg-[#09020f] text-center border-t border-rapunzel-gold/25 relative overflow-hidden">
      {/* Decorative sun filigree icon */}
      <div className="flex items-center justify-center gap-2 mb-2 text-rapunzel-gold/60">
        <Sparkles className="w-4 h-4 text-rapunzel-gold" />
        <span className="text-xl">☀️</span>
        <Sparkles className="w-4 h-4 text-rapunzel-gold" />
      </div>

      <p className="font-script text-4xl text-rapunzel-gold gold-gradient-text drop-shadow">
        Ana Sofía
      </p>

      <p className="text-[10px] sm:text-xs text-rapunzel-softLila/70 uppercase tracking-[0.35em] mt-1 font-royal">
        Mis XV Años • 12 . 12 . 2026
      </p>

      <p className="text-[11px] text-rapunzel-softLila/50 font-serif italic mt-3 max-w-xs mx-auto">
        &ldquo;Y por fin veo la luz, y la niebla se ha marchado...&rdquo;
      </p>
    </footer>
  );
};
