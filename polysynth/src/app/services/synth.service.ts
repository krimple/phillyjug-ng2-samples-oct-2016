import { Injectable } from '@angular/core';
import { SynthInputMessage } from '../models/synth-input-message';
import { ReplaySubject } from 'rxjs';
import { SynthNote } from '../models/synth-note';
import { NoteTranslationService } from './note-translation.service';

@Injectable()
export class SynthService {

  private currentWaveForm = 'sawtooth';

  // take that, I WANT MY JAVASCRIPT TO BE SIMPLE PEOPLE!!! :)
  private audioContext: AudioContext =
    new (window['AudioContext'] || window['webkitAudioContext'])();

  private notes: Array<SynthNote>;

  private destination: AudioDestinationNode = this.audioContext.destination;

  private compressor: DynamicsCompressorNode = this.audioContext.createDynamicsCompressor();

  // central switchboard observable / observer
  private messageQueue$: ReplaySubject<SynthInputMessage>;

  constructor(noteTranslationService: NoteTranslationService) {
    // keep the last 1,000 messages (why not?)
    this.messageQueue$ = new ReplaySubject<SynthInputMessage>(1000);

    // configure compressor
    this.compressor.threshold.value = 0.0; // this is the pitfall, leave some headroom
    this.compressor.knee.value = 0.0; // brute force
    this.compressor.attack.value = 0.005; // 5ms attack
    this.compressor.release.value = 0.050; // 50ms release
    this.compressor.connect(this.destination);
    this.notes = [
      new SynthNote('C2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('D2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('E2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('F2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('G2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('A2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('B2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('C#2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('D#2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('F#2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('G#2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('A#2', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('C3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('D3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('E3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('F3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('G3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('A3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('B3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('C#3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('D#3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('F#3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('G#3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('A#3', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('C4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('D4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('E4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('F4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('G4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('A4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('B4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('C#4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('D#4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('F#4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('G#4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor),
      new SynthNote('A#4', this.currentWaveForm, noteTranslationService, this.messageQueue$, this.audioContext, this.compressor)
    ];
  }

  // send a message to the synth
  public receiveMessage(message: SynthInputMessage) {
    console.dir(message);
    this.messageQueue$.next(message);
  }

}
