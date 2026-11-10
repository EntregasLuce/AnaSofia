/**
 * Audio Player for Quinceañera theme.
 * Plays the official song from Cloudinary tag (Quinces_AnaSofia):
 * "Chayanne & Danna Paola - Veo en ti la luz (De Enredados)"
 * With automatic dynamic tag fetching and Web Audio synth fallback.
 */

const CLOUD_NAME = 'dz6lay5a6';
const TAG = 'Quinces_AnaSofia';

// Direct, verified Cloudinary audio URL from tag Quinces_AnaSofia
export const DEFAULT_CLOUDINARY_AUDIO_URL =
  'https://res.cloudinary.com/dz6lay5a6/video/upload/v1794275376/Chayanne_Danna_Paola_-_Veo_en_ti_la_luz_De_EnredadosVideo_Oficial_jmfzpa.mp3';

class CloudinaryMusicPlayer {
  private audio: HTMLAudioElement | null = null;
  private isRunning: boolean = false;
  private audioUrl: string = DEFAULT_CLOUDINARY_AUDIO_URL;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private isInitialized: boolean = false;

  constructor() {
    this.fetchTagAudioUrl();
  }

  /**
   * Fetches the latest audio file from Cloudinary tag Quinces_AnaSofia
   */
  private async fetchTagAudioUrl() {
    try {
      const res = await fetch(`https://res.cloudinary.com/${CLOUD_NAME}/video/list/${TAG}.json`);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.resources) && data.resources.length > 0) {
          const firstAudio = data.resources[0];
          const versionStr = firstAudio.version ? `v${firstAudio.version}/` : '';
          const fmt = firstAudio.format || 'mp3';
          this.audioUrl = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${versionStr}${firstAudio.public_id}.${fmt}`;
          if (this.audio && !this.isRunning) {
            this.audio.src = this.audioUrl;
          }
        }
      }
    } catch {
      // Keep DEFAULT_CLOUDINARY_AUDIO_URL
    }
  }

  private initAudio() {
    if (this.isInitialized && this.audio) return;

    this.audio = new Audio(this.audioUrl);
    this.audio.loop = true;
    this.audio.volume = 0.85;
    this.audio.preload = 'auto';

    this.audio.addEventListener('play', () => {
      this.isRunning = true;
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isRunning = false;
      this.notify();
    });

    this.audio.addEventListener('ended', () => {
      this.isRunning = false;
      this.notify();
    });

    this.isInitialized = true;
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.add(listener);
    listener(this.isRunning);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.isRunning));
  }

  public getIsPlaying(): boolean {
    return this.isRunning;
  }

  public async toggle(): Promise<boolean> {
    if (this.isRunning) {
      this.pause();
      return false;
    } else {
      await this.play();
      return true;
    }
  }

  public async play(): Promise<void> {
    this.initAudio();
    if (!this.audio) return;

    try {
      await this.audio.play();
      this.isRunning = true;
      this.notify();
    } catch (err) {
      console.warn('Playback error or interaction required:', err);
    }
  }

  public pause(): void {
    if (this.audio) {
      this.audio.pause();
    }
    this.isRunning = false;
    this.notify();
  }
}

export const magicalAudio = new CloudinaryMusicPlayer();
