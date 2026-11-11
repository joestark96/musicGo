// Web Audio Engine for MusicGo! - Polyphonic Synthesizer & Audio FX
class AudioEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private instrument: 'piano' | 'synth' | 'marimba' = 'piano';

  // Musical note frequencies (A4 = 440Hz standard)
  private readonly NOTE_FREQS: Record<string, number> = {
    'C2': 65.41, 'C#2': 69.30, 'Db2': 69.30,
    'D2': 73.42, 'D#2': 77.78, 'Eb2': 77.78,
    'E2': 82.41,
    'F2': 87.31, 'F#2': 92.50, 'Gb2': 92.50,
    'G2': 98.00, 'G#2': 103.83, 'Ab2': 103.83,
    'A2': 110.00, 'A#2': 116.54, 'Bb2': 116.54,
    'B2': 123.47,

    'C3': 130.81, 'C#3': 138.59, 'Db3': 138.59,
    'D3': 146.83, 'D#3': 155.56, 'Eb3': 155.56,
    'E3': 164.81,
    'F3': 174.61, 'F#3': 185.00, 'Gb3': 185.00,
    'G3': 196.00, 'G#3': 207.65, 'Ab3': 207.65,
    'A3': 220.00, 'A#3': 233.08, 'Bb3': 233.08,
    'B3': 246.94,

    'C4': 261.63, 'C#4': 277.18, 'Db4': 277.18,
    'D4': 293.66, 'D#4': 311.13, 'Eb4': 311.13,
    'E4': 329.63,
    'F4': 349.23, 'F#4': 369.99, 'Gb4': 369.99,
    'G4': 392.00, 'G#4': 415.30, 'Ab4': 415.30,
    'A4': 440.00, 'A#4': 466.16, 'Bb4': 466.16,
    'B4': 493.88,

    'C5': 523.25, 'C#5': 554.37, 'Db5': 554.37,
    'D5': 587.33, 'D#5': 622.25, 'Eb5': 622.25,
    'E5': 659.25,
    'F5': 698.46, 'F#5': 739.99, 'Gb5': 739.99,
    'G5': 783.99, 'G#5': 830.61, 'Ab5': 830.61,
    'A5': 880.00, 'A#5': 932.33, 'Bb5': 932.33,
    'B5': 987.77,

    'C6': 1046.50, 'C#6': 1108.73, 'Db6': 1108.73,
    'D6': 1174.66, 'D#6': 1244.51, 'Eb6': 1244.51,
    'E6': 1318.51, 'F6': 1396.91, 'F#6': 1479.98,
    'G6': 1567.98
  };

  constructor() {
    // Lazy AudioContext init on first user touch to comply with modern browser autoplay policies
  }

  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setInstrument(inst: 'piano' | 'synth' | 'marimba') {
    this.instrument = inst;
  }

  public getInstrument(): 'piano' | 'synth' | 'marimba' {
    return this.instrument;
  }

  public getFrequency(note: string): number {
    return this.NOTE_FREQS[note] || 440;
  }

  // Play a single note with piano or chosen timbre
  public playNote(note: string, duration: number = 0.8, velocity: number = 0.8): void {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    const freq = this.NOTE_FREQS[note];
    if (!freq) return;

    const now = ctx.currentTime;

    if (this.instrument === 'piano') {
      // Warm piano synthesis using multiple harmonic oscillators with quick decay
      const fundamental = ctx.createOscillator();
      const overtone1 = ctx.createOscillator();
      const overtone2 = ctx.createOscillator();

      const mainGain = ctx.createGain();
      const lowpass = ctx.createBiquadFilter();

      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(Math.min(freq * 5, 5000), now);
      lowpass.frequency.exponentialRampToValueAtTime(Math.max(freq * 1.5, 200), now + duration);

      fundamental.type = 'triangle';
      fundamental.frequency.setValueAtTime(freq, now);

      overtone1.type = 'sine';
      overtone1.frequency.setValueAtTime(freq * 2, now);

      overtone2.type = 'sine';
      overtone2.frequency.setValueAtTime(freq * 3, now);

      // ADSR Envelope
      mainGain.gain.setValueAtTime(0.0001, now);
      mainGain.gain.linearRampToValueAtTime(velocity * 0.45, now + 0.015);
      mainGain.gain.exponentialRampToValueAtTime(velocity * 0.25, now + 0.15);
      mainGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const overtoneGain = ctx.createGain();
      overtoneGain.gain.setValueAtTime(0.2, now);
      overtone1.connect(overtoneGain);
      overtone2.connect(overtoneGain);

      fundamental.connect(lowpass);
      overtoneGain.connect(lowpass);
      lowpass.connect(mainGain);
      mainGain.connect(ctx.destination);

      fundamental.start(now);
      overtone1.start(now);
      overtone2.start(now);

      fundamental.stop(now + duration + 0.05);
      overtone1.stop(now + duration + 0.05);
      overtone2.stop(now + duration + 0.05);
    } else if (this.instrument === 'marimba') {
      // Pure wooden marimba/xylophone strike
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(velocity * 0.6, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.min(duration, 0.45));

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + Math.min(duration, 0.45) + 0.02);
    } else {
      // Modern Poly-synth
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(velocity * 0.35, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(velocity * 0.15, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.05);
    }
  }

  // Play a full harmonic chord (e.g. C, E, G simultaneously)
  public playChord(notes: string[], duration: number = 1.2): void {
    if (!this.soundEnabled || !notes.length) return;
    notes.forEach((note) => {
      this.playNote(note, duration, 0.7 / Math.sqrt(notes.length));
    });
  }

  // Play an arpeggio or melody sequence
  public async playSequence(notes: string[], intervalMs: number = 280, noteDuration: number = 0.5): Promise<void> {
    if (!this.soundEnabled || !notes.length) return;
    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note && note !== 'REST') {
        this.playNote(note, noteDuration);
      }
      await new Promise(r => setTimeout(r, intervalMs));
    }
  }

  // Metronome click
  public playClick(isFirstBeat: boolean = false): void {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(isFirstBeat ? 1200 : 800, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Duolingo-style UI sound effects
  public playCorrect(): void {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    const now = ctx.currentTime;

    // Happy bright ascending major chime: C5 -> E5 -> G5 -> C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = now + idx * 0.07;
      const dur = 0.28;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(0.3, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + dur + 0.02);
    });
  }

  public playWrong(): void {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    const now = ctx.currentTime;

    // Low gentle thud / buzzer: F3 -> Eb3
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(175, now);
    osc.frequency.linearRampToValueAtTime(130, now + 0.25);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  public playLevelUp(): void {
    if (!this.soundEnabled) return;
    // Fanfare: C4, G4, C5, E5, G5, C6
    const fanfare = ['C4', 'G4', 'C5', 'E5', 'G5', 'C6'];
    this.playSequence(fanfare, 110, 0.4);
  }

  public playTap(): void {
    if (!this.soundEnabled) return;
    const ctx = this.initContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.035);
  }
}

export const sound = new AudioEngine();
