import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check, ExternalLink } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const fullAddress =
    'Inmobiliaria cerrada Las Marias Casa Campo VILLA CRIS, MZ 2 CASA 3';

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    fullAddress
  )}`;

  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(fullAddress)}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location-section" className="px-6 py-4 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rapunzel-purple/50 border border-rapunzel-gold/30 text-rapunzel-gold mb-2 shadow-[0_0_20px_rgba(223,183,67,0.3)]">
        <MapPin className="w-6 h-6 animate-bounce" />
      </div>

      <p className="font-royal text-xs text-rapunzel-gold tracking-[0.3em] uppercase mb-1">
        Lugar del Evento
      </p>

      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
        Casa Campo VILLA CRIS
      </h3>

      <p className="text-xs sm:text-sm text-rapunzel-softLila leading-relaxed max-w-xs mx-auto">
        Inmobiliaria cerrada Las Marías
        <br />
        <span className="text-rapunzel-goldLight font-semibold text-sm">MZ 2 CASA 3</span>
      </p>

      {/* Embedded Google Maps View */}
      <div className="mt-4 w-full h-52 sm:h-60 rounded-2xl overflow-hidden border border-rapunzel-gold/30 shadow-[0_4px_25px_rgba(0,0,0,0.5)] relative">
        <iframe
          title="Ubicación Casa Campo VILLA CRIS"
          className="w-full h-full filter saturate-125 contrast-110 opacity-90"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(
            'Inmobiliaria Las Marias Casa Campo Villa Cris'
          )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          loading="lazy"
          style={{ border: 0 }}
          allowFullScreen
        />

        {/* Subtle overlay pill with location badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-rapunzel-dark/85 backdrop-blur-md rounded-full border border-rapunzel-gold/40 text-[10px] text-rapunzel-goldLight font-medium">
          Villa Cris • MZ 2 CASA 3
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-col gap-2.5 max-w-sm mx-auto">
        {/* Open in Google Maps */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rapunzel-gold via-amber-300 to-rapunzel-gold text-rapunzel-dark font-sans font-bold text-xs tracking-wider uppercase shadow-lg hover:brightness-110 transition-all transform active:scale-95"
        >
          <Navigation className="w-4 h-4" />
          <span>Abrir en Google Maps</span>
        </a>

        {/* Secondary options: Waze & Copy */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rapunzel-card hover:bg-rapunzel-purple border border-rapunzel-gold/30 text-rapunzel-goldLight text-[11px] font-semibold tracking-wider uppercase transition-all active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5 text-rapunzel-gold" />
            <span>Abrir en Waze</span>
          </a>

          <button
            onClick={handleCopyAddress}
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-rapunzel-card hover:bg-rapunzel-purple border border-rapunzel-gold/30 text-rapunzel-goldLight text-[11px] font-semibold tracking-wider uppercase transition-all active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-rapunzel-gold" />
                <span>Copiar Dirección</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="w-full central-divider" />
    </section>
  );
};
