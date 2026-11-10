import React, { useState, useEffect } from 'react';
import { Calendar, CalendarPlus, Check } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isFinished: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isFinished: false,
  });

  const [calendarAdded, setCalendarAdded] = useState(false);

  useEffect(() => {
    // Event Date: December 12, 2026, 19:00:00
    const targetDate = new Date('2026-12-12T19:00:00').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isFinished: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isFinished: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCalendar = () => {
    // Generate Google Calendar link
    const title = encodeURIComponent('Mis 15 Años - Ana Sofía ✨');
    const details = encodeURIComponent(
      'Celebración mágica de los 15 Años de Ana Sofía con temática de Rapunzel. Recepción en Casa Campo VILLA CRIS.'
    );
    const location = encodeURIComponent(
      'Inmobiliaria cerrada Las Marias Casa Campo VILLA CRIS, MZ 2 CASA 3'
    );
    // 2026-12-12 19:00:00 to 2026-12-13 03:00:00
    const dates = '20261213T000000Z/20261213T080000Z';
    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;

    window.open(gcalUrl, '_blank');
    setCalendarAdded(true);
    setTimeout(() => setCalendarAdded(false), 3000);
  };

  return (
    <section className="px-6 py-6 text-center">
      <p className="font-royal text-xs text-rapunzel-gold tracking-[0.3em] uppercase mb-1">
        La Cuenta Regresiva
      </p>
      <h3 className="font-serif italic text-2xl text-rapunzel-softLila mb-5">
        Cada vez falta menos para el gran día
      </h3>

      {timeLeft.isFinished ? (
        <div className="p-4 rounded-2xl bg-rapunzel-purple/40 border border-rapunzel-gold/40 text-rapunzel-gold font-royal text-lg">
          ¡El gran día ha llegado! 🌸✨
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-3 px-1 max-w-sm mx-auto">
          {/* Days */}
          <div className="flex flex-col items-center justify-center py-3.5 px-2 bg-gradient-to-b from-rapunzel-purple/50 to-rapunzel-card/70 rounded-2xl border border-rapunzel-gold/25 shadow-lg backdrop-blur-sm">
            <span className="font-royal text-2xl sm:text-3xl text-rapunzel-gold gold-gradient-text font-black tabular-nums">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-rapunzel-softLila uppercase tracking-wider mt-1 font-medium">
              Días
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center justify-center py-3.5 px-2 bg-gradient-to-b from-rapunzel-purple/50 to-rapunzel-card/70 rounded-2xl border border-rapunzel-gold/25 shadow-lg backdrop-blur-sm">
            <span className="font-royal text-2xl sm:text-3xl text-rapunzel-gold gold-gradient-text font-black tabular-nums">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-rapunzel-softLila uppercase tracking-wider mt-1 font-medium">
              Horas
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center justify-center py-3.5 px-2 bg-gradient-to-b from-rapunzel-purple/50 to-rapunzel-card/70 rounded-2xl border border-rapunzel-gold/25 shadow-lg backdrop-blur-sm">
            <span className="font-royal text-2xl sm:text-3xl text-rapunzel-gold gold-gradient-text font-black tabular-nums">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-rapunzel-softLila uppercase tracking-wider mt-1 font-medium">
              Minutos
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center justify-center py-3.5 px-2 bg-gradient-to-b from-rapunzel-purple/50 to-rapunzel-card/70 rounded-2xl border border-rapunzel-gold/25 shadow-lg backdrop-blur-sm">
            <span className="font-royal text-2xl sm:text-3xl text-rapunzel-gold gold-gradient-text font-black tabular-nums">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] text-rapunzel-softLila uppercase tracking-wider mt-1 font-medium">
              Segundos
            </span>
          </div>
        </div>
      )}

      {/* Add to Calendar Button */}
      <div className="mt-5">
        <button
          onClick={handleAddToCalendar}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-rapunzel-card hover:bg-rapunzel-purple/70 border border-rapunzel-gold/40 text-rapunzel-goldLight text-xs font-semibold tracking-wider uppercase transition-all shadow-md active:scale-95"
        >
          {calendarAdded ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>¡Abriendo Calendario!</span>
            </>
          ) : (
            <>
              <CalendarPlus className="w-4 h-4 text-rapunzel-gold" />
              <span>Agendar en mi Calendario</span>
            </>
          )}
        </button>
      </div>

      <div className="w-full central-divider" />
    </section>
  );
};
