export class Oscillator {
  private gainNode: GainNode;
  private oscillator: OscillatorNode;

  private baseFrequency: number;
  private playing: boolean = false;

  private decay: number = 1;
  private volume: number = 1;

  constructor(private frequency: number,
              private waveForm: string,
              private audioContext: AudioContext) {
    // establish base frequency
    this.baseFrequency = frequency;
    this.gainNode = audioContext.createGain();
    this.gainNode.gain.value = 0;
    this.gainNode.connect(audioContext.destination);
    this.oscillator = audioContext.createOscillator();
    this.oscillator.connect(this.gainNode);
    this.oscillator.frequency.value = this.baseFrequency;
    this.oscillator.start(0);
  }

  play() {
    if (this.playing) {
      return;
    }
    this.playing = true;
    this.gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.1);
  }

  stop() {
    if (!this.playing) {
      return;
    }
    this.playing = false;
    this.gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + this.decay);
  }

  isPlaying() {
    return this.playing;
  }

  bend(value: number) {
    this.oscillator.frequency.value = this.baseFrequency + value;
  }

  adjustVolume(value: number) {
     if (this.playing) {
       console.log('setting volume to', value);
       this.gainNode.gain.value = value;
     }
     //set for next time...
     this.volume = value;
  }

  setWaveForm(value: string) {
    this.oscillator.type = value;
  }
}