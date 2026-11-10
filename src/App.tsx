import React from 'react';
import { LanternsCanvas } from './components/LanternsCanvas';
import { MusicPlayer } from './components/MusicPlayer';
import { HeroSection } from './components/HeroSection';
import { CountdownTimer } from './components/CountdownTimer';
import { GratitudeSection } from './components/GratitudeSection';
import { PhotoGallery } from './components/PhotoGallery';
import { LocationSection } from './components/LocationSection';
import { DressCodeSection } from './components/DressCodeSection';
import { GiftsSection } from './components/GiftsSection';
import { RsvpSection } from './components/RsvpSection';
import { Footer } from './components/Footer';

export default function App() {
  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLocation = () => {
    const el = document.getElementById('location-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0312] text-[#fcf8f7] flex justify-center items-center py-0 sm:py-6 sm:px-4 font-sans selection:bg-[#dfb743]/30 selection:text-[#f6ebbd]">
      {/* Background Interactive Floating Tangled Lanterns Canvas */}
      <LanternsCanvas />

      {/* Floating Web Audio API Music Player Button */}
      <MusicPlayer />

      {/* Mobile-first Invitation Shell */}
      <main className="w-full max-w-md sm:max-w-lg bg-[#12061c]/95 min-h-screen sm:min-h-0 sm:rounded-[40px] border-0 sm:border border-[#dfb743]/30 shadow-[0_0_60px_rgba(42,13,54,0.85)] card-gold-glow overflow-hidden relative z-10 flex flex-col backdrop-blur-md">
        {/* Hero with Photo Slideshow and Key Event Details */}
        <HeroSection
          onNavigateToRsvp={scrollToRsvp}
          onNavigateToLocation={scrollToLocation}
        />

        {/* Live Countdown & Add-to-Calendar */}
        <CountdownTimer />

        {/* Special Gratitude to Mother & Family */}
        <GratitudeSection />

        {/* Cloudinary Photo Gallery with Lightbox */}
        <PhotoGallery />

        {/* Venue Information & Google Maps Embed */}
        <LocationSection />

        {/* Dress Code & Reserved Lilac Showcase */}
        <DressCodeSection />

        {/* Envelope Shower (Lluvia de Sobres) */}
        <GiftsSection />

        {/* RSVP Confirmation via WhatsApp */}
        <RsvpSection />

        {/* Elegant Royal Footer */}
        <Footer />
      </main>
    </div>
  );
}
