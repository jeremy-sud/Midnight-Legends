// ── AudioManager — Background music & UI sound effects ────────────
// Uses Web Audio API for procedural sounds (no external files needed)

class AudioManagerClass {
  constructor() {
    this.ctx = null;         // AudioContext (created on first user interaction)
    this.musicGain = null;   // GainNode for music volume
    this.sfxGain = null;     // GainNode for SFX volume
    this.musicVolume = 0.3;  // 0–1
    this.sfxVolume = 0.4;    // 0–1
    this.musicEnabled = true;
    this.sfxEnabled = true;
    this._musicInterval = null;
    this._musicPlaying = false;
    this._initialized = false;
  }

  /** Lazy-init AudioContext (must be called from a user gesture) */
  _ensureContext() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = this.musicVolume;
    this.musicGain.connect(this.ctx.destination);
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = this.sfxVolume;
    this.sfxGain.connect(this.ctx.destination);
  }

  /** Initialize from saved settings */
  init(settings) {
    if (settings.musicVolume !== undefined) this.musicVolume = settings.musicVolume;
    if (settings.sfxVolume !== undefined) this.sfxVolume = settings.sfxVolume;
    if (settings.musicEnabled !== undefined) this.musicEnabled = settings.musicEnabled;
    if (settings.sfxEnabled !== undefined) this.sfxEnabled = settings.sfxEnabled;
    this._initialized = true;
  }

  /** Start on first user interaction */
  unlock() {
    this._ensureContext();
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (this.musicEnabled && !this._musicPlaying) this.startMusic();
  }

  // ── Music: procedural ambient pad ──────────────────────────────
  startMusic() {
    if (!this.ctx || !this.musicEnabled) return;
    if (this._musicPlaying) return;
    this._musicPlaying = true;
    this._playAmbientChord();
    this._musicInterval = setInterval(() => {
      if (this.musicEnabled && this._musicPlaying) this._playAmbientChord();
    }, 8000); // New chord every 8 seconds
  }

  stopMusic() {
    this._musicPlaying = false;
    if (this._musicInterval) {
      clearInterval(this._musicInterval);
      this._musicInterval = null;
    }
  }

  _playAmbientChord() {
    if (!this.ctx || !this.musicGain) return;
    const now = this.ctx.currentTime;
    // Ethereal ambient chord — pentatonic frequencies
    const chords = [
      [130.81, 196.00, 261.63, 329.63], // C3 G3 C4 E4
      [146.83, 220.00, 293.66, 369.99], // D3 A3 D4 F#4
      [164.81, 246.94, 329.63, 392.00], // E3 B3 E4 G4
      [174.61, 261.63, 349.23, 440.00], // F3 C4 F4 A4
      [196.00, 293.66, 392.00, 493.88], // G3 D4 G4 B4
    ];
    const chord = chords[Math.floor(Math.random() * chords.length)];

    chord.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      // Slow fade in and out
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 2 + i * 0.3);
      gain.gain.linearRampToValueAtTime(0, now + 7.5);
      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start(now + i * 0.15);
      osc.stop(now + 8);
    });

    // Sub-bass drone
    const sub = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    sub.type = 'sine';
    sub.frequency.value = chord[0] / 2;
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.04, now + 1.5);
    subGain.gain.linearRampToValueAtTime(0, now + 7.8);
    sub.connect(subGain);
    subGain.connect(this.musicGain);
    sub.start(now);
    sub.stop(now + 8);
  }

  // ── SFX ────────────────────────────────────────────────────────
  playClick() {
    if (!this.sfxEnabled) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(500, now + 0.06);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  /** Triumphant fanfare for boss kills */
  playBossKill() {
    if (!this.sfxEnabled) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.18, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.35);
    });
  }

  /** Prestige whoosh + chime */
  playPrestige() {
    if (!this.sfxEnabled) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    // Sweeping whoosh
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(2000, now + 0.4);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.55);
    // Chime
    const chime = this.ctx.createOscillator();
    const chimeGain = this.ctx.createGain();
    chime.type = 'sine';
    chime.frequency.value = 1318.51; // E6
    chimeGain.gain.setValueAtTime(0.2, now + 0.35);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
    chime.connect(chimeGain);
    chimeGain.connect(this.sfxGain);
    chime.start(now + 0.35);
    chime.stop(now + 1.05);
  }

  /** Milestone reward jingle */
  playMilestone() {
    if (!this.sfxEnabled) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    const notes = [783.99, 987.77, 1174.66]; // G5 B5 D6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.15, now + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.4);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.45);
    });
  }

  /** Level up ding */
  playLevelUp() {
    if (!this.sfxEnabled) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  /** Achievement unlocked sound */
  playAchievement() {
    if (!this.sfxEnabled) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    const notes = [659.25, 783.99, 1046.50]; // E5 G5 C6
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, now + i * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.35);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.4);
    });
  }

  /** Summon hero sparkle */
  playSummon() {
    if (!this.sfxEnabled) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    // Rising sparkle sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.15);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  // ── Volume controls ────────────────────────────────────────────
  setMusicVolume(v) {
    this.musicVolume = Math.max(0, Math.min(1, v));
    if (this.musicGain) this.musicGain.gain.value = this.musicVolume;
  }

  setSfxVolume(v) {
    this.sfxVolume = Math.max(0, Math.min(1, v));
    if (this.sfxGain) this.sfxGain.gain.value = this.sfxVolume;
  }

  toggleMusic(enabled) {
    this.musicEnabled = enabled;
    if (enabled) {
      this._ensureContext();
      this.startMusic();
    } else {
      this.stopMusic();
    }
  }

  toggleSfx(enabled) {
    this.sfxEnabled = enabled;
  }
}

export const AudioManager = new AudioManagerClass();
